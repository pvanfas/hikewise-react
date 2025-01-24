import React from "react";
import style from "../../Common.module.scss";

export default function IntroSupport() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference offer supportive management that
          stands behind employees. Corresponding needs are{" "}
          <strong>Company Policies, Supervision: Human Relations</strong> and{" "}
          <strong>Supervision: Technical.</strong>
        </p>
        <ul>
          <li>
            Company Policies and Practices — Workers on this job are treated fairly by the company.
          </li>
          <li>
            Supervision, Human Relations — Workers on this job have supervisors who back up their
            workers with management.
          </li>
          <li>
            Supervision, Technical — Workers on this job have supervisors who train their workers
            well.
          </li>
        </ul>
      </div>
    </div>
  );
}
