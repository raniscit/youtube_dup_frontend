// import { useState } from "react";
// import { usePublishVideo } from "../hooks/usepublishVideo";
// const PublishVideo = ({ onClose }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);

//   const { submit, loading, error } = usePublishVideo(() => {
//     onClose();
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     submit({ title, description, videoFile, thumbnail });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <div className="bg-white w-[420px] rounded-lg p-6 shadow-xl">
//         <h2 className="text-xl font-semibold mb-4 text-black">
//           Publish Video
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Video title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border p-2 rounded text-black"
//           />

//           <textarea
//             placeholder="Video description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border p-2 rounded text-black"
//             rows={3}
//           />

//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideoFile(e.target.files[0])}
//           />

//           {videoFile && <span style={{ marginLeft: "10px",color: "black" }}>{videoFile.name}</span>}

//           <br /><br />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setThumbnail(e.target.files[0])}
//           />
//           {thumbnail && <span style={{ marginLeft: "10px",color: "black" }}>{thumbnail.name}</span>}

//           {error && (
//             <p className="text-sm text-red-600">{error}</p>
//           )}

//           <div className="flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded text-black"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
//             >
//               {loading ? "Publishing..." : "Publish"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PublishVideo;


import { useState } from "react";
import { usePublishVideo } from "../hooks/usepublishVideo";

const PublishVideo = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const { submit, loading, error } = usePublishVideo(() => {
    onClose();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ title, description, videoFile, thumbnail });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 w-[440px] rounded-lg p-6 shadow-lg text-gray-300">
        <h2 className="text-2xl font-semibold mb-6 text-white">Publish Video</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          {/* Description */}
          <textarea
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-slate-400"
            rows={4}
          />

          {/* Video File Section */}
          <div>
            <label className="block mb-1 font-medium text-white">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="text-gray-300"
            />
            {videoFile && (
              <p className="mt-1 text-sm text-gray-400 truncate max-w-full">
                Selected: <span className="font-semibold">{videoFile.name}</span>
              </p>
            )}
          </div>

          {/* Thumbnail File Section */}
          <div>
            <label className="block mb-1 font-medium text-white">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="text-gray-300"
            />
            {thumbnail && (
              <p className="mt-1 text-sm text-gray-400 truncate max-w-full">
                Selected: <span className="font-semibold">{thumbnail.name}</span>
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded text-gray-300 hover:border-red-600 hover:text-red-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-60 transition"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishVideo;
