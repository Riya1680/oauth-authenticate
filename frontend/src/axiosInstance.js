import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // your backend URL
  withCredentials: true, // to send/receive cookies
});

export default API;