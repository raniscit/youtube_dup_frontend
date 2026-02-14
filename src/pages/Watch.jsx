import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoById, fetchPublicVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Comments from "../components/Comments";
import AddToPlaylist from "../components/AddToPlaylist";
import LikeButton from "../components/LikeButton";
import { useAuth } from "../context/AuthContext";
import SubscribeButton from "../components/SubscribeButton";
import { getSubscriberCount } from "../api/subscription.api";

const Watch = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const { loading: authLoading, user } = useAuth();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);


  // Fetch current video — wait until auth finishes loading
  useEffect(() => {
    if (authLoading) return; // wait for auth to load

    const fetchVideo = async () => {
      try {
        const res = await getVideoById(videoId);
        setVideo(res.data.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Video not found");
      }
    };

    fetchVideo();
  }, [videoId, authLoading]);

  // Fetch recommended videos once on mount
  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchPublicVideos();
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    getVideos();
  }, []);


  useEffect(() => {
    if (!video?.owner?._id) return;

    const fetchCount = async () => {
      try {
        const count = await getSubscriberCount(video.owner._id);
        setSubscriberCount(count);
      } catch (err) {
        console.error("Failed to fetch subscriber count", err);
      }
    };

    fetchCount();
  }, [video?.owner?._id]);

  const formatSubscribers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };



  if (authLoading) return <p className="text-white">Loading authentication...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!video) return <p className="text-white">Loading video...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT — VIDEO + DETAILS */}
          <div className="lg:col-span-3">

            {/* VIDEO PLAYER */}
            <div className="w-full aspect-video bg-black">
              <video
                src={video.videoFile}
                controls
                autoPlay
                className="w-full h-full rounded-lg object-contain"
              />
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-xl md:text-2xl font-semibold leading-snug">
              {video.title}
            </h1>

            {/* CHANNEL ROW */}
            <div className="flex items-center justify-between mt-4">

              {/* LEFT */}
              <div className="flex items-center gap-3">
                <img
                  src={video.owner?.avatar || "/default-avatar.png"}
                  alt={video.owner?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/channel/${video.owner?._id}/${video.owner?.username}`)
                    }
                  >
                    {video.owner?.username || "Unknown Channel"}
                  </p>

                  <p className="text-sm text-gray-400">
                    {formatSubscribers(subscriberCount)} subscribers
                  </p>

                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-5">
                {video.owner?._id === user?._id ? (
                  <span className="text-sm text-gray-400 font-medium">
                    Your Channel
                  </span>
                ) : (<SubscribeButton
                  channelId={video.owner?._id}
                  onSubscriptionChange={(subscribed) => {
                    setSubscriberCount(prev =>
                      subscribed ? prev + 1 : prev - 1
                    );
                  }}
                />)}



                <div className="flex mt-5 ">
                  <LikeButton
                    videoId={video._id}
                    initialLikes={video.likesCount}
                    alreadyLiked={video.isLikedByUser}
                  />
                </div>

                <div className="mt-4">
                  <AddToPlaylist videoId={video._id} />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 bg-gray-900 rounded-lg p-4 text-gray-300">
              <p className="whitespace-pre-line">
                {video.description}
              </p>
            </div>

            {/* COMMENTS */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Comments
              </h2>

              <div className="bg-gray-900 rounded-lg p-4">
                <Comments />
              </div>
            </div>
          </div>

          {/* RIGHT — RECOMMENDED VIDEOS */}
          <div className="lg:col-span-1 space-y-4">
            {videos
              .filter(v => v._id !== videoId)
              .map(v => (
                <VideoCard
                  key={v._id}
                  video={v}
                  horizontal
                />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Watch;
