import axios from "axios";

// initializing the axios instance with custom configs
export const api = axios.create({
  withCredentials: true,
  // adding a custom language header
  headers: {
    "Custom-Language": "en",
  },
});

const baseApiUrl = "http://localhost:3000/api/v1";

export const userRoute = `${baseApiUrl}/user`;

export const organizationRoute = `${baseApiUrl}/organization`;
