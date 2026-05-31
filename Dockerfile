# ─── Stage 1: dependencies ────────────────────────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev


# ─── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copy all deps (including devDeps needed by the build)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# next.config.ts sets output: "standalone"
RUN npm run build


# ─── Stage 3: runner ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone output + static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/api/auth/providers',{timeout:4000},r=>{process.exit(r.statusCode<500?0:1)}).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
