import React from "react";
import style from "./DemoTest.module.scss";

import TestTabs from "./TestTabs";
import QuesAns from "./QuesAns";
import TestFooter from "./TestFooter";

import { useEngine } from "./engine/EngineProvider";
import TestInstructions from "./TestInstructions";
import Gif from "./Gif";

export default function LiveTest() {
  const { state } = useEngine();

  const currContent = state.runData.content[state.runData.currIndex];

  function renderContent(content) {
    switch (content.type) {
      case "TEST_INTRO":
        return <TestInstructions />;
      case "QUESTION":
        return <QuesAns question={content.question} id={content.id} />;
      case "GIF":
        return <Gif question={content} id={content.id} />;
      default:
        return null;
    }
  }

  return (
    <div className={style.wrapper}>
      <TestTabs className={style.tabsContainer} state={state} />

      {currContent && renderContent(currContent)}

      {/* <TimerBar className={style.timerContainer} state={state} /> */}
      {/* <QuesAns className={style.quesAnsContainer} /> */}

      {currContent && (currContent.type === "QUESTION" || currContent.type === "gif") && (
        <TestFooter currContent={currContent} className={style.footerContainer} />
      )}

      {currContent && currContent.type === "gif" && (
        <img src={"https://hikewise.in/static/media/wvp_ss.b57abc3ccf04a2aa10f7.png"} alt="tutorial" />
      )}
    </div>
  );
}
