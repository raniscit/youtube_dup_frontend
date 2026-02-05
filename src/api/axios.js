// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // your backend
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response?.status === 401) {
//       window.location.href = "/register";
//     }
//     return Promise.reject(err);
//   }
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // <--- IMPORTANT for sending cookies
});

// 🔐 Attach token to every request (optional, depends on your auth flow)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚫 Handle expired / invalid token globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
