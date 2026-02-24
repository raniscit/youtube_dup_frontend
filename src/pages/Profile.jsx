import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, Plus } from "lucide-react";
import LikedVideos from "../components/LikeVideo";
import { getUserProfile, getUserVideos } from "../api/profile.api";
import {
  getMyPlaylists,
} from "../api/playlist.api";

import ProfileSkeleton from "../components/ProfileSkeleton";
import PlaylistModal from "../components/PlaylistModal";
import { getWatchHistory } from "../api/profile.api";
import VideoCard from "../components/VideoCard";


const Profile = () => {
  const { username, userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getUserProfile(username);
        const videosData = await getUserVideos(userId);
        const playlistsData = await getMyPlaylists(userId);
        const historyData = await getWatchHistory(userId);

        setProfile(profileData);
        setVideos(videosData);
        setPlaylists(playlistsData);
        setHistory(historyData);
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


  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* Banner */}
      <div className="h-56 overflow-hidden">
        <img
          src={profile?.coverImage?.coverImage}
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
        {["Videos", "Playlists", "LikedVideos", "History", "About"].map((tab) => (
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
        <div className="max-w-6xl mx-auto px-6 py-10 text-gray-300">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT — Description */}
            <div className="lg:col-span-2 bg-[#181818] rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-semibold mb-4 text-white">
                Description
              </h2>

              <p className="whitespace-pre-line leading-relaxed text-gray-400">
                {profile?.description || "No description provided."}
              </p>
            </div>

            {/* RIGHT — Channel Info */}
            <div className="bg-[#181818] rounded-xl p-6 shadow-md space-y-4">

              <h2 className="text-lg font-semibold text-white">
                Channel Details
              </h2>

              <div className="text-sm space-y-2">

                <div className="flex justify-between">
                  <span className="text-gray-400">Joined</span>
                  <span>
                    {new Date(profile?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Total Videos</span>
                  <span>{profile?.videosCount || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Total Views</span>
                  <span>{profile?.totalViews || 0}</span>
                </div>

                {profile?.email && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Business Email</span>
                    <span className="truncate max-w-[150px]">
                      {profile.email}
                    </span>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

      {/* HISTORY */}
      {activeTab === "History" && (
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {history.length === 0 ? (
            <p className="text-gray-400">No watch history</p>
          ) : (
            history.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))
          )}
        </div>
      )}

      {/* Liked videos */}
      {activeTab === "LikedVideos" && <LikedVideos />}

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
