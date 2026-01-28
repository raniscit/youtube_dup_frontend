import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../api/auth.api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ✅ Login (NO API CALL HERE)
  const login = (token, userData) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoggedIn(true);
    setUser(userData);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);
    logoutUser();

  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
