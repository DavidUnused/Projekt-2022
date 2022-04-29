import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cart from "../../Components/Shop/Cart";
import { CartProvider } from "react-use-cart";

import Itemcard from "../../Components/Shop/Itemcard";

import Header from "../../Layouts/Header";

function Shop_Edrink() {
  const [adat, setAdat] = useState({
    termekek: [
      {
        id: "1",
        name: "Betöltés...",
        desc: "Betöltés...",
        price: "",
        image: "/termekek/loading/loading.gif",
      },
      {
        id: "2",
        name: "Betöltés...",
        desc: "Betöltés...",
        price: "",
        image: "/termekek/loading/loading.gif",
      },
      {
        id: "3",
        name: "Betöltés...",
        desc: "Betöltés...",
        price: "",
        image: "/termekek/loading/loading.gif",
      },
    ],
  });

  const [kosartartalma, setKosartartalma] = useState("");

  const pull_data = (data) => {
    if (data === 0) {
      setTimeout(() => (setKosartartalma(""), 0));
    } else {
      setTimeout(() => (setKosartartalma(data), 0));
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/kategoriatermekek/edrink")
      .then((adatok) => setAdat(adatok.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <CartProvider>
      <Header />
      <div className="text-center mt-3 h1">Energiaitalok</div>
      <section className="py-4 container overflow-auto min-vh-100">
        <div className="row justify-content-center">
          {adat.termekek.map((termek, index) => {
            return (
              <Itemcard
                image={termek.image}
                name={termek.name}
                desc={termek.desc}
                price={termek.price}
                termek={termek}
                key={index}
              />
            );
          })}
        </div>
      </section>
      <Cart func={pull_data} />
      <div className="kosar kosar-pill-shadow">
        <span className="badge rounded-circle bg-info kosar-badge">
          {kosartartalma}
        </span>
        <button
          className=" btn btn-primary btn-lg rounded-circle kosar-shadow"
          data-bs-toggle="modal"
          data-bs-target="#kosar"
        >
          <i className="fa-solid fa fa-shopping-cart"></i>
        </button>
      </div>
    </CartProvider>
  );
}

export default Shop_Edrink;
