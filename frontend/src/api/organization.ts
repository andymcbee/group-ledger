import { api, organizationRoute } from "./config/config";

//user routes

export const organizationApi = {
  fetchOrgUsers: async (organization_id) => {
    try {
      const res = await api.request({
        url: `${organizationRoute}/${organization_id}/users`,
        method: "GET",
      });
      console.log("RES:::");
      console.log(res);

      return res.data.users || null;
    } catch (error) {
      console.log("SIGN IN UTILITY::::");
      console.log(error.response);
      throw error.response.data.message || "Error fetching users!";
    }
  },
  fetchOrgUser: async (organization_id, organization_user_id) => {
    try {
      const res = await api.request({
        url: `${organizationRoute}/${organization_id}/user/${organization_user_id}`,
        method: "GET",
      });
      console.log("RES:::");
      console.log(res);

      return res.data.users || null;
    } catch (error) {
      console.log("SIGN IN UTILITY::::");
      console.log(error.response);
      throw error.response.data.message || "Error fetching users!";
    }
  },
};
