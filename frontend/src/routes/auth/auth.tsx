import { Signin } from "../../views/auth/signin/signin";

const Routes = [
  {
    path: "/signin",
    view: Signin,
    layout: "auth",
    title: "Sign In",
  },
];

export default Routes;
