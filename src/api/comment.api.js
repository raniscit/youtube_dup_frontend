import api from "./axios";

// Get comments of a video
export const getVideoComments = async (videoId) => {
  const res = await api.get(`/comments/getcomments/${videoId}`);
  return res.data.data;
};

// ✅ Add comment (THIS FIXES YOUR ISSUE)
export const addComment = async (videoId, content) => {
  const res = await api.post(
    `/comments/add-comment/${videoId}`,
    { content }
  );
  return res.data.data;
};

// Like / Unlike comment
export const toggleCommentLike = async (commentId) => {
  const res = await api.post(
    `/likes/togglelike-comment/${commentId}`
  );
  return res.data.data;
};
