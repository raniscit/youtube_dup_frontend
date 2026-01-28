import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button onClick={() => setOpen(!open)}>
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover border border-gray-300"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4 border-b">
            <p className="font-semibold">{user.username}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="py-2 text-sm">
            <button
              onClick={() => navigate(`/profile/${user._id}`)}
              className="w-full text-black text-left px-4 py-2 hover:bg-gray-100"
            >
              My Profile
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="w-full text-black text-left px-4 py-2 hover:bg-gray-100"
            >
              Settings
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
