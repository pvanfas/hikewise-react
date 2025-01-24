import React from "react";
import style from "./PreFooter.module.scss";

export default function PreFooter() {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Ready to start your journey towards a perfect career?
      </div>

      <div className={style.text}>
        Get started with India's best career development platform
      </div>

      <div className={style.btnContainer}>
        <button>Sign Up</button>
      </div>
    </div>
  );
}
