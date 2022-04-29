import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Header from "../Layouts/Header";
import { TextFieldAsztal } from "../Components/Modules/TextField";
import Axios from "axios";

function Asztalfoglalas() {
  const opt1 = "/Images/Assets/Asztalfoglalas/Print_1.jpg";
  const opt2 = "/Images/Assets/Asztalfoglalas/Print_2.jpg";
  const opt3 = "/Images/Assets/Asztalfoglalas/Print_3.jpg";
  const opt4 = "/Images/Assets/Asztalfoglalas/Print_4.jpg";
  const opt5 = "/Images/Assets/Asztalfoglalas/Print_5.jpg";
  const opt6 = "/Images/Assets/Asztalfoglalas/Print_6.jpg";

  const [asztal, setAsztal] = useState(opt1);
  const [valami, setValami] = useState(1);

  const selectChange = (event) => {
    const value = event.target.value;
    setAsztal(value);
    const ertek = value.split("/");
    const cropErtek = ertek[4];
    const ertek2 = cropErtek.split("_");
    const cropErtek2 = ertek2[1];
    const ertek3 = cropErtek2.split(".");
    const cropErtek3 = ertek3[0];
    const foertek = parseInt(cropErtek3);
    setValami(foertek);
  };

  const validate = Yup.object({
    nev: Yup.string()
      .required("Adj meg egy nevet!")
      .matches(
        /^[aA0-zZ9éÉáÁűŰőŐúÚöÖüÜóÓíÍ._\s]+$/,
        "A neved ismeretlen karaktereket tartalmaz!"
      ),
    telszam: Yup.string()
      .required("Adj meg egy telefonszámot!")
      .matches(/^[0-9]+$/, "A telefonszám csak számokat tartalmazhat")
      .min(
        9,
        "Hibás formátum, a telefonszámnak 9 karaktert kell tartalmaznia! A (06) és a (+36) ne szerepeljen benne!"
      )
      .max(
        9,
        "Hibás formátum, a telefonszámnak 9 karaktert kell tartalmaznia! A (06) és a (+36) ne szerepeljen benne!"
      ),
  });

  return (
    <div className="min-vh-100">
      <Header />
      <div className="card">
        <div className="card-header">
          <p className="mx-auto h2">Asztalfoglalás</p>
        </div>
        <div className="card-body w-75 mx-auto">
          <div className="container ">
            <div className="row">
              <div className="col-lg">
                <img className="w-100" src={asztal}></img>
              </div>
              <div className="col-lg">
                <Formik
                  initialValues={{
                    //A séma alapértékei
                    nev: "",
                    telszam: "",
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    //Ha minden megfelel a sémának, akkor elküljük az asztalfoglalást a Backend felé
                    Axios.post("http://localhost:3001/asztalfoglalas", {
                      nev: values.nev,
                      telszam: values.telszam,
                      asztal: valami,
                    }).then((response) => {
                      console.log(response);
                    });
                  }}
                >
                  {(formik) => (
                    <div className="container w-100 h-100 mx-auto d-flex align-items-center">
                      <Form>
                        <div className="container">
                          <div className="row">
                            <div style={{marginBottom: "20px"}} className="col-sm">
                              <TextFieldAsztal
                                label="Név"
                                name="nev"
                                type="text"
                              />
                            </div>
                            <div className="col-sm">
                              <TextFieldAsztal
                                label="Telefonszám"
                                name="telszam"
                                type="text"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group col-11 mx-auto" style={{paddingTop: "10px"}}>
                          <label className="h5" htmlFor="asztalok">Asztal száma:</label>
                          <select
                            onChange={selectChange}
                            className="form-control"
                            id="asztalok"
                          >
                            <option value={opt1}>1. Asztal (5 fő)</option>
                            <option value={opt2}>2. Asztal (5 fő)</option>
                            <option value={opt3}>3. Asztal (5 fő)</option>
                            <option value={opt4}>4. Asztal (4 fő)</option>
                            <option value={opt5}>5. Asztal (4 fő)</option>
                            <option value={opt6}>6. Asztal (5 fő)</option>
                          </select>
                        </div>
                        <button className="btn btn-primary bg-gradient" type="submit" style={{marginTop: "20px"}}>
                          Asztalfoglalás Leadása
                        </button>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Asztalfoglalas;
