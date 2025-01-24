import React from "react";
import style from "./Why.module.scss";

export default function Why() {
  function onClick(link) {
    window.open(link);
  }
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Start your journey towards discovering your perfect career now!
      </div>

      <div className={style.text}>
        Get started with India’s most advanced career development mechanism
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
