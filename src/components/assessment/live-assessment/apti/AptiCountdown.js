import React from "react";
import style from "./AptiCountdown.module.scss";

import { useEngine } from "../engine/EngineProvider";

export default function Timer() {
  const { state } = useEngine();
  const { timeRemSubcat } = state.testData;

  let ms = timeRemSubcat * 1000;

  var hours = Math.floor(ms / 3600000);
  var minutes = Math.floor((ms - hours * 3600000) / 60000);
  var seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000);

  function appendZero(time) {
    if (time < 10) return `0${time}`;
    else return time.toString();
  }
  return (
    <div className={style.wrapper}>
      <div className={style.time}>
        <p>{appendZero(minutes)}</p>
      </div>
      <p className={style.seperator}>:</p>
      <div className={style.time}>
        <p>{appendZero(seconds)}</p>
      </div>
    </div>
  );
}
