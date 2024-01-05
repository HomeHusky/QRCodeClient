import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://qr-code-sigma-eight.vercel.app/api/",
  withCredentials: true,
});
