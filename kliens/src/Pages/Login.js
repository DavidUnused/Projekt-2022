import React, { useContext } from "react";
import RoleContext from "../Context/RoleContext";
import { LoginComponent } from "../Components/LoginComponent";
import Header from "../Layouts/Header";

function Login() {
  const { role } = useContext(RoleContext);
  const Admin = "Admin";

  if (role === Admin) {
    window.location.href = "/";
  } else
    return (
      <div className="min-vh-100">
        <Header />
        <div className="card position-absolute top-50 start-50 translate-middle w-50 p-3 shadow-lg">
          <LoginComponent />
        </div>
      </div>
    );
}

export default Login;
