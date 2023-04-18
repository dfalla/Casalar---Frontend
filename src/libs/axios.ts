import Axios from "axios";
import { useAuthStore } from "../store/auth";

// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? process.env.DOMAIN
//     : "http://localhost:3000";

const baseURL = "http://localhost:3001/api"
 

const api = Axios.create({
  baseURL,
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  
    const token = useAuthStore.getState().token;

    if (config && config.headers) { 
      config.headers["x-token"] = token
    }
  
  return config;
});

export default api;