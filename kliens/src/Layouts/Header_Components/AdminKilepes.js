import React, { useContext } from "react";

import RoleContext from "../../Context/RoleContext";
import LoginContext from "../../Context/LoginContext";

import Axios from "axios";

function AdminKilepes() {
  const { role } = useContext(RoleContext);
  const { loginStat } = useContext(LoginContext);
  const Admin = "Admin";

  const logout = true
  const kilepes = () => {
      Axios.post("http://localhost:3001/logout", { logout: logout });
      window.location.href = "/";
  };
    
  if (role === Admin)
    return (
      <li className="nav-item">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button className="btn btn-outline-light navbar-magassag d-flex" disabled={true}>
          <i className="fa fa-solid fa-user" style={{marginTop: "4px", marginRight: "4px"}}></i>{ loginStat }
                </button>
           <button className="btn btn-light navbar-magassag d-flex" onClick={kilepes}>
          Kilépés
          </button>
        </div>
      </li>
    );
  else return <li className="nav-item"></li>;
}

export default AdminKilepes;
