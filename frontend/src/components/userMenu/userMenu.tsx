import { BiUserCircle } from "react-icons/bi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function UserMenu(props) {
  const [showMenu, setShowMenu] = useState(false);

  console.log(props.children);

  const toggleMenu = (currState, onClick) => {
    console.log("Test....");
    setShowMenu(!currState);
    if (onClick) onClick();
  };
  return (
    <div className="relative inline-block">
      <BiUserCircle
        onClick={() => toggleMenu(showMenu, null)}
        size={50}
        className=" rounded-full hover:cursor-pointer"
      />
      {showMenu && (
        <ul className="absolute top-full right-0 bg-white border border-gray-300 p-0 mt-2 w-52">
          {props.children.map((item) => {
            return (
              <li
                onClick={() => toggleMenu(showMenu, item.onClick)}
                className="py-2 px-4 hover:bg-gray-100"
              >
                <NavLink to={item.url} className="block w-full">
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
