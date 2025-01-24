import React, { useEffect, useState } from "react";
import style from "./TimerBar.module.scss";

import clsx from "clsx";

import { capitalizeWord } from "utils/helper";

export default function TimerBar({ className, state }) {
  const [title, setTitle] = useState();

  const { totTimeElapsed } = state.runData;
  let ms = totTimeElapsed;

  var hours = Math.floor(ms / 3600000);
  var minutes = Math.floor((ms - hours * 3600000) / 60000);
  var seconds = Math.floor((ms - hours * 3600000 - minutes * 60000) / 1000);

  function appendZero(time) {
    if (time < 10) return `0${time}`;
    else return time.toString();
  }

  function findActiveTab() {
    for (let key in state.screenState.tabs) {
      if (state.screenState.tabs[key].isActive) {
        setTitle(capitalizeWord(key));
      }
    }
  }

  useEffect(() => {
    findActiveTab();
  }, [state.screenState.tabs]);

  return (
    <div className={clsx(style.wrapper, className)}>
      <div className={style.title}>{title}</div>
      <div className={style.timer}>
        <div className={style.time}>
          <p>{appendZero(minutes)}</p>
        </div>
        <p className={style.seperator}>:</p>
        <div className={style.time}>
          <p>{appendZero(seconds)}</p>
        </div>
      </div>
    </div>
  );
}
