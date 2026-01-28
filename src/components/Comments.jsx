import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    getVideoComments,
    addComment,
    toggleCommentLike
} from "../api/comment.api";

const Comments = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch all comments of current video
    const fetchComments = async () => {
        try {
            setLoading(true);
            const data = await getVideoComments(videoId);
            setComments(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch comments", err);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    // Add comment (redirect to register if not logged in)
    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            const val = await addComment(videoId, content);
            setContent("");
            fetchComments();
            console.log(val);
            
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate("/register", {
                    state: { from: location.pathname }
                });

                return;
            }
            console.error("Failed to add comment", err);
        }
    };

    // Like / Unlike comment (redirect if not logged in)
    const handleLike = async (commentId) => {
        try {
            await toggleCommentLike(commentId);
            fetchComments();
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate("/register");
                return;
            }
            console.error("Failed to like comment", err);
        }
    };

    return (
        <div>
            {/* ADD COMMENT */}
            <div className="flex gap-3 mb-4">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-800 p-2 rounded outline-none"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 px-4 rounded hover:bg-blue-700"
                >
                    Comment
                </button>
            </div>

            {/* LOADING */}
            {loading && (
                <p className="text-gray-400">Loading comments...</p>
            )}

            {/* NO COMMENTS */}
            {!loading && comments.length === 0 && (
                <p className="text-gray-500">
                    No comments yet. Be the first to comment 👀
                </p>
            )}

            {/* COMMENTS LIST */}
            {!loading &&
                comments.map((c) => (
                    <div key={c._id} className="mb-4">
                        <p className="font-semibold">{c.owner.username}</p>
                        <p className="text-gray-300">{c.content}</p>

                        <button
                            onClick={() => handleLike(c._id)}
                            className="text-sm text-gray-400 mt-1 hover:text-white"
                        >
                            👍 {c.likesCount}
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default Comments;
