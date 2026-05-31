# Product

## Register

product

## Users

Two types:
- **Admin** (1 person): sets up, manages Authentik, maintains the server. Visits infrequently to check things work.
- **Invited users** (family/friends, 2–10): non-technical. Visit to reach a specific service (watch something, listen to music, view photos). They follow a link, sign in once, and expect to see what they can use. They should not need to understand what Authentik is.

Context: living room couch or mobile, evening, low ambient light. The portal is a launchpad, not a task environment.

## Product Purpose

A private home portal that authenticates users through Authentik and presents the services they are allowed to access as a clean, friendly launcher. Success: a non-technical user lands, signs in without confusion, sees their services, clicks through to the right app. The admin never has to explain the URL structure.

## Brand Personality

Calm, personal, clear.

## Anti-references

- Generic homelab dashboards (Homer, Heimdall default themes): dense icon grids, monospace-heavy, admin-console aesthetic.
- Portainer, Grafana, Proxmox: infrastructure tools, intimidating for non-technical users.
- Generic SaaS landing pages: feature bullets, CTAs, testimonials, hero metrics.

## Design Principles

1. Reach the app in two taps. Every interaction should reduce friction, never add it.
2. Friendly without being childish. Approachable labels and descriptions, no jargon.
3. The portal disappears into the task. Once you click an app tile, the portal is forgotten.
4. What you see is what you can use. Never show, then lock. Never confuse with hidden services.
5. Admin clarity: when something is misconfigured, say so clearly server-side, not with a blank dashboard.

## Accessibility & Inclusion

WCAG AA minimum. Focus-visible rings on all interactive elements. Reduced-motion preference respected on all animations. Color is never the sole carrier of information (icons + labels always present). Mobile-first layout.
