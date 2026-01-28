import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";

const categories = ["Music", "Movies", "Study", "Sports", "Gaming", "News"];

const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth(); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleCategoryClick = (category) => {
        navigate(`/search?category=${encodeURIComponent(category)}`);
    };

    return (
        <header className="w-full bg-black border-b border-gray-800">
            {/* Top Row */}
            <div className="flex items-center justify-between px-6 py-3">

                {/* Logo */}
                <h1
                    onClick={() => navigate("/")}
                    className="text-xl font-semibold text-white cursor-pointer"
                >
                    MyTube
                </h1>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-6">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="w-full px-4 py-2 bg-gray-900 text-white rounded-l-md outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 bg-gray-800 rounded-r-md hover:bg-gray-700"
                    >
                        🔍
                    </button>
                </form>

                {/* Right */}
                <div className="relative">
                    {isLoggedIn ? (
                        <ProfileMenu user={user} />
                    ) : (
                        <button
                            onClick={() => navigate("/register")}
                            className="px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-200 transition"
                        >
                            Register
                        </button>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className="flex gap-6 px-6 py-2 text-sm text-gray-300 overflow-x-auto">
                {categories.map((cat) => (
                    <span
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="cursor-pointer whitespace-nowrap hover:text-white"
                    >
                        {cat}
                    </span>
                ))}
            </div>
        </header>
    );
};

export default Header;
