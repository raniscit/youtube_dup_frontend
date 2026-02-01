// src/components/ProfileSkeleton.jsx
const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] animate-pulse text-white">
      <div className="h-56 bg-[#272727]" />

      <div className="max-w-6xl mx-auto px-6 -mt-16 flex gap-6">
        <div className="w-36 h-36 rounded-full bg-[#272727]" />

        <div className="flex-1 space-y-4 mt-8">
          <div className="h-6 w-48 bg-[#272727] rounded" />
          <div className="h-4 w-64 bg-[#272727] rounded" />
          <div className="h-4 w-full max-w-md bg-[#272727] rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
