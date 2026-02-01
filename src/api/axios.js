import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // your backend
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = "/register";
    }
    return Promise.reject(err);
  }
);

export default api;
