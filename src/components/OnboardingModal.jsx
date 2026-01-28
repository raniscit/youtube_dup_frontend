const OnboardingModal = ({ onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-zinc-900 w-[90%] max-w-md rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">
          Welcome to MyTube
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          Discover videos across music, movies, education, sports and more.
          Subscribe to creators and personalize your feed.
        </p>

        <ul className="text-sm text-gray-300 mb-6 space-y-2">
          <li>• Browse trending videos</li>
          <li>• Follow your favorite creators</li>
          <li>• Create playlists & history</li>
        </ul>

        <button
          onClick={onClose}
          className="w-full py-2 bg-white text-black rounded-md font-medium"
        >
          OK, Got it
        </button>
      </div>
    </div>
  );
};

export default OnboardingModal;
