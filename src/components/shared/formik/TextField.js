import React from "react";
import styleError from "./Error.module.scss";

import ReactInputMask from "react-input-mask";

import { useField, ErrorMessage } from "formik";
import clsx from "clsx";

export default function TextField({ label, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={clsx(className, meta.touched && meta.error && styleError.error)}>
      {props.type === "tel" ? <ReactInputMask {...field} {...props} /> : <input {...field} {...props} />}

      <ErrorMessage name={field.name} render={(msg) => <div className={styleError.wrapper}>{msg}</div>} />
    </div>
  );
}
