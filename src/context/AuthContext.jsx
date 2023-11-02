import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import { useMutation } from "react-query";

const initAuth = {
  authTokens: null,
  setAuthTokens: () => {},
  logoutUser: () => {},
};

export const AuthContext = createContext(initAuth);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authTokens, setAuthTokens] = useState(() =>
    Cookies.get("authTokens") ? JSON.parse(Cookies.get("authTokens")) : null
  );
  const updateTokenMutation = useMutation(
    () =>
      axios.post(`${API_URL}/auth/jwt/refresh`, {
        refresh: authTokens?.refresh,
      }),
    {
      onSuccess: (auth) => {
        loading && setLoading(false);
        setAuthTokens(auth.data);
        Cookies.set("authTokens", JSON.stringify(auth.data));
      },
      onError: () => logoutUser(),
    }
  );
  const logoutUser = () => {
    setAuthTokens(null);
    Cookies.remove("authTokens");
  };

  useEffect(() => {
    if (loading && authTokens) updateTokenMutation.mutate();
    let twentyEight = 1000 * 60 * 28;

    const interval = setInterval(() => {
      if (authTokens) {
        updateTokenMutation.mutate();
      }
    }, twentyEight);

    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
