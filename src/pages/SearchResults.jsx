import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";
import Header from "../components/Header";

const SearchResults = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const query = params.get("q");
  const category = params.get("category");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      let data = [];

      if (query) {
        data = await searchVideos(query);
      } else if (category) {
        data = await searchVideos(category);
      }

      setVideos(data || []);
      setLoading(false);
    };

    fetchResults();
  }, [query, category]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="px-6 py-4">
        <h2 className="text-xl mb-4">
          {query && (
            <>
              Search results for:{" "}
              <span className="font-semibold">{query}</span>
            </>
          )}
          {category && (
            <>
              Category:{" "}
              <span className="font-semibold">{category}</span>
            </>
          )}
        </h2>

        {loading ? (
          <p>Searching...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.length === 0 ? (
              <p>No videos found</p>
            ) : (
              videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
