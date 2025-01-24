import React, { useState, useEffect } from "react";
import style from "./NewCandidate.module.scss";

import Select from "react-select";
import { Formik } from "formik";
import * as yup from "yup";

import InlineLoader from "components/shared/InlineLoader";
import TextField from "components/shared/formik/TextField";
import Button from "components/shared/Button";

import { putRequest } from "utils/api";

const _ArrLangs = [
  { label: "English", value: "EN" },
  { label: "Hindi", value: "HI" },
  { label: "Malayalam", value: "ML" },
  { label: "Tamil", value: "TA" },
  { label: "Kannada", value: "KN" },
  { label: "Telugu", value: "TE" },
  { label: "Marathi", value: "MR" },
  { label: "Bengali", value: "BN" },
  { label: "Gujarati", value: "GU" },
  { label: "Punjabi", value: "PA" },
  { label: "Odia", value: "OD" },
  { label: "Assamese", value: "AS" },
  { label: "Urdu", value: "UR" },
];

export default function NewCandidate() {
  const [isLoading, setIsLoading] = useState();
  const [formData, setFormData] = useState({ pref_language: "" });

  const [isEmptyLanguage, setIsEmptyLanguage] = useState(false);
  const [incorrectOldPass, setIncorrectOldPass] = useState(false);

  function changeFormData(e) {
    const { name, value } = e.target;

    if (name === "pref_language") setIsEmptyLanguage(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm() {
    if (!formData.pref_language.length) return setIsEmptyLanguage(true);

    setIsLoading(true);
    putRequest(`/accounts/update`, formData)
      .then((resp) => {
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if (err.response.data.old_password) {
            setIncorrectOldPass(true);
          }
        } else console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = yup.object().shape({
    old_password: yup.string().required("* Required"),
    new_password: yup.string().required("* Required"),
    first_name: yup.string().required("* Required"),
    last_name: yup.string().required("* Required"),
  });

  const [colorStyles, setColorStyles] = useState({});

  function handleResize() {
    if (window.innerWidth < 600) {
      setColorStyles({
        container: (styles, { isFocused }) => ({
          ...styles,
          borderColor: "transparent !important",
        }),
        placeholder: (styles) => {
          return {
            ...styles,
            color: "#a6a6a6",
          };
        },
        control: (styles, { isFocused }) => ({
          ...styles,
          borderColor: "#e6e6e6 !important",
          fontSize: "14px",
          backgroundColor: "white",
          width: "100%",
          minHeight: "0px",
          height: "50px",
          borderRadius: "15px",
          cursor: "pointer",
          boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.1) !important",
          paddingLeft: "10px",
        }),
        option: (styles, { isSelected }) => ({
          ...styles,
          backgroundColor: isSelected ? "#9558C8" : "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#bfa0d9",
          },
        }),
        input: (styles) => ({ ...styles, color: "transparent" }),
      });
    } else {
      setColorStyles({
        container: (styles, { isFocused }) => ({
          ...styles,
          borderColor: "transparent !important",
        }),
        placeholder: (styles) => {
          return {
            ...styles,
            color: "#a6a6a6",
          };
        },
        control: (styles, { isFocused }) => ({
          ...styles,
          borderColor: "#f0f0f0 !important",
          fontSize: "14px",
          backgroundColor: "white",
          width: "calc(50% - 30px)",
          minHeight: "0px",
          height: "50px",
          borderRadius: "15px",
          cursor: "pointer",
          boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.1) !important",
          paddingLeft: "10px",
        }),
        option: (styles, { isSelected }) => ({
          ...styles,
          backgroundColor: isSelected ? "#9558C8" : "white",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#bfa0d9",
          },
        }),
        input: (styles) => ({ ...styles, color: "transparent" }),
      });
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            old_password: "",
            new_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ handleSubmit }) => (
            <form onChange={changeFormData} onSubmit={handleSubmit}>
              <div className={style.header}>
                <div>Hi,</div>
                <div>Please update your profile to proceed</div>
              </div>

              <div className={style.row}>
                <div className={style.textField}>
                  {/* <label>First Name</label> */}
                  <TextField className={style.textField} type="text" name="first_name" placeholder="First Name" />
                </div>

                <div className={style.textField}>
                  <TextField className={style.textField} type="text" name="last_name" placeholder="Last Name" />
                </div>
              </div>

              <div className={style.row}>
                <div className={style.textField}>
                  <TextField
                    className={style.textField}
                    type="password"
                    name="old_password"
                    placeholder="Old Password"
                  />
                </div>

                <div className={style.textField}>
                  <TextField
                    className={style.textField}
                    type="password"
                    name="new_password"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <div className={style.selectField}>
                <Select
                  options={_ArrLangs}
                  styles={colorStyles}
                  placeholder="Select Preferred Language"
                  onChange={(e) => {
                    let event = { target: { name: "pref_language", value: e.value } };
                    changeFormData(event);
                  }}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                />
                {isEmptyLanguage && <div className={style.error}>{"* Required"}</div>}
              </div>

              {incorrectOldPass && <div className={style.error}>Old password entered is incorrect</div>}

              <div className={style.btnContainer}>
                <Button submit disabled={isLoading} options={{ width: "100px", height: "35px" }}>
                  {isLoading ? <InlineLoader size={20} color="white" /> : "Submit"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
