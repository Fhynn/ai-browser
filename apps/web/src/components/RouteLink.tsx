import type { AnchorHTMLAttributes, MouseEvent, PropsWithChildren } from "react";

interface RouteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  activePath: string;
  href: string;
  onNavigate: (path: string) => void;
}

export function RouteLink({
  activePath,
  children,
  className = "",
  href,
  onNavigate,
  ...props
}: PropsWithChildren<RouteLinkProps>) {
  const isActive = activePath === href;
  const activeClass = isActive ? "is-active" : "";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

  return (
    <a aria-current={isActive ? "page" : undefined} className={`${className} ${activeClass}`.trim()} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
