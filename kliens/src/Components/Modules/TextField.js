import React from "react";
import { ErrorMessage, useField } from "formik";

//Regisztrálásnál használt szöveges mező
export const TextFieldRegister = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="control form-floating has-icons-left">
        <input
          className={`form-control input ${
            meta.touched && meta.error && "is-invalid"
          } ${meta.touched && "is-valid"}`}
          placeholder={label}
          id={`${field.name}`}
          {...field}
          {...props}
        />
        <label className="textfield" htmlFor={`${field.name}`}>
          {label}
        </label>
        <p className="text-danger">
          <ErrorMessage name={field.name} />
        </p>
        <span className="icon is-small is-left">
          <i>
            <img src={`images/${field.name}.svg`} alt="" />
          </i>
        </span>
      </div>
    </div>
  );
};

//Bejelentkezésnél használt szöveges mező
export const TextFieldLogin = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="control form-floating has-icons-left">
        <input
          className={`form-control input ${
            meta.touched && meta.error && "is-invalid"
          }`}
          placeholder={label}
          id={`${field.name}`}
          {...field}
          {...props}
        />
        <label className="textfield" htmlFor={`${field.name}`}>
          {label}
        </label>
        <p className="text-danger">
          <ErrorMessage name={field.name} />
        </p>
        <span className="icon is-small is-left">
          <i>
            <img src={`images/${field.name}.svg`} alt="" />
          </i>
        </span>
      </div>
    </div>
  );
};

//Asztalfoglalásnál használt szöveges mező
export const TextFieldAsztal = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="control form-floating has-icons-left">
        <input
          className={`form-control input ${
            meta.touched && meta.error && "is-invalid"
          }`}
          placeholder={label}
          id={`${field.name}`}
          {...field}
          {...props}
        />
        <label className="textfield" htmlFor={`${field.name}`}>
          {label}
        </label>
        <span className="icon is-small is-left">
          <i>
            <img src={`images/${field.name}.svg`} alt="" />
          </i>
        </span>
      </div>
    </div>
  );
};
