"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { ChevronDownIcon, LogOutIcon, UserIcon } from "@/components/icons";

interface AccountMenuProps {
  name: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  authentikUrl: string;
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function AccountMenu({
  name,
  username,
  email,
  authentikUrl,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState("64px");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const initials = getInitials(name);

  const handleToggle = useCallback(() => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuTop(`${rect.bottom + 8}px`);
    }
    setOpen((v) => !v);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const profileUrl = `${authentikUrl}/if/user/#/settings`;

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${name ?? username ?? "user"}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--ink)",
          fontFamily: "inherit",
          padding: "0.25rem 0.5rem",
          borderRadius: "8px",
          transition: "background-color 150ms ease-out",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "var(--surface-raised)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
            "transparent")
        }
      >
        {/* Avatar */}
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--primary-muted)",
            border: "1.5px solid var(--primary)",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--primary)",
            flexShrink: 0,
          }}
        >
          {initials}
        </span>
        {/* Name — hidden on small screens */}
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--ink)",
            maxWidth: "160px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="hide-on-mobile"
        >
          {name ?? username ?? email ?? "Account"}
        </span>
        <ChevronDownIcon
          style={{
            color: "var(--ink-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 150ms ease-out",
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Account options"
          style={{
            position: "fixed",
            top: menuTop,
            right: "16px",
            minWidth: "220px",
            background: "var(--surface-raised)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "8px",
            zIndex: "var(--z-dropdown)",
            boxShadow: "0 8px 32px oklch(0 0 0 / 0.4)",
            animation: "fade-in 150ms ease-out",
          }}
        >
          {/* User info header */}
          <div
            style={{
              padding: "8px 12px 12px",
              borderBottom: "1px solid var(--border)",
              marginBottom: "8px",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name ?? username ?? "User"}
            </p>
            {email && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--ink-muted)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: "2px",
                }}
              >
                {email}
              </p>
            )}
          </div>

          {/* Profile link */}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            style={menuItemStyle}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "var(--surface)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "transparent")
            }
          >
            <UserIcon style={{ color: "var(--ink-muted)", flexShrink: 0 }} />
            <span>Manage account</span>
          </a>

          {/* Sign out */}
          <button
            role="menuitem"
            onClick={() =>
              signOut({
                callbackUrl: "/",
                redirect: true,
              })
            }
            style={{
              ...menuItemStyle,
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              color: "var(--error)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "var(--surface)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                "transparent")
            }
          >
            <LogOutIcon
              style={{ color: "var(--error)", flexShrink: 0 }}
            />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  );
}

const menuItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--ink)",
  cursor: "pointer",
  textDecoration: "none",
  transition: "background-color 120ms ease-out",
  backgroundColor: "transparent",
  textAlign: "left",
};
