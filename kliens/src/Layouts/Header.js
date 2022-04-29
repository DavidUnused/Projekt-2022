import React from "react";

import Admin from "./Header_Components/Admin";
import Pizzak from "./Header_Components/Pizzak";
import Hamburgerek from "./Header_Components/Hamburgerek";
import Italok from "./Header_Components/Italok";
import MindenTermek from "./Header_Components/MindenTermek";
import Nav_Button from "./Header_Components/Nav_Button";
import Asztalfoglalas_H from "./Header_Components/Asztalfoglalas_H";
import NemRickRoll from "./Header_Components/NemRickRoll";
import Fooldal from "./Header_Components/Fooldal";
import Demo from "./Header_Components/Demo";
import AdminKilepes from "./Header_Components/AdminKilepes";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NemRickRoll />
        <Nav_Button />
        <div
          className="collapse navbar-collapse order-1 order-md-0 dual-collapse2"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav me-auto">
            <Fooldal />
            <Asztalfoglalas_H />
            <MindenTermek />
            <Pizzak />
            <Hamburgerek />
            <Italok />
          </ul>
          <ul className="navbar-nav me-auto d-lg-none d-xl-block d-xl-none">
            <Demo />
            <Admin />
            <AdminKilepes />
          </ul>
          <div className="navbar-collapse collapse order-3 dual-collapse2 d-none d-lg-block">
            <ul className="navbar-nav ms-auto">
              <Demo />
              <Admin />
              <AdminKilepes />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
