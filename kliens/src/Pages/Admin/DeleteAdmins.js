import React, { useEffect, useState, useContext } from "react";
import RoleContext from "../../Context/RoleContext";
import Axios from "axios";
import Header from "../../Layouts/Header";
import Login from "../Login";

function DeleteAdmins() {
  const [adat, setAdat] = useState({
    adminok: [
      {
        id: "1",
        felhasznalonev: "Betöltés...",
        email: "Betöltés...",
      },
    ],
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/adminok")
      .then((adatok) => setAdat(adatok.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteAdat = async (id) => {
    const res = await Axios.post("http://localhost:3001/admintorles", {
      id: id,
    });
  };

  const { role } = useContext(RoleContext);
  const Admin = "Admin";

  if (role === Admin)
    return (
      <div>
        <Header />
        <div className="min-vh-100">
          <div className="card w-75 mx-auto" style={{ marginTop: "50px" }}>
            <div className="card-header">
              <div className="h4 container mx-auto">Adminok törlése</div>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="container row align-items-center">
                    <div className="col">
                      <div className="h6">Felhasználónév:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Email:</div>
                    </div>
                    <div className="col">
                      <div className="h7"> </div>
                    </div>
                  </div>
                </li>
                {adat.adminok.map((admin, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      <div className="container row align-items-center">
                        <div className="col">
                          <div className="h7">{admin.felhasznalonev}</div>
                        </div>
                        <div className="col">
                          <div className="h7">{admin.email}</div>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteAdat(admin.id);
                              window.location.reload(true);
                            }}
                          >
                            Törlés
                          </button>
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

export default DeleteAdmins;
