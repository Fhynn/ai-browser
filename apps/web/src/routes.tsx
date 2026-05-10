import type { ComponentType } from "react";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { DashboardPage } from "./pages/DashboardPage";
import { DemoPage } from "./pages/DemoPage";
import { ExtensionPage } from "./pages/ExtensionPage";
import { HomePage } from "./pages/HomePage";
import { ResearchPage } from "./pages/ResearchPage";
import { SafetyPage } from "./pages/SafetyPage";
import { ShoppingPage } from "./pages/ShoppingPage";
import { SimulatorPage } from "./pages/SimulatorPage";
import { WorkflowPage } from "./pages/WorkflowPage";

export interface RoutePageProps {
  onNavigate: (path: string) => void;
}

export interface AppRoute {
  path: string;
  label: string;
  eyebrow: string;
  component: ComponentType<RoutePageProps>;
}

export const ROUTES: AppRoute[] = [
  {
    path: "/",
    label: "Home",
    eyebrow: "Landing",
    component: HomePage
  },
  {
    path: "/demo",
    label: "Demo",
    eyebrow: "Guided",
    component: DemoPage
  },
  {
    path: "/simulator",
    label: "Simulator",
    eyebrow: "Agent",
    component: SimulatorPage
  },
  {
    path: "/use-cases/research",
    label: "Research",
    eyebrow: "Use Case",
    component: ResearchPage
  },
  {
    path: "/use-cases/shopping",
    label: "Shopping",
    eyebrow: "Use Case",
    component: ShoppingPage
  },
  {
    path: "/use-cases/workflow",
    label: "Workflow",
    eyebrow: "Use Case",
    component: WorkflowPage
  },
  {
    path: "/dashboard",
    label: "Dashboard",
    eyebrow: "Tasks",
    component: DashboardPage
  },
  {
    path: "/extension",
    label: "Extension",
    eyebrow: "Chrome",
    component: ExtensionPage
  },
  {
    path: "/safety",
    label: "Safety",
    eyebrow: "Policy",
    component: SafetyPage
  },
  {
    path: "/architecture",
    label: "Architecture",
    eyebrow: "System",
    component: ArchitecturePage
  }
];

export const primaryNavRoutes = ROUTES.filter((route) =>
  ["/", "/demo", "/simulator", "/dashboard", "/extension"].includes(route.path)
);

export const secondaryNavRoutes = ROUTES.filter((route) =>
  ["/use-cases/research", "/use-cases/shopping", "/use-cases/workflow", "/safety", "/architecture"].includes(
    route.path
  )
);
