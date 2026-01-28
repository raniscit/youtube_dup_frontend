import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoById, fetchPublicVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Comments from "../components/comments";

const Watch = () => {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");

  // Fetch current video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(videoId);
        setVideo(res.data.data);
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
      {/* Header */}
      <Header />

      {/* Page Content */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT — MAIN VIDEO */}
          <div className="lg:col-span-3">
            <div className="w-full aspect-video max-h-[70vh] bg-black">
              <video
                src={video.videoFile}
                controls
                autoPlay
                className="w-full h-full rounded-md object-contain"
              />
            </div>

            <h1 className="mt-4 text-xl font-semibold">
              {video.title}
            </h1>

            {/* COMMENTS */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">
                Comments
              </h2>

              <div className="bg-gray-900 rounded-lg p-4 text-gray-400">
                <Comments/>
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
