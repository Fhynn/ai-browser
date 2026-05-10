import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTES } from "./routes";

function getCurrentPath(): string {
  return window.location.pathname || "/";
}

export function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const handlePopState = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const route = useMemo(() => ROUTES.find((item) => item.path === path), [path]);

  const navigate = (nextPath: string) => {
    if (nextPath === path) {
      return;
    }

    window.history.pushState(null, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppShell activePath={path} onNavigate={navigate}>
      {route ? <route.component onNavigate={navigate} /> : <NotFoundPage onNavigate={navigate} />}
    </AppShell>
  );
}
