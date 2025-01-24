import React from "react";
import style from "./Congrats.module.scss";

import CongratsImg from "assets/images/assessment/congrats.svg";

export default function Congrats() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Congrats</div>
      <div className={style.graphic}>
        <img src={CongratsImg} alt="" />
      </div>
      <div className={style.text}>
        <div>You have successfully</div>
        <div>completed the test</div>
      </div>
    </div>
  );
}
