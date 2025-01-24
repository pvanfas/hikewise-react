import React from "react";
import style from "./Program4.module.scss";

import WithPadding from "components/shared/WithPadding";
import SectionTitle from "./SectionTitle";
import Button from "components/shared/Button";

// import OvalImg from "assets/images/landing/purple-oval.svg";
// import CardIcon from "assets/images/landing/prog_4_card_icon.svg";

import Schools from "assets/images/landing/schools.png";
import Organizations from "assets/images/landing/organizations.png";
import Colleges from "assets/images/landing/colleges.png";

export default function Program4() {
  return (
    <WithPadding className={style.wrapper}>
      <div className={style.left}>
        <div className={style.absoluteGraphic}></div>

        <div className={style.col1}>
          <div className={style.image}>
            <img src={Schools} alt="" />
            <div className={style.title}>Schools</div>
          </div>

          <div className={style.image}>
            <img src={Colleges} alt="" />
            <div className={style.title}>Colleges</div>
          </div>
        </div>
        <div className={style.col2}>
          <div className={style.image}>
            <img src={Organizations} alt="" />
            <div className={style.title}>Organization</div>
          </div>
        </div>
      </div>

      <div className={style.right}>
        <SectionTitle>
          <span>For</span> <span>Institutions</span>
        </SectionTitle>

        <div className={style.text}>Career Development & Planning Mechanism for Institutions</div>

        <div className={style.subtext}>
          Career Assessment and Counselling at an institutional level has the potential to make a profound societal
          impact owing to the data-driven insights it can provide. Institutional level hikewise solutions are designed
          to cater to any organization associated with the field of education like schools, colleges, social
          enterprises, NGOs and government bodies.
        </div>

        <div className={style.btnContainer}>
          <Button onClick={() => window.open("/institutions")} options={{ width: "120px", height: "35px" }}>
            Learn More
          </Button>
        </div>
      </div>
    </WithPadding>
  );
}
