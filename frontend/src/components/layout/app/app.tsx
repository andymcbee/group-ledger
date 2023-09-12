import { Sidebar } from "../../sidebar/sidebar";
import { AppNav } from "../../nav/app/app";
export function AppLayout(props) {
  const sidebarItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Signin", path: "/signin" },
  ];

  const View = props.view;
  console.log("Props in app view::::");
  console.log(props);
  return (
    <div className="flex min-h-screen">
      <Sidebar items={sidebarItems} />
      <div className="flex flex-col grow">
        <AppNav />
        <div className="m-6">
          <View title={props.title} />
        </div>
      </div>
    </div>
  );
}
