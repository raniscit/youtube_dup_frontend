import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import { getUserProfile, getUserVideos } from "../api/profile.api";
import ProfileSkeleton from "../components/ProfileSkeleton";

const Profile = () => {
  const { username, userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Videos");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(username);
        const videosData = await getUserVideos(userId);
        console.log(profileData);


        setProfile(profileData);
        setVideos(videosData);
      } catch (error) {
        console.error("Profile fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, userId]);

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

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 flex gap-6">
        <img
          src={profile?.avatar}
          alt="Avatar"
          className="w-36 h-36 rounded-full border-4 border-[#0f0f0f] object-cover"
        />

        <div className="flex-1 mt-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile?.username}</h1>
            {profile.verified && (
              <CheckCircle2 size={18} className="text-gray-300" />
            )}
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {profile.email}
          </p>

          {/* <p className="text-gray-300 text-sm mt-3 max-w-xl">
            {profile.bio}
          </p> */}

          <div className="flex gap-3 mt-4">
            <button className="bg-white text-black px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-200">
              Subscribe
            </button>
            <button className="bg-[#272727] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#3f3f3f]">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-8 border-b border-[#3f3f3f] flex gap-8">
        {["Videos", "Liked", "About"].map((tab) => (
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
      </div>

      {/* Content */}
      {activeTab === "Videos" && (
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <div key={video._id} className="cursor-pointer">
              <div className="aspect-video bg-[#272727] rounded-xl mb-2" />
              <h3 className="font-semibold text-sm line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {video.views} views • {video.createdAt}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "About" && (
        <div className="max-w-6xl mx-auto px-6 py-6 text-gray-300">
          <p>{profile.about}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
