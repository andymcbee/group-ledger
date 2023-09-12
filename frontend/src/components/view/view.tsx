import { useState } from "react";
import { AppLayout } from "../layout/app/app";
import { AuthLayout } from "../layout/auth/auth";
import "react-toastify/dist/ReactToastify.css";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";

export function View(props) {
  const [loading, setLoading] = useState(false);

  const layouts = {
    app: AppLayout,
    auth: AuthLayout,
  };

  const Layout = layouts[props.layout];
  console.log("LAYOUT:::");
  console.log(Layout);
  console.log("PROPS:::");
  console.log(props);

  return (
    <>
      {loading && <LoadingSpinner />}
      <Layout title={props.title} view={props.display}></Layout>
    </>
  );
}
