import React, { useContext } from "react";

import RoleContext from "../../Context/RoleContext";

function Admin() {
  const { role } = useContext(RoleContext);
  const Admin = "Admin";

  if (role === Admin)
    return (
      <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Admin
      </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a className="dropdown-item" href="/foglalasok">
            Asztalfoglalások
          </a>
        </li>
        <li>
        <a className="dropdown-item" href="/itemupload">
            Termékek feltöltése
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/itemremove">
            Termékek törlése
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/register">
            Admin felvétele
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="/admindelete">
            Admin törlése
          </a>
        </li>
      </ul>
    </li>

    );
  else
    return (
      <li className="nav-item">
      <a className="btn btn-outline-light navbar-magassag d-flex" href="/login">
        Admin Belépés
      </a>
    </li>
    );
}

export default Admin
