import React from "react";
import style from "../../Common.module.scss";

export default function IntroAchievement() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference are results oriented and allow
          employees to use their strongest abilities, giving them a feeling of accomplishment.
          Corresponding needs are Ability Utilization and Achievement.
        </p>
        <ul>
          <li>Ability Utilization — Workers on this job make use of their individual abilities.</li>
          <li>Achievement — Workers on this job get a feeling of accomplishment.</li>
        </ul>
      </div>
    </div>
  );
}
