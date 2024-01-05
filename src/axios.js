import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://qr-code-backend-eight.vercel.app//api/",
  withCredentials: true,
});