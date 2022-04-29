import React from "react";
import { useCart } from "react-use-cart";


function Cart(props) {

  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  props.func(totalItems);

  if (isEmpty)
    return (
      <div
        className="
  w-100"
      >
        <div
          className="modal"
          id="kosar"
          data-bs-backdrop="false"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title h5" id="exampleModalLabel">
                  Kosarad
                </div>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <section className="py-4 container">
                  <div className="row justify-content-center">
                    <div className="text-center h4">
                      <h4>
                        <strong>
                          Üres a kosarad! Tegyél bele gyorsan valamit! :D
                        </strong>
                      </h4>
                    </div>
                  </div>
                </section>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-bs-dismiss="modal">
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div
      className="
    w-75"
    >
      <div
        className="modal"
        id="kosar"
        data-bs-backdrop="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h5" id="exampleModalLabel">
                Kosarad
              </div>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section className="py-4 container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div className="h5">
                      Termékek a kosaradban: ({totalItems})
                    </div>
                    <table className="table table-light table-hover m0 container">
                      <tbody>
                        {items.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="container">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <img
                                      src={item.image}
                                      className="shop-items img-thumbnail"
                                      style={{ height: "5rem", width: "5rem" }}
                                    />
                                  </div>
                                  <div className="col">{item.name}</div>
                                  <div className="col">{item.price} FT</div>
                                  <div className="col">
                                    <span className="badge bg-primary rounded-pill">
                                      <div
                                        className="h5"
                                        style={{ paddingTop: "4.7px" }}
                                      >
                                        Darab: {item.quantity}
                                      </div>
                                    </span>
                                  </div>
                                  <div className="w-100"></div>
                                  <div className="col">
                                    <button
                                      className="btn btn-primary ms-2"
                                      onClick={() =>
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      }
                                    >
                                      -
                                    </button>
                                  </div>
                                  <div className="col">
                                    <button
                                      className="btn btn-primary ms-2"
                                      onClick={() =>
                                        updateItemQuantity(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <button
                                      className="btn btn-danger ms-2"
                                      onClick={() => removeItem(item.id)}
                                    >
                                      Termék eltávolítása a kosárból
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center h4 list-group-item list-group-item-dark">
                    <h4>
                      <strong>Végösszeg: {cartTotal} FT</strong>
                    </h4>
                  </div>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={() => emptyCart()}>
                Kosár kiürítése
              </button>
              <button type="button" className="btn btn-success">
                Rendelés
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Bezárás
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
