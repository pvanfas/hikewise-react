import React from "react";
import style from "./TestFooter.module.scss";

import { useEngine } from "./engine/EngineProvider";

export default function TestFooter({ currContent }) {
  const { state, navigateNext } = useEngine();

  const { currTabIndex } = state.screenState;
  const currTab = state.screenState.tabs[currTabIndex];
  const currTotQuesCount = state.runData?.totQuesCount[currTab?.key];

  return (
    <div className={style.wrapper}>
      <div className={style.footer}>
        {currContent.type === "QUESTION" && (
          <span>
            Question : {currContent.quesNumber} / {currTotQuesCount}
          </span>
        )}

        {currContent.type === "gif" && <button onClick={navigateNext}>Next</button>}
      </div>
    </div>
  );
}
