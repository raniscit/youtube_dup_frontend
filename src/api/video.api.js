import api from "./axios";

// export const fetchPublicVideos = async () => {
//   const res = await API.get("/videos"); // GET public videos  
//   return Array.isArray(res.data?.data) ? res.data.data : [];
// };


export const fetchPublicVideos = async () => {
  const res = await api.get("/videos/videos");
  return res.data.data;
};

export const getVideoById = (videoId) => {
  return api.get(`/videos/get-video/${videoId}`);
};

export const searchVideos = async (query) => {
  const res = await api.get(
    `/videos/search?q=${query}`
  );
  return res.data.data;
};

export const  likeVideos = async (videoId) => {
  const res = await api.post(
    `/likes/togglelike-video/${videoId}`
  );
  return res.data.data;
};