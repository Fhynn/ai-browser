import { RouteLink } from "./RouteLink";

interface RouteButtonProps {
  activePath?: string;
  href: string;
  label: string;
  onNavigate: (path: string) => void;
  variant?: "light" | "dark";
}

export function RouteButton({ activePath = "", href, label, onNavigate, variant = "light" }: RouteButtonProps) {
  const className =
    variant === "dark"
      ? "border border-primaryBlack bg-primaryBlack px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-white transition hover:bg-surfaceWhite hover:text-primaryBlack"
      : "border border-primaryBlack bg-surfaceWhite px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] transition hover:bg-primaryBlack hover:text-white";

  return (
    <RouteLink activePath={activePath} className={className} href={href} onNavigate={onNavigate}>
      {label}
    </RouteLink>
  );
}
