import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://localhost:443/api/",
  withCredentials: true,
});