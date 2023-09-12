import { Users } from "../../views/users/users";
import { ManageUser } from "../../views/manageUser/manageUser";

const Routes = [
  {
    path: "/users",
    view: Users,
    layout: "app",
    permission: "Admin",
    title: "User Management",
  },
  {
    path: "/users/:orgUserId",
    view: ManageUser,
    layout: "app",
    permission: "Admin",
    title: "Users",
  },
];

export default Routes;
