import React, { useState } from "react";
import style from "./Login.module.scss";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye } from "react-feather";
import { Formik } from "formik";
import * as yup from "yup";

import TextField from "components/shared/formik/TextField";
import Button from "components/shared/Button";
import Checkbox from "components/shared/Checkbox";
import InlineLoader from "components/shared/InlineLoader";
import Modal from "components/shared/Modal";

import { getRequest, postRequest } from "utils/api";

import LoginImg from "assets/images/auth/login.svg";
import Logo from "assets/images/logo.svg";
import WithPadding from "components/shared/WithPadding";

import { useUserContext } from "contexts/AllContexts";
import clsx from "clsx";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [isRemember, setIsRemember] = useState(false);
  const [isIncorrectCreds, setIsIncorrectCreds] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false);

  const userContext = useUserContext();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  function handleClickRegister() {
    navigate("/auth/register");
  }

  function changeFormData(e) {
    let { name, value } = e.target;

    if (name === "rememberMe") setIsRemember(e.target.checked);
    else {
      if (name === "username") {
        setIsErrorUsername(false);
        value = value.replace(/\s/g, "");
        value = value.replace(/_/g, "").substring(3);
      }

      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  const validationSchema = yup.object().shape({
    password: yup.string().required("* Password is required"),
  });

  function handleClickEye() {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  }

  function submitForm() {
    if (!formData.username.match(/^[0-9]/) || formData.username.length !== 10) {
      return setIsErrorUsername(true);
    }

    setIsIncorrectCreds(false);
    setIsLoading(true);

    postRequest("/accounts/login", formData, { noAuth: true })
      .then((resp) => {
        if (isRemember) {
          localStorage.setItem("accessToken", resp.data.access);
          localStorage.setItem("refreshToken", resp.data.refresh);
        } else {
          sessionStorage.setItem("accessToken", resp.data.access);
          sessionStorage.setItem("refreshToken", resp.data.refresh);
        }

        getRequest(`/accounts/profile`)
          .then((resp) => {
            userContext.getProfile();

            if (searchParams.get("to")) {
              return (window.location.href = `/${searchParams.get("to")}`);
            } else {
              return (window.location.href = "/dashboard");
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);

        if (err.response.status === 401) {
          setIsIncorrectCreds(true);
          setIsLoading(false);
        }
      })
      .finally(() => {});
  }

  const [isOpenForgetPassModal, setIsOpenForgetPassModal] = useState(false);
  function toggleForgetPassModal() {
    setIsOpenForgetPassModal((prev) => !prev);
  }

  const [emailForgotPass, setEmailForgotPass] = useState("");
  const [errorEmailForgotPass, setErrorEmailForgotPass] = useState("");
  const [apiResponseForgotPass, setApiResponseForgotPass] = useState({ isActive: false, isError: false, message: "" });

  function handleChangeFormForgotPass(e) {
    const { value } = e.target;
    setEmailForgotPass(value);
  }

  function handleSubmitFormForgotPass(e) {
    e.preventDefault();
    const validationSchema = yup.object().shape({
      email: yup.string().email("*Must be a valid email").max(255).required("*Email is required"),
    });

    try {
      validationSchema.validateSync({ email: emailForgotPass }, { abortEarly: false });
      setIsLoading(true);
      setErrorEmailForgotPass({});
      setApiResponseForgotPass({ isActive: false, isError: false, message: "" });
      setErrorEmailForgotPass({});

      postRequest(`/accounts/forgot_password`, { email: emailForgotPass }, { noAuth: true })
        .then((resp) => {
          if (resp.data.status) {
            setApiResponseForgotPass({
              isActive: true,
              isError: false,
              message: "A new password has been sent to you email.",
            });
          } else {
            setApiResponseForgotPass({
              isActive: true,
              isError: true,
              message: "No account found with given email id.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setApiResponseForgotPass({ isActive: true, isError: true, message: "An error occured. Please try again" });
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
      setErrorEmailForgotPass(errs);
    }
  }

  return (
    <WithPadding className={style.wrapper}>
      <Modal contentClassName={style.modalWrapper} isOpen={isOpenForgetPassModal}>
        <div className={style.title}>
          <div>Forgot Password</div>
          <div onClick={toggleForgetPassModal}> &times;</div>
        </div>
        <form onChange={handleChangeFormForgotPass} onSubmit={handleSubmitFormForgotPass}>
          <label>Your registered Email Id</label>
          <input type="email" name="email" placeholder="Email" required />
          <p>{errorEmailForgotPass.email && errorEmailForgotPass.email.message}</p>
          <Button onClick={handleSubmitFormForgotPass} options={{ width: "100%" }}>
            {isLoading ? <InlineLoader size={20} color="white" /> : "Submit"}
          </Button>
          <div className={clsx(style.apiResponse, apiResponseForgotPass.isError ? style.error : style.success)}>
            {apiResponseForgotPass.isActive && apiResponseForgotPass.message}
          </div>
        </form>
      </Modal>
      <div className={style.inner}>
        <div className={style.left}>
          <img src={LoginImg} alt="" />
        </div>
        <div className={style.right}>
          <div className={style.headerContainer}>
            <div className={style.logoContainer}>
              <img src={Logo} alt="" />
            </div>
            <div className={style.text}>Welcome to Hikewise</div>
            <div className={style.subtext}>Welcome back, access your account here</div>
          </div>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={submitForm}
          >
            {({ handleSubmit }) => (
              <form onChange={changeFormData} onSubmit={handleSubmit}>
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
                  <div className={clsx(style.error, style.usernameError)}>*Enter Valid Phone Number</div>
                )}

                <div className={style.row}>
                  <Eye onClick={handleClickEye} />
                  <TextField
                    className={style.textField}
                    type={passwordType}
                    name="password"
                    label="User Id"
                    placeholder="Password"
                  />
                </div>

                {isIncorrectCreds && <div className={style.incorrectCreds}>Incorrect Credentials</div>}

                <div className={style.checkboxContainer}>
                  <Checkbox name="rememberMe" label="Remember me" fontColor="#969696" />
                  <div onClick={toggleForgetPassModal}>forgot password ?</div>
                </div>

                <div className={style.btnContainer}>
                  <div>
                    don't have an account ? <span onClick={handleClickRegister}>Register</span>
                  </div>
                  <Button submit disabled={isLoading} options={{ width: "100px", height: "35px" }}>
                    {isLoading ? <InlineLoader size={20} color="white" /> : "Login"}
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
