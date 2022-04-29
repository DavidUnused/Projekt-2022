import React, { useEffect, useState, useContext } from "react";
import RoleContext from "../../Context/RoleContext";
import Axios from "axios";
import Header from "../../Layouts/Header";
import Login from "../Login";

function AsztalfoglalasAdmin() {
  const [adat, setAdat] = useState({
    foglalasok: [
      {
        id: "1",
        nev: "Betöltés...",
        telszam: "Betöltés...",
        asztal: "Betöltés...",
        foglalas: "Betöltés...",
      },
    ],
  });
  
  useEffect(() => {
    Axios.get("http://localhost:3001/foglalasok")
      .then((adatok) => setAdat(adatok.data))
      .catch((err) => console.log(err));
  }, []);

  const { role } = useContext(RoleContext);
  const Admin = "Admin";

  if (role === Admin)
    return (
      <div>
        <Header />
        <div className="min-vh-100">
          <div className="card w-75 mx-auto" style={{ marginTop: "50px" }}>
            <div className="card-header">
              <div className="h4 container mx-auto">Asztalfoglalások:</div>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="container row align-items-center">
                    <div className="col">
                      <div className="h6">Név:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Telefonszám:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Asztal:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Foglalás:</div>
                    </div>
                  </div>
                </li>
                {adat.foglalasok.map((foglalas, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      <div className="container row align-items-center">
                        <div className="col">
                          <div className="h7">{foglalas.nev}</div>
                        </div>
                        <div className="col">
                          <div className="h7">+36{foglalas.telszam}</div>
                        </div>
                        <div className="col">
                          <div className="h7">{foglalas.asztal}</div>
                        </div>
                        <div className="col">
                          <div className="h7">{foglalas.foglalas}</div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  else return <Login />;
}

export default AsztalfoglalasAdmin;
