import React from "react";
import style from "./Why.module.scss";

export default function Why() {
  function onClick(link) {
    window.open(link);
  }
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Why Choose Hikewise Career Assessment & Counselling Platform?
      </div>

      <div className={style.text}>
        The success of counseling is to be assessed by what an individual is
        able to accomplish in the real outside world and not with what happens
        inside the counselling session
      </div>

      <div className={style.buttons}>
        <button onClick={onClick.bind(this, "/assessment")}>
          Research Phase &#8544; (Assessment)
        </button>
        <button onClick={onClick.bind(this, "/post-assessment")}>
          Research Phase &#8544;&#8544; (Counselling)
        </button>
      </div>
    </div>
  );
}
