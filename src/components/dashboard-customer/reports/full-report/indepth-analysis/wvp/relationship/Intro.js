import React from "react";
import style from "../../Common.module.scss";

export default function IntroRelation() {
  return (
    <div className={style.wrapper}>
      <div className={style.intro}>
        <p>
          Jobs/Careers that satisfy this work value preference allow employees to provide service to
          others and work with co-workers in a friendly non-competitive environment. Corresponding
          needs are{" "}
          <strong>
            <em>Co-workers, Moral Values and Social Service.</em>
          </strong>
        </p>
        <ul>
          <li>Co-workers — Workers on this job have co-workers who are easy to get along with.</li>
          <li>
            Social Service — Workers on this job have work where they do things for other people.
          </li>
          <li>
            Moral Values — Workers on this job are never pressured to do things that go against
            their sense of right and wrong.
          </li>
        </ul>
      </div>
    </div>
  );
}
