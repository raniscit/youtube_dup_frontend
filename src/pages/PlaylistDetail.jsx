// src/pages/PlaylistDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  removeVideoFromPlaylist,
} from "../api/playlist.api";

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchPlaylist = async () => {
    const data = await getPlaylistById(playlistId);
    setPlaylist(data);
    setName(data.name);
    setDescription(data.description);
  };

  useEffect(() => {
    fetchPlaylist();
  }, [playlistId]);

  const handleUpdate = async () => {
    const updated = await updatePlaylist(playlistId, {
      name,
      description,
    });

    setPlaylist(updated);
    setEditMode(false);
  };

  const handleDelete = async () => {
    await deletePlaylist(playlistId);
    navigate(-1);
  };

  const handleRemoveVideo = async (videoId) => {
    const updated = await removeVideoFromPlaylist(
      playlistId,
      videoId
    );
    setPlaylist(updated);
  };

  const handleRemove = async (e, videoId) => {
    e.stopPropagation(); 

    try {
      await removeVideoFromPlaylist(playlist._id, videoId);

      // Update UI instantly
      setPlaylist(prev => ({
        ...prev,
        videos: prev.videos.filter(v => v._id !== videoId)
      }));

    } catch (err) {
      console.error("Failed to remove video", err);
    }
  };

  if (!playlist) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-8">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          {editMode ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#272727] px-3 py-2 rounded mb-2 block"
              />

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="bg-[#272727] px-3 py-2 rounded w-full"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">
                {playlist.name}
              </h1>
              <p className="text-gray-400 mt-2">
                {playlist.description}
              </p>
            </>
          )}
        </div>

        <div className="flex gap-3">
          {editMode ? (
            <button
              onClick={handleUpdate}
              className="bg-white text-black px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-[#272727] px-4 py-2 rounded"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      {playlist.videos.length === 0 ? (
        <p className="text-gray-400">
          No videos in this playlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlist.videos?.map((video) => (
            <div
              key={video._id}
              onClick={() => navigate(`/watch/${video._id}`)}
              className="bg-[#181818] p-4 rounded-xl hover:bg-[#222] cursor-pointer transition relative"
            >
              {/* Remove Button */}
              <button
                onClick={(e) => handleRemove(e, video._id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded text-white"
              >
                Remove
              </button>

              {/* Thumbnail */}
              <div className="aspect-video rounded mb-3 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold line-clamp-2">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistDetail;