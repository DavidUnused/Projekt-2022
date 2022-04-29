import React, { useContext } from "react";
import RoleContext from "../Context/RoleContext";
import { RegisterComponent } from "../Components/RegisterComponent";
import Header from "../Layouts/Header";
import { LoginComponent } from "../Components/LoginComponent";

function Register() {
  const { role } = useContext(RoleContext);
  const Admin = "Admin";

  if (role === Admin)
    return (
      <div className="vh-100">
        <Header />
        <div className="card position-absolute top-50 start-50 translate-middle w-50 p-3 shadow-lg">
          <RegisterComponent />
        </div>
      </div>
    );
  else
    return (
      <div className="vh-100">
        <Header />
        <div className="card position-absolute top-50 start-50 translate-middle w-50 p-3 shadow-lg">
          <LoginComponent />
        </div>
      </div>
    );
}

export default Register;
