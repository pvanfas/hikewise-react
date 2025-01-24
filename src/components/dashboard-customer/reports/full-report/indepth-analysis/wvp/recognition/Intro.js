import React from "react";
import style from "../../Common.module.scss";

export default function IntroRecog() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference offer advancement, potential for
          leadership, and are often considered prestigious. Corresponding needs are Advancement,{" "}
          <em>Authority, Recognition and Social Status</em>.
        </p>
        <ul>
          <li>Advancement — Workers on this job have opportunities for advancement.</li>
          <li>Recognition — Workers on this job receive recognition for the work they do.</li>
          <li>Authority — Workers on this job give directions and instructions to others.</li>
          <li>
            Social Status — Workers on this job are looked up to by others in their company and
            their community.
          </li>
        </ul>
      </div>
    </div>
  );
}
