import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/watch/${video._id}`)}
      className="cursor-pointer space-y-2"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover rounded-lg"
        />
        <span className="absolute bottom-1 right-1 bg-black/80 text-xs px-1 rounded">
          {Math.floor(video.duration / 60)}:
          {(video.duration % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-2">
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="w-8 h-8 rounded-full"
        />

        <div>
          <h3 className="text-sm font-medium line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400">
            {video.owner?.username}
          </p>
          <p className="text-xs text-gray-500">
            {video.views} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
