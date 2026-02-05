import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { likeVideos } from "../api/video.api";

const LikeButton = ({ videoId, initialLikes = 0, alreadyLiked = false }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(alreadyLiked);
  const [loading, setLoading] = useState(false);

  // Sync backend → frontend on load / refresh or prop change
  useEffect(() => {
    setLikes(initialLikes);
    setLiked(alreadyLiked);
  }, [initialLikes, alreadyLiked]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      navigate("/register", { state: { from: location.pathname } });
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const { liked: isNowLiked, likesCount: updatedCount } = await likeVideos(videoId);

      setLiked(isNowLiked);
      setLikes(updatedCount); // Use backend returned count

      // Optional debug log
      console.log("Toggled like status:", isNowLiked, "Likes count:", updatedCount);

    } catch (err) {
      console.error("Like toggle failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading || likes < 0}
      className={`px-4 py-2 rounded flex items-center gap-2 transition
        ${liked ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"}
        disabled:opacity-60`}
    >
      👍 {likes}
    </button>
  );
};

export default LikeButton;
