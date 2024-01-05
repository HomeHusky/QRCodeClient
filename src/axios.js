import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://qr-code-backend-pi.vercel.app/api/",
  withCredentials: true,
});