import React, { useEffect, useState, useContext } from "react";
import RoleContext from "../../Context/RoleContext";
import Axios from "axios";
import Header from "../../Layouts/Header";
import Login from "../Login";

function DeleteItems() {
  const [adat, setAdat] = useState({
    termekek: [
      {
        id: "1",
        name: "Betöltés...",
        desc: "Betöltés...",
        price: "",
        category: "Betöltés...",
        image: "/termekek/loading/loading.gif",
      },
    ],
  });
  useEffect(() => {
    Axios.get("http://localhost:3001/mindentermekadmin")
      .then((adatok) => setAdat(adatok.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteAdat = async (id) => {
    const res = await Axios.post("http://localhost:3001/torles", { id: id });
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
              <div className="h4 container mx-auto">Termékek törlése</div>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <div className="container row align-items-center">
                    <div className="col"> </div>
                    <div className="col">
                      <div className="h6">Termék:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Kategória:</div>
                    </div>
                    <div className="col">
                      <div className="h6">Ára:</div>
                    </div>
                    <div className="col"> </div>
                  </div>
                </li>
                {adat.termekek.map((termek, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      <div className="container row align-items-center">
                        <div className="col">
                          <img
                            className="shop-items img-thumbnail"
                            src={termek.image}
                            style={{
                              height: "3rem",
                              width: "3rem",
                              minWidth: "3rem",
                            }}
                            alt={termek.name}
                          />
                        </div>
                        <div className="col">
                          <div className="h7">{termek.name}</div>
                        </div>
                        <div className="col">
                          <div className="h7">{termek.category}</div>
                        </div>
                        <div className="col">
                          <div className="h7">{termek.price} FT</div>
                        </div>
                        <div className="col">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteAdat(termek.id);
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

export default DeleteItems;
