import React from "react";
import { Formik, Form } from "formik";
import { TextFieldRegister } from "./Modules/TextField";
import * as Yup from "yup";
import YupPassword from "yup-password";
import Axios from "axios";

YupPassword(Yup);

export const RegisterComponent = () => {
  //Ellenörzési séma a regisztrációhoz
  const validate = Yup.object({
    username: Yup.string()
      .required("Adj meg egy felhasználónevet!")
      .min(3, "A felhasználó nevednek legalább 3 karakterből kell állnia!")
      .max(30, "A felhasználó neved legfeljebb 30 karakterből állhat!")
      .matches(
        /^[aA0-zZ9._\s]+$/,
        "A felhasználóneved csak ékezet nélküli-, kis- és nagybetűket, illetve számokat tartalmazhat!"
      ),
    email: Yup.string()
      .email("Létező email címet adj meg!")
      .required("Adj meg egy email címet!")
      .matches(
        /^[aA0-zZ9@.\s]+$/,
        "Az email nem tartalmazhat ékezetes-, illetve speciális karaktereket!"
      ),
    password: Yup.string()
      .required("Adj meg egy jelszót!")
      .password()
      .min(4, "A jelszónak legalább 4 karakterből kell állnia!")
      .max(30, "A jelszavad legfeljebb 30 karakterből állhat!")
      .minLowercase(1, "A jelszónak legalább egy kisbetűt kell tartalmaznia!")
      .minUppercase(1, "A jelszónak legalább egy nagybetűt kell tartalmaznia!")
      .minNumbers(1, "A jelszónak legalább egy számot kell tartalmaznia!")
      .minSymbols(0)
      .matches(
        /^[aA0-zZ9@$!%*#?&\s]+$/,
        "A jelszó nem tartalmazhat ékezetes betűt, illetve szimbólumokon kívűl más speciális karaktereket!"
      ),
    confirmPassword: Yup.string()
      .required("Ismételd meg a fenti jelszót!")
      .oneOf([Yup.ref("password"), null], "A jelszavak nem egyeznek meg!"),
  });
  return (
    <Formik
      initialValues={{
        //A séma alapértékei
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        //Ha minden megfelel a sémának, akkor elküljük a registrációt a Backend felé
        Axios.post("http://localhost:3001/register", {
          felhasznalonev: values.username,
          jelszo: values.password,
          email: values.email,
        }).then((response) => {
          console.log(response);
        });
      }}
    >
      {(formik) => (
        //Registrációs mezők
        <div>
          <div className="card-header h1">Admin Regisztráció</div>
          <Form>
            <div className="card-body">
              <div style={{ paddingBottom: "20px" }}>
                <TextFieldRegister
                  label="Felhasználónév"
                  name="username"
                  type="text"
                />
              </div>
              <div style={{ paddingBottom: "20px" }}>
                <TextFieldRegister label="Email" name="email" type="email" />
              </div><div style={{ paddingBottom: "20px" }}>
                <TextFieldRegister
                  label="Jelszó"
                  name="password"
                  type="password"
                />
              </div><div style={{ paddingBottom: "20px" }}>
                <TextFieldRegister
                  label="Jelszó megerősítése"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div className="card-footer container d-flex justify-content-center">
                <div className="row row-cols-1">
                  <button className="col btn btn-outline-success" type="submit">
                    Regisztrálás
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};
