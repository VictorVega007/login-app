import axios from "axios";

const apiHeaderConfiguration = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiHeaderConfiguration.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("");
    if (token) {
      config.headers.Accept = "application/json";
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiHeaderConfiguration;
