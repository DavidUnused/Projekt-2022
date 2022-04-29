import React from "react";
import Header from "../Layouts/Header";

function Notfound() {
  return (
    <div className="vh-100">
      <Header />
      <div className="card w-50 position-absolute top-50 start-50 translate-middle w-35">
        <div className="card-body container text-center">
          <div className="h1">404</div>
          <div className="h2">Ez az oldal nem található!</div>
          <p>
            <br />
          </p>
          <img className="row mx-auto col-4" src="/images/404error.svg" />
          <a
            href="/"
            className="btn btn-outline-success row mx-auto"
            type="button"
            style={{ marginTop: "20px" }}
          >
            Vissza a főoldalra
          </a>
        </div>
      </div>
    </div>
  );
}

export default Notfound;
