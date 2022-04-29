import React, { useState } from "react";
import axios from "axios";
import Header from "../../Layouts/Header";

const UploadItem = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);

  const onSub = async (e) => {
    let formData = new FormData();
    formData.append("imgfile", image[0]);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    e.preventDefault();

    let res = await axios
      .post("http://localhost:3001/termekfeltoltes", formData)
      .then((response) => {
        setData(response.data);
        if (data.status = 200) {
          setTimeout(window.location.reload(true), 3000);
          setTimeout(setData(""), 0);
        }
      });
  };

  return (
    <div className="min-vh-100">
      <Header />
      <div
        className="card col-8 col-md-6 col-lg-4 mx-auto shadow-lg"
        style={{ marginTop: "40px" }}
      >
        <div className="card-header">
          <h1 className="container mx-auto h2">Termék feltöltése</h1>
        </div>
        <div className="card-body">
          <div className="container mx-auto" id="formdata">
            <form onSubmit={onSub}>
              <div className="form-group d-grid gap-2 container">
                <label className="h6" htmlFor="" style={{ marginTop: "20px" }}>
                  Termék neve:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Neve:"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group d-grid gap-2 container">
                <label className="h6" htmlFor="" style={{ marginTop: "20px" }}>
                  Termék leírása:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Leírása:"
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-group d-grid gap-2 container">
                <label className="h6" htmlFor="" style={{ marginTop: "20px" }}>
                  Termék ára:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ára:"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group d-grid gap-2 container">
                <label className="h6" htmlFor="" style={{ marginTop: "20px" }}>
                  Kategória:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Kategória:"
                  list="datalistOptions"
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                <datalist id="datalistOptions">
                  <option value="Sima Pizza" />
                  <option value="Töltött Peremű Pizza" />
                  <option value="Laktózmentes Pizza" />
                  <option value="Hamburger" />
                  <option value="Üdítő" />
                  <option value="Energiaital" />
                  <option value="Sör" />
                  <option value="Alkoholmentes Sör" />
                </datalist>
              </div>
              <div className="form-group d-grid gap-2 container">
                <label className="h6" htmlFor="" style={{ marginTop: "20px" }}>
                  Kép feltöltése:
                </label>
                <input
                  type="file"
                  name="imgfile"
                  className="form-control-sm bg-dark bg-gradient text-white"
                  onChange={(e) => setImage(e.target.files)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success bg-success bg-gradient d-grid gap-2 w-100 mx-auto"
                style={{ marginTop: "20px" }}
              >
                Feltöltés
              </button>
              {data.msg}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
