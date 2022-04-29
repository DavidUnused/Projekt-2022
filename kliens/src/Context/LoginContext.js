import { createContext, useState, useEffect } from "react";
import Axios from "axios";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStat, setLoginStat] = useState("");
  //Bejelentkezési státusz lekérése a Backendtől
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStat(response.data.user[0].felhasznalonev);
      }
    });
  }, []);

  //Státusz érték átadása
  return (
    <LoginContext.Provider
      value={{
        loginStat,
        setLoginStat,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
