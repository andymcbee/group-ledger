import { Card } from "../../components/card/card";
import { organizationApi } from "../../api/organization";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../app/auth";
import { NavLink } from "react-router-dom";

const TABLE_HEAD = ["Name", "Email", "Role", "Action"];

export function Users() {
  const { user } = useContext(UserContext) ?? { user: null }; // Provide a default value for user
  const [tableRows, setTableRows] = useState([]);

  const current_org_id = user?.user.current_organization;

  useEffect(() => {
    const fetchData = async () => {
      const users = await organizationApi.fetchOrgUsers(current_org_id);

      const tableRowData = users.map((item) => {
        const userData = {
          name: item.user_name,
          email: item.user_email,
          role: item.user_role,
          user_id: item.id,
        };
        return userData;
      });
      setTableRows(tableRowData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Card title="User Management">
        <table className="text-left flex-1">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ name, email, role, user_id }, index) => {
              const isLast = index === tableRows.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>{name} </td>
                  <td className={classes}>{email}</td>
                  <td className={classes}>{role}</td>
                  <td className={classes}>
                    <NavLink to={user_id} className="block w-full">
                      Edit
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}
