import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import { LoginPage } from "../pages/auth/login.page";
export interface IAppRoute {
  path: string;
  component: React.Component;
  label?: string;
  pathMatch?: string;
}
export const AppRoutes = [
  { path: "/", component: HomePage, label: "Home", pathMatch: "full" },
  { path: "/users", component: UserPage, label: "Users", pathMatch: false },
  { path: "/login", component: LoginPage, label: "Login", pathMatch: false },
];
