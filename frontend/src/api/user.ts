import { api, userRoute } from "./config/config";

//user routes

export const userApi = {
  signin: async (data) => {
    try {
      const { user_email, user_password } = data;

      const res = await api.request({
        url: `${userRoute}/login`,
        method: "POST",
        data: {
          user_email,
          user_password,
        },
      });
      console.log("RES:::");
      console.log(res);

      return res.data;
    } catch (error) {
      console.log("SIGN IN UTILITY::::");
      console.log(error.response);
      throw error.response.data.message || "Error logging in!";
    }
  },
  me: async () => {
    try {
      const res = await api.request({
        url: `${userRoute}/me`,
        method: "POST",
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  signout: async () => {
    try {
      const res = await api.request({
        url: `${userRoute}/logout`,
        method: "POST",
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
};
