import React, { useState } from "react";
import style from "./Hero.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import WithPadding from "components/shared/WithPadding";
import Button from "components/shared/Button";
import TextField from "components/shared/formik/TextField";

import HeroImg from "assets/images/landing/hero.svg";
import HeroLeft from "assets/images/landing/hero_left.svg";
import { postRequest } from "utils/api";

export default function Hero() {
  const navigate = useNavigate();

  const [mobNumberError, setMobNumberError] = useState(false);
  const [formData, setFormData] = useState({});

  function handleSubmitPhone() {
    setMobNumberError(false);
    const { mobileNumber } = formData;

    if (!mobileNumber || mobileNumber.length !== 10) {
      setMobNumberError(true);
    } else {
      postRequest(`/web/phones`, { phone: mobileNumber }, { noAuth: true })
        .then((resp) => {
          navigate("/auth/register");
        })
        .catch((err) => {
          setMobNumberError(true);
        });
    }
  }

  function handleChangeForm(e) {
    setMobNumberError(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <WithPadding className={style.withPadding}>
      <div className={style.graphic}>
        <img src={HeroLeft} alt="" />
      </div>
      <div className={style.wrapper}>
        <div className={style.left}>
          <div className={style.header}>
            <div>Build your career with</div>
            <div>Hikewise</div>
          </div>

          <div className={clsx(style.header, style.mobile)}>
            Build your career with <span>Hikewise</span>
          </div>

          <div className={style.subheader}>
            <div>Take hikewise's advanced online career counseling and</div>
            <div>guidance mechanism to build a successful and fulfilling future!</div>
          </div>

          <div className={clsx(style.subheader, style.mobile)}>
            <div>
              Take hikewise's advanced online career counseling and guidance mechanism to build a successful and
              fulfilling future!
            </div>
          </div>

          <div className={style.cta}>
            <Formik initialValues={{ phone: "" }} onSubmit={handleSubmitPhone}>
              {({ handleSubmit }) => (
                <form onChange={handleChangeForm} onSubmit={handleSubmit}>
                  <TextField
                    className={style.textField}
                    type="number"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                  />
                  {mobNumberError && <p className={style.error}>Enter correct number*</p>}
                  <Button submit options={{ width: "125px", height: "40px" }}>
                    Take a Free Demo
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className={style.right}>
          <img src={HeroImg} alt="" />
        </div>
      </div>
    </WithPadding>
  );
}
