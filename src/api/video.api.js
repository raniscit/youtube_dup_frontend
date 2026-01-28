import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// export const fetchPublicVideos = async () => {
//   const res = await API.get("/videos"); // GET public videos  
//   return Array.isArray(res.data?.data) ? res.data.data : [];
// };


export const fetchPublicVideos = async () => {
  const res = await axios.get("http://localhost:8000/api/v1/videos/videos");
  return res.data.data;
};

export const getVideoById = (videoId) => {
  return API.get(`http://localhost:8000/api/v1/videos/get-video/${videoId}`);
};

export const searchVideos = async (query) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/videos/search?q=${query}`
  );
  return res.data.data;
};