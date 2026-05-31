import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({
  size = 32,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function JellyfinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <polygon
        points="12,10 24,16 12,22"
        fill="currentColor"
        opacity="0.9"
      />
    </Icon>
  );
}

export function JellyseerrIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 12h10M11 16h7M11 20h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="23" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M25.5 22.5l2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function NavidromeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 6a10 10 0 0 1 9.9 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 26a10 10 0 0 1-9.9-8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function ImmichIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect
        x="4"
        y="6"
        width="24"
        height="20"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="11" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 22l6-6 4 4 4-5 6 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function OpenWebUIIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect
        x="4"
        y="4"
        width="24"
        height="24"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 12h12M10 16h8M10 20h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function HermesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M5 8h22a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 10l13 9 13-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function NetBirdIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6"  cy="8"  r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="26" cy="8"  r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6"  cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="26" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 10l5 4.5M23 10l-5 4.5M9 22l5-4.5M23 22l-5-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function GiteaIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="3"  stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9"  cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 15v3M16 18c-3 0-7 1.5-7 4M16 18c3 0 7 1.5 7 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Icon>
  );
}

// ─── Room icons (16×16) ──────────────────────────────────────────────────────

type SmallIconProps = SVGProps<SVGSVGElement>;

function SmallIcon({
  children,
  ...props
}: SmallIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function WatchRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M6 14h4M8 12v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </SmallIcon>
  );
}

export function ListenRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path
        d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
    </SmallIcon>
  );
}

export function PhotosRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="5.5" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 11l4-3.5 3 3 2.5-2.5 4.5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </SmallIcon>
  );
}

export function AIRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </SmallIcon>
  );
}

export function NetworkRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="2.5" cy="4"  r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="13.5" cy="4"  r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="2.5" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="13.5" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M4 5l2.5 2M12 5l-2.5 2M4 11l2.5-2M12 11l-2.5-2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </SmallIcon>
  );
}

export function DevelopRoomIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path
        d="M5 5L2 8l3 3M11 5l3 3-3 3M8 3l-1.5 10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SmallIcon>
  );
}

// ─── UI icons ────────────────────────────────────────────────────────────────

export function ChevronDownIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </SmallIcon>
  );
}

export function ExternalLinkIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path
        d="M9 3h4v4M13 3L7 9M6 5H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SmallIcon>
  );
}

export function LogOutIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path
        d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SmallIcon>
  );
}

export function UserIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M2.5 13.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </SmallIcon>
  );
}

export function AlertIcon(props: SmallIconProps) {
  return (
    <SmallIcon {...props}>
      <path
        d="M8 2L1.5 13h13L8 2z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </SmallIcon>
  );
}
