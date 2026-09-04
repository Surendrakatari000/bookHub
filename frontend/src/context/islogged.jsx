import { createContext, useCallback, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/isloged`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.authenticated) {
        const admin = Boolean(data.user?.isAdmin);
        setIsLoggedIn(true);
        setIsAdmin(admin);
        return { isLoggedIn: true, isAdmin: admin };
      }

      setIsLoggedIn(false);
      setIsAdmin(false);
      return { isLoggedIn: false, isAdmin: false };
    } catch (err) {
      setIsLoggedIn(false);
      setIsAdmin(false);
      return { isLoggedIn: false, isAdmin: false };
    }
  }, []);

  const clearAuth = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refreshAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        loading,
        setIsLoggedIn,
        setIsAdmin,
        refreshAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
