import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { TextFieldLogin } from "./Modules/TextField";
import * as Yup from "yup";
import YupPassword from "yup-password";
import Axios from "axios";
import LoginContext from "../Context/LoginContext";

YupPassword(Yup);

export const LoginComponent = () => {
  const { loginStat, setLoginStat } = useContext(LoginContext);
  //Ellenörzési séma a bejelenetkezéshez
  const validate = Yup.object({
    username: Yup.string()
      .required("Add meg a Felhasználónevedet!")
      .matches(
        /^[aA0-zZ9._\s]+$/,
        "A felhasználóneved érvénytelen karaktereket tartalmaz!"
      ),
    password: Yup.string()
      .required("Add meg a jelszavadat!")
      .matches(
        /^[aA0-zZ9@$!%*#?&\s]+$/,
        "A jelszavad érvénytelen karaktereket tartalmaz!"
      ),
  });
  return (
    <Formik
      initialValues={{
        //A séma alapértékei
        username: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        //Ha minden megfelel a sémának, akkor elküljük a bejelentkezési kérelmet a Backend felé
        Axios.post("http://localhost:3001/login", {
          felhasznalonev: values.username,
          jelszo: values.password,
        }).then((response) => {
          if (response.data.message) {
            setLoginStat(
              <p className="errortext">{response.data.message}</p>
            );
          } else {
            setLoginStat(response.data[0].felhasznalonev);
          }
          window.location.href = '/';
        });
      }}
    >
      {(formik) => (
        //Bejelentkezési mezők
        <div>
          <div className="card-header h1">Admin Bejelentkezés</div>
          <Form>
            <div className="card-body">
              <div style={{ paddingBottom: "20px" }}>
                <TextFieldLogin
                  label="Felhasználónév"
                  name="username"
                  type="text"
                />
              </div><div style={{ paddingBottom: "20px" }}>
                <TextFieldLogin
                  label="Jelszó"
                  name="password"
                  type="password"
                />
              </div>
            </div>
            <div className="card-footer container d-flex justify-content-center">
              <div className="row row-cols-1">
                <button className="col btn btn-outline-success" type="submit">
                  Bejelentkezés
                </button>
                <div className="col h4">{loginStat}</div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
