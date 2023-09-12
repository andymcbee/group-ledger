import { Dashboard } from "../../views/dashboard/dashboard";

const Routes = [
  {
    path: "/dashboard",
    view: Dashboard,
    layout: "app",
    permission: "User",
    title: "Dashboard",
  },
];

export default Routes;
