import React, { useState, useEffect, useCallback } from "react";
import path from "./domain";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {},
  onLogin: (userCode, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState({});

  const checkToken = useCallback(async () => {
    try {
      const response = await fetch(`${path}auth/is-verify`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      if (parseRes.auth === true){
        setIsloggedIn(true);
        setUser(parseRes.user)
      }
      else {
        localStorage.removeItem("token");
        setIsloggedIn(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const logOutHandler = useCallback(() => {
    localStorage.removeItem("token");
    setIsloggedIn(false);
  }, []);

  const logInHandler = useCallback(async (userCode, password) => {
    try {
      const body = { userCode, password };

      const response = await fetch(`${path}auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 200) {
        const parseResponse = await response.json();
        localStorage.setItem("token", parseResponse.token);
        await setUser(parseResponse.user);
        setIsloggedIn(true);
        return {
          message: "Sesión iniciada con éxito",
          type: "success",
          show: true,
        };
      } else if (response.status === 401) {
        return {
          message: "Credenciales incorrectas",
          type: "warning",
        };
      }
      return {
        message: "Error interno del servidor",
        type: "error",
      };
    } catch (err) {
      console.error(err.message);
    }

  }, []);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        onLogout: logOutHandler,
        onLogin: logInHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
