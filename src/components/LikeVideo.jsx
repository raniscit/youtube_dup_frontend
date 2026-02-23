import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getLikedVideo } from "../api/video.api";

const LikedVideos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const loadLiked = async () => {
            try {
                const data = await getLikedVideo();
                setVideos(data);
            } catch (err) {
                console.error("Failed to load liked videos", err);
            }
        };

        loadLiked();
    }, []);


    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6 ml-44">            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
        </div>
    );
};

export default LikedVideos;