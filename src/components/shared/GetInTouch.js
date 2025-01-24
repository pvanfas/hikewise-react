import React, { useState } from "react";
import style from "./GetInTouch.module.scss";

import * as yup from "yup";

import { postRequest } from "utils/api";
import clsx from "clsx";
import WithPadding from "./WithPadding";

export default function GetInTouch({ onClose }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    isActive: false,
    isError: false,
    message: "",
  });

  function handleChangeForm(e) {
    const { name, value } = e.target;

    removeError(name);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function removeError(name) {
    let toUpdateErrors = { ...errors };
    delete toUpdateErrors[name];
    setErrors(toUpdateErrors);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const validationSchema = yup.object().shape({
      email: yup.string().email("*Must be a valid email").max(255).required("Email is required"),
      name: yup.string().required("*First name is requried"),
      school_name: yup.string().required("*School name is required"),
      mobile_number: yup.string().required("*Mobile Number is required"),
    });

    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      setIsLoading(true);
      setApiResponse({ isActive: false, isError: false, message: "" });
      setErrors({});
      postRequest(`/web/contact`, formData, { noAuth: true })
        .then((resp) => {
          setApiResponse({
            isActive: true,
            isError: false,
            message: "Thank you for contacting us.",
          });
        })
        .catch((err) => {
          console.log(err);
          setApiResponse({
            isActive: true,
            isError: true,
            message: "An error occured. Please try again",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      let errs = {};

      err.inner.forEach((er) => {
        errs[er.path] = er;
      });

      console.log(err);
      setErrors(errs);
    }
  }

  return (
    <WithPadding className={style.wrapper}>
      {onClose !== undefined && onClose !== null && (
        <div onClick={onClose} className={style.closeBtn}>
          &times;
        </div>
      )}

      <header>
        <div className={style.title}>Get In Touch</div>
        <div className={style.subtitle}>Enquire about Program Details</div>
        <form onChange={handleChangeForm} onSubmit={handleSubmitForm}>
          {/* <div className={style.row}>
            <div className={style.field}>
              <input name="name" type="text" placeholder="Name" />
              <p>{errors.name && errors.name.message}</p>
            </div>

            <div className={style.field}>
              <input name="email" type="text" placeholder="Email" />
              <p>{errors.email && errors.email.message}</p>
            </div>
          </div>

          <div className={style.row}>
            <div className={style.field}>
              <input name="school_name" type="text" placeholder="School Name & City" />
              <p>{errors.school_name && errors.school_name.message}</p>
            </div>

            <div className={style.field}>
              <input name="mobile_number" type="text" placeholder="Mobile Number" />
              <p>{errors.mobile_number && errors.mobile_number.message}</p>
            </div>
          </div> */}

          <div className={style.button}>
            <button
              onClick={() => {
                window.open("https://jivo.chat/e8yuMmV12o");
              }}
            >
              {" "}
              Chat With An Expert{" "}
            </button>
          </div>

          <div className={clsx(style.apiResp, apiResponse.isError ? style.apiError : style.apiSuccess)}>
            {apiResponse.isActive && apiResponse.message}
          </div>
        </form>
      </header>
    </WithPadding>
  );
}
