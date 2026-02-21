import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Plus } from "lucide-react";

import { getUserProfile, getUserVideos } from "../api/profile.api";
import {
  getMyPlaylists,
  createPlaylist,
  addVideoToPlaylist,
} from "../api/playlist.api";

import ProfileSkeleton from "../components/ProfileSkeleton";
import PlaylistModal from "../components/PlaylistModal";

const Profile = () => {
  const { username, userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile(username);
        const videosData = await getUserVideos(userId);
        const playlistsData = await getMyPlaylists(userId);

        setProfile(profileData);
        setVideos(videosData);
        setPlaylists(playlistsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, userId]);

  const handleCreatePlaylist = (newPlaylist) => {
    setPlaylists((prev) => [newPlaylist, ...prev]);
    setShowModal(false);
  };

  const handleAddToPlaylist = async (playlistId, videoId) => {
    await addVideoToPlaylist(playlistId, videoId);
    alert("Added to playlist");
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Banner */}
      <div className="h-56 overflow-hidden">
        <img
          src={profile?.coverImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="flex gap-6 items-end">
          <img
            src={profile?.avatar}
            alt="Avatar"
            className="w-36 h-36 rounded-full border-4 border-[#0f0f0f]"
          />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">
                {profile?.username}
              </h1>
              {profile?.verified && (
                <CheckCircle2 className="text-blue-500" size={20} />
              )}
            </div>

            <p className="text-gray-400 text-sm mt-1">
              {profile?.email}
            </p>

            <div className="flex gap-6 mt-3 text-gray-400 text-sm">
              <span>{videos.length} videos</span>
              <span>{playlists.length} playlists</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-8 border-b border-[#3f3f3f] flex gap-8 items-center">
        {["Videos", "Playlists", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-semibold text-sm ${activeTab === tab
              ? "border-b-2 border-white"
              : "text-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}

        {activeTab === "Playlists" && (
          <button
            onClick={() => setShowModal(true)}
            className="ml-auto flex items-center gap-2 bg-white text-black px-4 py-1 rounded-full text-sm"
          >
            <Plus size={16} />
            Create
          </button>
        )}
      </div>

      {/* VIDEOS */}
      {/* VIDEOS */}
      {activeTab === "Videos" && (
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <div
              key={video._id}
              onClick={() => navigate(`/watch/${video._id}`)}
              className="cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="aspect-video rounded-xl mb-2 overflow-hidden relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <div className="text-white text-3xl">▶</div>
                </div>
              </div>

              <h3 className="font-semibold text-sm line-clamp-2">
                {video.title}
              </h3>
              
            </div>
          ))}
        </div>
      )}

      {/* PLAYLISTS */}
      {activeTab === "Playlists" && (
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlists.map((playlist) => (
            <div
              key={playlist._id}
              onClick={() =>
                navigate(`/playlist/${playlist._id}`)
              }
              className="bg-[#181818] p-4 rounded-xl hover:bg-[#222] cursor-pointer transition"
            >
              {/* Playlist Thumbnail */}
              <div className="aspect-video rounded-lg mb-3 overflow-hidden bg-[#272727]">
                {playlist.videos && playlist.videos.length > 0 ? (
                  <img
                    src={playlist.videos[0]?.thumbnail}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                    No Videos
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-sm">
                {playlist.name}
              </h3>

              <p className="text-gray-400 text-xs mt-1">
                {playlist.videos?.length || 0} videos
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ABOUT */}
      {activeTab === "About" && (
        <div className="max-w-6xl mx-auto px-6 py-6 text-gray-300">
          <p>{profile?.about}</p>
        </div>
      )}

      {showModal && (
        <PlaylistModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreatePlaylist}
        />
      )}
    </div>
  );
};

export default Profile;
