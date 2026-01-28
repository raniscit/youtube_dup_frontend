import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Settings = () => {
    const { user } = useAuth();
    const [username, setUsername] = useState(user.username);

    const handleUpdate = async () => {
        await fetch("/api/v1/users/update-profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
            credentials: "include"
        });
        alert("Profile updated");
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>

            <label className="block mb-4">
                <span className="text-gray-400">Username</span>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mt-1 p-2 bg-gray-800 rounded"
                />
            </label>

            <button
                onClick={handleUpdate}
                className="bg-blue-600 px-4 py-2 rounded"
            >
                Save Changes
            </button>
        </div>
    );
};

export default Settings;
