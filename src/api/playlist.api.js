import api from "./axios";

// get logged-in user's playlists
export const getMyPlaylists = async (userId) => {
  const res = await api.get(`playlists/get-playlists/${userId}`);
  return res.data.data;
};

// add video to playlist
export const addVideoToPlaylist = async (playlistId, videoId) => {
  const res = await api.post(`/playlists/add-video/${playlistId}/${videoId}`);
  return res.data.data;
};


export const createPlaylist = async (data) => {
  const res = await api.post(`/playlists/create-playlist`, data);
  return res.data.data;
};

export const getPlaylistById = async (playlistId) => {
  const res = await api.get(`/playlists/get-playlist/${playlistId}`);
  return res.data.data;
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  const res = await api.post(`/playlists/remove-video/${playlistId}/${videoId}`);
  return res.data.data;
};

export const deletePlaylist = async (playlistId) => {
  const res = await api.post(`/playlists/delete-playlist/${playlistId}`);
  return res.data.data;
};


export const updatePlaylist = async (playlistId,data) => {
  const res = await api.patch(`/playlists/update-playlist/${playlistId}`,data);
  return res.data.data;
};