import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
export interface IAppRoute {
  path: string;
  component: React.Component;
  lable?: string;
  pathMatch?: string;
}
export const AppRoutes = [
  { path: "/", component: HomePage, lable: "Home", pathMatch: "full" },
  { path: "/users", component: UserPage, lable: "Users", pathMatch: false },
];
