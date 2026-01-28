import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  // Later: fetch user data by userId
  const isMyProfile = user?._id === userId;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.avatar || "/default-avatar.png"}
          className="w-28 h-28 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-700 mb-6">
        <button className="pb-2 border-b-2 border-white">Videos</button>
        <button className="pb-2 text-gray-400">Liked Videos</button>
        <button className="pb-2 text-gray-400">About</button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Later map user's videos */}
        <div className="bg-gray-800 p-4 rounded-lg">
          User videos here
        </div>
      </div>
    </div>
  );
};

export default Profile;
