import React from "react";
import style from "./Program1.module.scss";

import { useNavigate } from "react-router-dom";

import WithPadding from "components/shared/WithPadding";
import Button from "components/shared/Button";
import SectionTitle from "./SectionTitle";

import greetings from "../../assets/images/landing/greetings.svg";

export default function Program1() {
  const navigate = useNavigate();

  return (
    <WithPadding className={style.wrapper}>
      <div className={style.left}>
        <img src={greetings} alt="hello" />
      </div>
      <div className={style.right}>
        <div className={style.inner}>
          <div className={style.text}>India’s Most Scientific & Comprehensive Career Development Mechanism</div>

          <div className={style.subtext}>
            Now accessible to you beyond language barriers - Available in 13 Indian languages. We cater to all
            categories of individuals and institutions - from students to working professionals, and schools to NGOs.
          </div>

          <div className={style.btnContainer}>
            <Button onClick={navigate.bind(this, "/auth/register")} options={{ width: "120px", height: "35px" }}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </WithPadding>
  );
}
