import React, { useState, useEffect } from "react";
import style from "./Register.module.scss";

import { useNavigate } from "react-router-dom";
import Select from "react-select";
import clsx from "clsx";
import { Eye } from "react-feather";
import { Formik } from "formik";
import * as yup from "yup";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import Button from "components/shared/Button";
import TextField from "components/shared/formik/TextField";
import WithPadding from "components/shared/WithPadding";
import { postRequest } from "utils/api";
import { splitArrChunks } from "utils/helper";

import RegisterImg from "assets/images/auth/register.svg";
import Logo from "assets/images/logo.svg";
import RedesignIcon from "assets/images/auth/redesign.png";
import RedesignPlusIcon from "assets/images/auth/redesign_plus.png";
import RiseIcon from "assets/images/auth/rise.png";
import SailIcon from "assets/images/auth/sail.png";
import InlineLoader from "components/shared/InlineLoader";

const _ArrSelectors = [
  { name: "Rise", icon: RiseIcon, title: "Class 8-9" },
  { name: "Sail", icon: SailIcon, title: "Class 10-12" },
  { name: "Redesign", icon: RedesignIcon, title: "College Graduates" },
  { name: "Redesign+", icon: RedesignPlusIcon, title: "Working Professional" },
];

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

const themePurple = "#9456c8";
const radioSize = "18px";
const CustomRadio = withStyles({
  root: {
    color: themePurple,
    "&$checked": {
      color: themePurple,
    },
    "& svg": {
      width: radioSize,
      height: radioSize,
    },
    "&$disabled": {
      color: "#DCDCDC",
    },
  },
  checked: {},
  disabled: {},
})((props) => <Radio {...props} />);

function getDepartment(dept) {
  switch (dept) {
    case "Rise":
      return "RISE";
    case "Sail":
      return "SAIL";
    case "Redesign":
      return "REDESIGN";
    case "Redesign+":
      return "REDESIGN_PLUS";
    default:
      return "";
  }
}

export default function Register() {
  const [selected, setSelected] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isErrorDept, setIsErrorDept] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false);
  const [isErrorLang, setIsErrorLang] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [postErrors, setPostErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    pref_lang: "",
  });

  const navigate = useNavigate();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  function toggleShowConfirmPass() {
    setShowConfirmPass((prev) => !prev);
  }

  function handleNavigateLogin() {
    navigate("/auth/login");
  }

  function handleChangeRadioSelect(e) {
    setIsErrorDept(false);
    setSelected(e.target.value);
  }

  function handleChange(e) {
    setPostErrors([]);
    setIsErrorLang(false);

    const { name } = e.target;
    let { value } = e.target;

    if (name === "username") {
      setIsErrorUsername(false);
      value = value.replace(/\s/g, "");
      value = value.replace(/_/g, "").substring(3);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm() {
    if (!selected.length) return setIsErrorDept(true);
    if (!formData.username.match(/^[0-9]/) || formData.username.length !== 10) return setIsErrorUsername(true);
    // console.log({ lang: formData.pref_lang });
    if (!formData.pref_lang || formData.pref_lang.length <= 0) return setIsErrorLang(true);

    const postData = {
      username: formData.username,
      password: formData.password,
      password2: formData.confirmPassword,
      department: getDepartment(selected),
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      pref_language: formData.pref_lang,
    };

    setIsLoading(true);
    postRequest(`/accounts/register`, postData, { noAuth: true })
      .then((resp) => {
        postRequest("/token", {
          username: postData.username,
          password: postData.password,
        })
          .then((resp) => {
            localStorage.setItem("accessToken", resp.data.access);
            localStorage.setItem("refreshToken", resp.data.refresh);

            window.location.href = "/assessment/demo";
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setPostErrors(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const validationSchema = yup.object().shape({
    email: yup.string().email("Must be a valid email").max(255).required("Email is required"),
    first_name: yup.string().required("Name is requried"),
    username: yup.string().required("Phone number is required"),
    password: yup.string().min(8).required("Password required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const selectorStyle = {
    container: (styles, {}) => ({
      ...styles,
      width: "100% !important",
      border: "1px solid red",
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
      minHeight: "0px",
      height: "50px",
      borderRadius: "15px",
      cursor: "pointer",
      boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.1) !important",
      paddingLeft: "10px",
      width: "100% !important",
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
  };

  // useEffect(() => {
  //   console.log({ formData });
  // }, [formData]);

  return (
    <WithPadding className={style.wrapper}>
      <div className={style.mainCard}>
        <div className={style.left}>
          <img src={RegisterImg} alt="" />
        </div>
        <div className={style.right}>
          <div className={style.logo}>
            <div className={style.image}>
              <img src={Logo} alt="" />
            </div>
            <div className={style.title}>Welcome to Hikewise</div>
          </div>

          <div>
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={"Lorem"}
              onChange={handleChangeRadioSelect}
              className={style.selectors}
            >
              {splitArrChunks(_ArrSelectors, 2).map((selPair) => (
                <div className={style.selectorPair}>
                  {selPair.map((sel, index) => (
                    <div key={index} className={style.selector}>
                      <div className={style.image}>
                        <img src={sel.icon} alt="" />
                      </div>
                      <div className={style.body}>
                        <div className={style.name}>{sel.title}</div>
                        <div className={style.checkbox}>
                          <CustomRadio value={sel.name} checked={selected === sel.name} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </RadioGroup>
            {isErrorDept && <div className={clsx(style.error, style.deptError)}>Choose your Category</div>}
          </div>

          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={submitForm}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className={style.row}>
                  <TextField
                    className={clsx(style.textField, style.firstName)}
                    type="text"
                    name="first_name"
                    label="Name"
                    placeholder="Name"
                  />
                </div>

                <div className={style.row}>
                  <TextField
                    className={style.textField}
                    name="username"
                    label="Phone Number"
                    placeholder="Phone Number"
                    type="tel"
                    mask="+\9\1 9999 999999"
                  />
                </div>
                {isErrorUsername && (
                  <div className={clsx(style.error, style.usernameError)}>Enter Valid Phone Number</div>
                )}

                {postErrors.username && (
                  <div className={style.errors}>
                    {postErrors.username.map((err) => (
                      <div className={style.error}>{err.toLowerCase()}</div>
                    ))}
                  </div>
                )}

                <div className={style.row}>
                  <TextField className={style.textField} type="email" name="email" label="Email" placeholder="Email" />
                </div>

                <div className={style.selectField}>
                  <Select
                    options={_ArrLangs}
                    styles={selectorStyle}
                    placeholder="Select Preferred Language"
                    onChange={(e) => {
                      let event = { target: { name: "pref_lang", value: e.value } };
                      handleChange(event);
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: () => null,
                    }}
                  />
                  <div className={style.errors}>
                    <div className={style.error} style={{ marginTop: "1.3em" }}>
                      {isErrorLang && "please select a language"}
                    </div>
                  </div>
                </div>

                <div className={style.row}>
                  <Eye onClick={toggleShowPassword} />
                  <TextField
                    className={style.textField}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    label="Password"
                    placeholder="Password"
                  />
                </div>

                {postErrors.password && (
                  <div className={style.errors}>
                    {postErrors.password.map((err) => (
                      <div className={style.error}>{err.toLowerCase()}</div>
                    ))}
                  </div>
                )}

                <div className={style.row}>
                  <Eye onClick={toggleShowConfirmPass} />
                  <TextField
                    className={style.textField}
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                  />
                </div>

                {/* <div className={style.checkboxContainer}>
                  <Checkbox label="Remember me" fontColor="#969696" />
                </div> */}

                <div className={style.btnContainer}>
                  <div>
                    already registered ? <span onClick={handleNavigateLogin}>Login</span>
                  </div>

                  <Button submit options={{ width: "100px", height: "40px", radius: "5px" }}>
                    {isLoading ? <InlineLoader size={20} color="white" /> : "Get Started"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </WithPadding>
  );
}
