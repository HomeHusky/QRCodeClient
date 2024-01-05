import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://qr-code-backend-tan.vercel.app//api/",
  withCredentials: true,
});