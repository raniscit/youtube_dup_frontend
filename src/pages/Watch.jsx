import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoById, fetchPublicVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Comments from "../components/Comments";
import AddToPlaylist from "../components/AddToPlaylist";

const Watch = () => {
  const { videoId } = useParams();
  const navigate = useNavigate()

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  // Fetch current video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(videoId);
        setVideo(res.data.data);
        console.log("this is the get video by id object", res.data.data);

      } catch (err) {
        console.error(err);
        setError("Video not found");
      }
    };

    fetchVideo();
  }, [videoId]);

  // Fetch recommended videos
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

  if (error) return <p className="text-red-500">{error}</p>;
  if (!video) return <p className="text-white">Loading...</p>;

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
                    {/* placeholder */}
                    12K subscribers
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200">
                Subscribe
              </button>
              <div>
                {/* Video player + info */}

                <AddToPlaylist videoId={video._id} />
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
