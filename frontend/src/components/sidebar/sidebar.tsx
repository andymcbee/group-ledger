import { NavLink } from "react-router-dom";

export function Sidebar(props) {
  return (
    <>
      <div className="flex flex-col items-start gap-2 p-10 w-56 bg-blue-800">
        {props.items.map((item) => {
          return (
            <NavLink
              className="text-blue-300 hover:text-blue-500 text-xl"
              to={item.path}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

//<div className="w-56 bg-blue-800">
