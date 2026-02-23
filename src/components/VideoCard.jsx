import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return "0:00";

    const totalSeconds = Math.floor(seconds); // 🔥 remove decimals

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  if (!video) return null;

  return (
    <div
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer group transition-transform duration-200 hover:scale-[1.02]"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded-md font-medium">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="w-9 h-9 rounded-full object-cover border border-gray-700"
        />

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-gray-200 transition-colors">
            {video.title}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            {video.owner?.username}
          </p>

          <p className="text-xs text-gray-500">
            {video.views?.toLocaleString()} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;