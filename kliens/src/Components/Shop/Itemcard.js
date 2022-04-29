import React from "react";
import { useCart } from "react-use-cart";

function Itemcard(props) {
  const { addItem } = useCart();

  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <img src={ props.image } className="card-img-top img-fluid shop-items img-thumbnail" style={{ marginTop:"10px" }} alt={ props.name } />
        <div className="card-body text-center">
          <div className="card-title h4">{props.name}</div>
          <p className="card-text">{ props.desc }</p>
          <div className="card-title h5">{ props.price } FT</div>
          <button className="btn btn-success" onClick={() => addItem(props.termek) }>Kosárba</button>
        </div>
      </div>
    </div>
  );
}

export default Itemcard;
