import React from "react";
import style from "../../Common.module.scss";

export default function IntroRecog() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference allow employees to work on their own
          and make decisions. Corresponding needs are{" "}
          <em>Creativity, Responsibility and Autonomy.</em>
        </p>
        <ul>
          <li>Creativity — Workers on this job try out their own ideas.</li>
          <li>Responsibility — Workers on this job make decisions on their own.</li>
          <li>Autonomy — Workers on this job plan their work with little supervision</li>
        </ul>
      </div>
    </div>
  );
}
