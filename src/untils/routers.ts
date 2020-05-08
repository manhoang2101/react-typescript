import { HomePage } from "../pages/home";
import { UserPage } from "../pages/user";
import ContainerProp from "../containers";
import { LoginPage } from "../pages/auth/login.page";
export interface IAppRoute {
  path: string;
  component: React.Component<ContainerProp>;
  key: string;
  pathMatch?: string;
  isPrivate?: boolean;
}
export const AppRoutes = [
  {
    path: "/",
    component: HomePage,
    key: "Home",
    pathMatch: "full",
    isPrivate: true,
  },
  {
    path: "/users",
    component: UserPage,
    key: "Users",
    pathMatch: false,
    isPrivate: true,
  },
  {
    path: "/login",
    component: LoginPage,
    key: "Login",
    pathMatch: false,
    isPrivate: false,
  },
];
