import { createContext, useContext, useEffect, useReducer } from "react";

import { _InitialState, reducer } from "./reducer";
import useTimer from "./useTimer";
import useTestController from "./useTestController";
import useQuesAns from "./useQuesAns";

const TestContext = createContext({});

export function EngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { startSubcatTimer, stopSubcatTimer } = useTimer({ state, dispatch });

  const { getSectionQuestions, getAptiQuestions, uploadAnswer, uploadWvpAnswer, getMissedQuestions } = useQuesAns({
    state,
    dispatch,
  });

  const {
    startTest,
    continueTest,

    handleClickPrev,
    handleClickNext,
    handleClickOption,
    handleSelectOption,

    handleClickNextMainInstructions,
    handleClickNextSectionInstructions,
    handleClickNextSubcatInstructions,
    handleClickNextCatInstructions,
    handleSubmitWvp,

    handleChangeLang,
    toggleInstructionsModal,

    handleEnd,
  } = useTestController({
    state,
    dispatch,
    startSubcatTimer,
    stopSubcatTimer,
    getSectionQuestions,
    getAptiQuestions,
    getMissedQuestions,
    uploadAnswer,
    uploadWvpAnswer,
  });

  return (
    <TestContext.Provider
      value={{
        state,
        dispatch,

        startTest,
        continueTest,
        handleClickPrev,
        handleClickNext,
        handleClickOption,

        handleSelectOption,
        handleClickNextMainInstructions,
        handleClickNextSectionInstructions,
        handleClickNextSubcatInstructions,
        handleClickNextCatInstructions,

        handleSubmitWvp,
        uploadWvpAnswer,
        toggleInstructionsModal,

        handleChangeLang,

        handleEnd,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useEngine() {
  return useContext(TestContext);
}
