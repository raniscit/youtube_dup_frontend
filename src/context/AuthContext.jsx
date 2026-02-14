
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { logoutUser } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Store token separately to expose it
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("accessToken"));
  const [loading, setLoading] = useState(true);

  // 🔐 Verify user on app load
  const checkAuth = async () => {
    try {
      // Pass token in headers only if available
      const storedToken = localStorage.getItem("accessToken");

      if (!storedToken) {
        setIsLoggedIn(false);
        setToken(null);
        setLoading(false);
        return;
      }

      const res = await api.get("/users/curr-user", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setToken(storedToken);
      setIsLoggedIn(true);

      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []); // Run once on mount

  // ✅ Login: store token and user data
  const login = (newToken, userData) => {
    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // ✅ Logout: clear token and user data
  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // Add token to the context value WITHOUT removing existing keys
  const value = {
    user,
    token,          // <-- newly added token
    isLoggedIn,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
