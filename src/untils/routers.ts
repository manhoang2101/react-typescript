import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import ContainerProp from "../containers";
export interface IAppRoute {
  path: string;
  component: React.Component<ContainerProp>;
  label?: string;
  pathMatch?: string;
}
export const AppRoutes = [
  { path: "/", component: HomePage, label: "Home", pathMatch: "full" },
  { path: "/users", component: UserPage, label: "Users", pathMatch: false },
];
