import React from "react";
import style from "./ContinueInstructions.module.scss";

import { useEngine } from "../engine/EngineProvider";

export default function ContinueInstructions({ handleClickNext }) {
  const { continueTest } = useEngine();
  return (
    <div className={style.wrapper}>
      Your evaluation is interrupted in the middle, but your prior response will be saved, and you can pick up where you
      left off.
      <div className={style.footer}>
        <button onClick={continueTest}>Continue Assessment</button>
      </div>
    </div>
  );
}
