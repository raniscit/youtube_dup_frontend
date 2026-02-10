import { useState } from "react";
import { publishVideo } from "../api/video.api";

export const usePublishVideo = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async ({ title, description, videoFile, thumbnail }) => {
    setError(null);

    if (!title || !description || !videoFile || !thumbnail) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    setLoading(true);

    try {
      const data = await publishVideo(formData);
      onSuccess?.(data.data); // backend video object
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};
