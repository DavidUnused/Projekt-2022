import React, { useState } from "react";
import Axios from "axios";
import Header from "../Layouts/Header";

function Reset() {
  const [uzenet, setUzenet] = useState("");
  const titokkulcs = 1
  const reset = () => {
    Axios.post("http://localhost:3001/reset", { titokkulcs: titokkulcs }).then(
      (response) => {
        setUzenet(response.data);
      }
    );
  };
  return (
    <div className="vh-100">
      <Header />
      <div className="card position-absolute top-50 start-50 translate-middle w-50 p-3 shadow-lg">
        <div className="card-header">
          <p className="mx-auto h2">Demó inicializálása</p>
        </div>
        <div className="card-body">
          <div className="text-danger" style={{ paddingBottom: "10px" }}>
            FIGYELEM! Ez a folyamat minden adatot törölni fog az adatbázisból!
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger bg-gradient col-6 mx-auto"
          onClick={reset}
        >
          Demó
        </button>
        <div className="h5 text-danger" style={{ paddingTop: "10px" }}>
          {uzenet}
        </div>
      </div>
    </div>
  );
}

export default Reset;
