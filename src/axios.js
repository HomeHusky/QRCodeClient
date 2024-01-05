import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://10.72.32.153:443/api/",
  withCredentials: true,
});