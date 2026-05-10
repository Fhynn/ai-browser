import { BROWSEPILOT_APP_NAME } from "@browsepilot/shared";
import type { PropsWithChildren } from "react";
import { primaryNavRoutes, secondaryNavRoutes } from "../routes";
import { RouteLink } from "./RouteLink";

interface AppShellProps {
  activePath: string;
  onNavigate: (path: string) => void;
}

export function AppShell({ activePath, onNavigate, children }: PropsWithChildren<AppShellProps>) {
  return (
    <div className="min-h-screen bg-pageBackground text-primaryBlack">
      <header className="sticky top-0 z-20 border-b border-borderSoft bg-pageBackground/95 px-5 py-4 backdrop-blur md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <RouteLink
            activePath={activePath}
            className="font-mono text-xs uppercase tracking-[0.24em]"
            href="/"
            onNavigate={onNavigate}
          >
            {BROWSEPILOT_APP_NAME}
          </RouteLink>
          <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
            {primaryNavRoutes.map((route) => (
              <RouteLink
                activePath={activePath}
                className="nav-pill"
                href={route.path}
                key={route.path}
                onNavigate={onNavigate}
              >
                {route.label}
              </RouteLink>
            ))}
          </nav>
          <RouteLink
            activePath={activePath}
            className="border border-primaryBlack bg-surfaceWhite px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.18em] transition hover:bg-primaryBlack hover:text-white"
            href="/demo"
            onNavigate={onNavigate}
          >
            Try Demo
          </RouteLink>
        </div>
        <nav aria-label="Secondary navigation" className="mx-auto mt-4 flex max-w-7xl flex-wrap gap-2">
          {secondaryNavRoutes.map((route) => (
            <RouteLink
              activePath={activePath}
              className="subnav-link"
              href={route.path}
              key={route.path}
              onNavigate={onNavigate}
            >
              {route.label}
            </RouteLink>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="border-t border-borderSoft px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 font-mono text-xs uppercase tracking-[0.18em] text-textSecondary md:flex-row md:items-center md:justify-between">
          <span>BrowsePilot AI / Web App Routes</span>
          <span>Mock mode enabled by default</span>
        </div>
      </footer>
    </div>
  );
}
