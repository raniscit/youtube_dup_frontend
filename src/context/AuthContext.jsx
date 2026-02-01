import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../api/auth.api";
import api from "../api/axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 VERIFY AUTH ON APP LOAD
  const checkAuth = async () => {
    try {
      const res = await api.get("/users/curr-user"); // protected route
      setIsLoggedIn(true);
      setUser(res.data.data);
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Login (after successful API login)
  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoggedIn(true);
    setUser(userData);
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await logoutUser(); // backend logout
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
