import { UserMenu } from "../../userMenu/userMenu";
import { useContext } from "react";
import { UserContext } from "../../../app/auth";

export function AppNav() {
  const { signOut } = useContext(UserContext) ?? { user: null }; // Provide a default value for user

  const userMenuLinks = [
    { label: "Account", url: "/account" },
    { label: "Users", url: "/users" },
    { label: "33333", url: "", onClick: () => signOut() },
  ];

  return (
    <div className="flex justify-end items-center h-20 bg-gray-300 p-10 z-50">
      <UserMenu>{userMenuLinks}</UserMenu>
    </div>
  );
}
