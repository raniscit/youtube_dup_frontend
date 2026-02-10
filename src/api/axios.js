import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // attach token ONLY if valid
    if (
      accessToken &&
      accessToken !== "null" &&
      accessToken !== "undefined"
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      // optional: redirect to login
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
