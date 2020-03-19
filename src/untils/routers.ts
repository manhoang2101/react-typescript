import { HomePage } from '../pages/home.page';
import { UserPage } from '../pages/user.page';
export interface IAppRoute {
    path: string,
    component: React.Component
    lable?: string;
}
export const AppRoutes = [
    { path: '/', component: HomePage, lable: "Home" },
    { path: '/users', component: UserPage, lable: "Users" }
]