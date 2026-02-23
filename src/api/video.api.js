import api from "./axios";

export const fetchPublicVideos = async () => {
  const res = await api.get("/videos/videos");
  return res.data.data;
};

export const getVideoById = (videoId) => {
  return api.get(`/videos/get-video/${videoId}`);
};

export const searchVideos = async (query) => {
  const res = await api.get(`/videos/search?q=${query}`);
  return res.data.data;
};

export const likeVideos = async (videoId) => {
  const res = await api.post(`/likes/togglelike-video/${videoId}`);
  return res.data.data;
};

export const publishVideo = async (formData) => {
  const res = await api.post("/videos/publishvideos", formData);
  return res.data.data;
};

export const incrementVideoView  = async (videoId) => {
  const res = await api.patch(`/videos/v/${videoId}/view`);
  return res.data.data;
};

export const getLikedVideo  = async () => {
  const res = await api.get(`/likes/likedvideos`);
  return res.data.data;
};


