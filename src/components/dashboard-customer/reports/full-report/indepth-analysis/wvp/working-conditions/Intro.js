import React from "react";
import style from "../../Common.module.scss";

export default function IntroWorkCond() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference offer job security and good working
          conditions. Corresponding needs are Activity, Compensation, Independence, Security,
          Variety and Working Conditions.
        </p>
        <ul>
          <li>Activity — Workers on this job are busy all the time.</li>
          <li>Independence — Workers on this job do their work alone.</li>
          <li>Variety — Workers on this job have something different to do every day.</li>
          <li>
            Compensation — Workers on this job are paid well in comparison with other workers.
          </li>
          <li>Security — Workers on this job have steady employment.</li>
          <li>Working Conditions — Workers on this job have good working conditions.</li>
        </ul>
      </div>
    </div>
  );
}
