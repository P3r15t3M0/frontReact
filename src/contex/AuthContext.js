import { createContext, useEffect, useState } from "react";
import { getMyUserData } from "../services";

export const AuthContext = createContext(null);

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserData({ token });
        setUser(data);
      } catch (error) {
        logout();
      }
    };

    if (token) getUserData();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
