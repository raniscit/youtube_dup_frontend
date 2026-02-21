import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import Onboarding from "../pages/Onboarding";
import Watch from "../pages/Watch";
import SearchResults from "../pages/SearchResults";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import PlaylistDetail from "../pages/PlaylistDetail";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Onboarding />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/channel/:userId/:username" element={<Profile/>}/>
            <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
        </Routes>
    );
};

export default AppRoutes;
