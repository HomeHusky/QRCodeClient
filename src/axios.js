import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://qr-code-backend-pi.vercel.app/api/",
  withCredentials: true,
});