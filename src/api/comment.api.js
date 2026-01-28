// import axios from "axios";

// export const getVideoComments = async(videoId)=>{
//     const res = await axios.get(`http://localhost:8000/api/v1/comments/getcomments/${videoId}`);
//     return res.data.data;
// }

// export const addComment = async(videoId)=>{
//     const res = await axios.post(`http://localhost:8000/api/v1/comments/add-comment/${videoId}`);
//     return res.data.data;
// }

// export const toggleCommentLike = async(commentId) => {
//     const res = await axios.post(`http://localhost:8000/api/v1/likes/togglelike-comment/${commentId}`);
//     return res.data.data;
// }


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true
});

// Get comments of a video
export const getVideoComments = async (videoId) => {
  const res = await API.get(`/comments/getcomments/${videoId}`);
  return res.data.data;
};

// ✅ Add comment (THIS FIXES YOUR ISSUE)
export const addComment = async (videoId, content) => {
  const res = await API.post(
    `/comments/add-comment/${videoId}`,
    { content }
  );
  return res.data.data;
};

// Like / Unlike comment
export const toggleCommentLike = async (commentId) => {
  const res = await API.post(
    `/likes/togglelike-comment/${commentId}`
  );
  return res.data.data;
};
