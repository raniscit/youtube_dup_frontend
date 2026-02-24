import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // VERY IMPORTANT
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional: clear frontend user state only
      localStorage.removeItem("user"); 
      // redirect if needed
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;