import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4073/auth/isloged", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.authenticated) {
          setIsLoggedIn(true);
          setIsAdmin(data.user.isAdmin);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        loading,
        setIsLoggedIn,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
