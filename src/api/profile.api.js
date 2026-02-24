import api from "./axios";

export const getUserProfile = async (username) => {
  const res = await api.get(
    `/users/c/${username}`
  );

  return res.data.data;
};

export const getUserVideos = async (userId) => {
  const res = await api.get(
    `/videos/users/${userId}`
  );
  return res.data.data.videos;
};

export const getWatchHistory = async () => {

  const res = await api.get(
    `/users/history`
  );
  return res.data.data;
};

