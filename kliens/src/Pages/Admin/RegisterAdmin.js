import React, { useContext } from 'react'
import { RegisterComponent } from '../../Components/RegisterComponent'
import RoleContext from '../../Context/RoleContext';
import Login from "../Login";

function RegisterAdmin() {
  const { role } = useContext(RoleContext);
  const Admin = "Admin";


  if (role === Admin)
    return (
    <div><RegisterComponent/></div>
    )
    else return <Login />;
}

export default RegisterAdmin