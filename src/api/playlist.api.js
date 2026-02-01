import api from "./axios";

// get logged-in user's playlists
export const getMyPlaylists = async (userId) => {
  const res = await api.get(`playlists/get-playlists/${userId}`);
  return res.data.data;
};

// add video to playlist
export const addVideoToPlaylist = async (playlistId, videoId) => {
  const res = await api.post(`/playlists/add-video/${playlistId}/videos/${videoId}`);
  return res.data.data;
};
