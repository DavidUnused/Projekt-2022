import { createContext, useState, useEffect } from "react";
import Axios from "axios";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  //Rang lekérése a Backendtől
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setRole(response.data.user[0].rang);
      } else {
        setRole(response.data.loggedIn);
      }
    });
  }, []);

  //Státusz érték átadása
  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;
