import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PhotoIcon, UserCircleIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { registerUser } from "../../api/auth.api";
import { useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [status, setStatus] = useState({ loading: false, error: "" });

  // Handle image previews
  const previews = useMemo(() => ({
    avatar: form.avatar ? URL.createObjectURL(form.avatar) : null,
    coverImage: form.coverImage ? URL.createObjectURL(form.coverImage) : null,
  }), [form.avatar, form.coverImage]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const loginhandle = async () => {
    navigate("/login", {
      state: location.state   // 👈 THIS IS CRITICAL
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await registerUser(formData);
      navigate("/login", { state: { message: "Account created! Please sign in." } });
    } catch (err) {
      setStatus({
        loading: false,
        error: err?.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-[#181818] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header section with branding */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 mb-4">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-gray-400 mt-2">Join the MyTube community today</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {status.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {status.error}
            </div>
          )}

          {/* Identity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="John Doe"
                required
                className="w-full bg-[#2a2a2a] border border-transparent focus:border-red-600 focus:ring-0 rounded-lg px-4 py-2.5 transition"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="johndoe123"
                required
                className="w-full bg-[#2a2a2a] border border-transparent focus:border-red-600 focus:ring-0 rounded-lg px-4 py-2.5 transition"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              required
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-red-600 focus:ring-0 rounded-lg px-4 py-2.5 transition"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#2a2a2a] border border-transparent focus:border-red-600 focus:ring-0 rounded-lg px-4 py-2.5 transition"
              onChange={handleChange}
            />
          </div>

          {/* Media Upload Section */}
          <div className="pt-2 flex gap-6 items-start">
            <div className="flex flex-col items-center gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase">Avatar</label>
              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-20 h-20 rounded-full bg-[#2a2a2a] border-2 border-dashed border-gray-600 group-hover:border-red-500 overflow-hidden flex items-center justify-center transition">
                  {previews.avatar ? (
                    <img src={previews.avatar} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    <UserCircleIcon className="w-10 h-10 text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase">Cover Image</label>
              <div className="relative group h-20 w-full cursor-pointer">
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-full rounded-lg bg-[#2a2a2a] border-2 border-dashed border-gray-600 group-hover:border-red-500 overflow-hidden flex items-center justify-center transition">
                  {previews.coverImage ? (
                    <img src={previews.coverImage} className="w-full h-full object-cover" alt="Cover" />
                  ) : (
                    <PhotoIcon className="w-8 h-8 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
          >
            {status.loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="bg-[#121212] py-4 text-center border-t border-white/5">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button onClick={loginhandle} className="text-red-500 font-semibold hover:text-red-400 transition">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;