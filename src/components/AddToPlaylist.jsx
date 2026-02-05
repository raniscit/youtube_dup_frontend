import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getMyPlaylists,
  addVideoToPlaylist
} from "../api/playlist.api";

const AddToPlaylist = ({ videoId }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 🔹 Fetch playlists from backend
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getMyPlaylists(user._id);
        setPlaylists(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/register", {
            state: { from: location.pathname }
          });
        } else {
          console.error("Failed to fetch playlists", err);
        }
      } finally {
        setFetching(false);
      }
    };

    if (isLoggedIn && user?._id) {
      fetchPlaylists();
    } else {
      setFetching(false);
    }
  }, [isLoggedIn, user, navigate, location.pathname]);

  // 🔹 Add video to selected playlist
  const handleAdd = async () => {
    if (!isLoggedIn) {
      navigate("/register", {
        state: { from: location.pathname }
      });
      return;
    }

    if (!selectedPlaylist) return;

    try {
      setLoading(true);
      await addVideoToPlaylist(selectedPlaylist, videoId);
      alert("Video added to playlist ✅");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/register", {
          state: { from: location.pathname }
        });
      } else {
        console.error("Failed to add video to playlist", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 UI states
  if (fetching) return null;

  return (
    <div className="flex items-center gap-3 mt-3">
      {isLoggedIn ? (
        <>
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            className="bg-gray-900 text-white px-3 py-2 rounded outline-none"
          >
            <option value="">Select playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAdd}
            disabled={loading || !selectedPlaylist}
            className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
          >
            {loading ? "Adding..." : "Add to Playlist"}
          </button>
        </>
      ) : (
        <button
          onClick={() =>
            navigate("/register", {
              state: { from: location.pathname },
            })
          }
          className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 text-sm"
        >
          Add to Playlist
        </button>
      )}
    </div>
  );

};

export default AddToPlaylist;
