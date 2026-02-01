import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import VideoCard from "../components/VideoCard";
import OnboardingModal from "../components/OnboardingModal";
import { fetchPublicVideos } from "../api/video.api";

const Onboarding = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getVideos = async () => {
            try {
                const data = await fetchPublicVideos();
                setVideos(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to fetch videos", err);
            } finally {
                setLoading(false);
            }
        };

        getVideos();

        // ✅ show onboarding ONLY on first visit in this session
        const hasSeenOnboarding = sessionStorage.getItem("hasSeenOnboarding");

        if (!hasSeenOnboarding) {
            const timer = setTimeout(() => {
                setShowOnboarding(true);
                sessionStorage.setItem("hasSeenOnboarding", "true");
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const redirectToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="relative min-h-screen bg-black text-white">
            <div className={showOnboarding ? "blur-sm brightness-75" : ""}>
                <Header onClick={redirectToRegister} />

                {loading ? (
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 bg-gray-800 rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {videos.map(video => (
                            <VideoCard key={video._id} video={video} />
                        ))}
                    </div>
                )}
            </div>

            {showOnboarding && (
                <OnboardingModal onClose={() => setShowOnboarding(false)} />
            )}
        </div>
    );
};

export default Onboarding;
