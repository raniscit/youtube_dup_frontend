import { useState } from "react";
import { createPlaylist } from "../api/playlist.api";

const PlaylistModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async () => {
    if (loading) return;
    if (!name.trim() || !description.trim()) {
      setError("Name and description are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newPlaylist = await createPlaylist({
        name,
        description,
      });

      // Send created playlist back to parent
      if (onCreate) {
        onCreate(newPlaylist);
      }

      // Reset form
      setName("");
      setDescription("");

      // Close modal
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to create playlist"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#181818] w-96 p-6 rounded-xl">
        <h2 className="text-white text-lg font-semibold mb-4">
          Create Playlist
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <input
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#272727] text-white px-4 py-2 rounded mb-3 outline-none"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-[#272727] text-white px-4 py-2 rounded mb-4 outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded font-medium"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;