import { Card } from "../../components/card/card";
/* import { organizationApi } from "../../api/organization";
 */ import { useEffect } from "react";
/* import { UserContext } from "../../app/auth";
import { NavLink } from "react-router-dom"; */

//const TABLE_HEAD = ["Name", "Email", "Role", "Action"];

export function ManageUser() {
  /*   const { user } = useContext(UserContext) ?? { user: null }; // Provide a default value for user
  const [tableRows, setTableRows] = useState([]);

  const current_org_id = user?.user.current_organization; */

  useEffect(() => {
    /*  const fetchData = async () => {
      const users = await organizationApi.fetchOrgUsers(current_org_id);
      console.log("Org users:::");
      console.log(users);

      const tableRowData = users.map((item) => {
        const userData = {
          name: item.user_name,
          email: item.user_email,
          role: item.user_role,
          user_id: item.id,
        };
        return userData;
      });
      console.log(tableRowData);
      setTableRows(tableRowData);
    };

    fetchData(); */
  }, []);

  return (
    <>
      <Card title="Users!">Testing...</Card>
    </>
  );
}
