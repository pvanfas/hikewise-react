import React from "react";
import style from "./TestFooter.module.scss";

import ButtonLight from "components/shared/ButtonLight";
import clsx from "clsx";

export default function TestFooter({ state, handleClickPrev, handleClickNext, isApti, toggleInstructionsModal }) {
  const isPrevDisabled = state.screenState.isDisablePrevButton;
  const isActiveCatSidebar = state.screenState.isActiveCatSidebar;
  // const isOpenCatSidebar = state.screenState.isOpenCatSidebar;

  return (
    <div className={style.wrapper}>
      <span className={style.instructionsBtn} onClick={toggleInstructionsModal}>
        View Instructions
      </span>

      {state.screenState.showNextButton && (
        <ButtonLight
          onClick={handleClickNext}
          className={clsx(style.nextBtn, isApti && !isActiveCatSidebar && style.apti)}
          options={{ radius: "5px" }}
        >
          Next
        </ButtonLight>
      )}

      {state.screenState.showPrevButton && (
        <ButtonLight
          onClick={handleClickPrev}
          className={clsx(style.prevBtn, isApti && !isActiveCatSidebar && style.apti)}
          options={{ radius: "5px" }}
          disabled={isPrevDisabled}
        >
          Prev
        </ButtonLight>
      )}

      <div>
        Question : {state.testData.currQuesNo}/ {state.testData.currQuesCount}
      </div>
    </div>
  );
}
