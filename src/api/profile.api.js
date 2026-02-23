import axios from "axios";

export const getUserProfile = async (username) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/users/c/${username}`,
    { withCredentials: true }
  );
  return res.data.data;
};

export const getUserVideos = async (userId) => {
  const res = await axios.get(
    `http://localhost:8000/api/v1/videos/users/${userId}`,
    { withCredentials: true }
  );
  return res.data.data.videos;
};
