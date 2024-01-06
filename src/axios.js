import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://192.168.1.235:443/api/",
  withCredentials: true,
});