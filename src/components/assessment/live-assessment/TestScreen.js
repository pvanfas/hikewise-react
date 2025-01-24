import React, { useState, useEffect } from "react";
import style from "./TestScreen.module.scss";

import { useEngine } from "./engine/EngineProvider";

import Navbar from "components/navbar/Navbar";

import StartInstructions from "./instructions/StartInstructions";
import ContinueInstructions from "./instructions/ContinueInstructions";
import AssessmentCompleted from "./instructions/AssessmentCompleted";

import LiveTest from "./LiveTest";

import ClipLoader from "react-spinners/ClipLoader";
import AptiCatInstructions from "./instructions/AptiCatInstructions";
import AptiSubcatInstructions from "./instructions/AptiSubcatInstructions";
import SectionInstructions from "./instructions/SectionInstructions";

import { useUserContext } from "contexts/UserContext";

// import RiseImagesTxt from "assets/rise_images.txt";
// import SailImagesTxt from "assets/sail_images.txt";

import RedesignImagesTxt from "assets/redesign_images.txt";
import MissedQuesInstructions from "./instructions/MissedQuesInstructions";
import LangSelection from "./LangSelection";
import clsx from "clsx";

export default function TestScreen({ type }) {
  const { state, dispatch } = useEngine();

  const userContext = useUserContext();

  const [allImages, setAllImages] = useState([]);

  function getAllImages() {
    fetch(RedesignImagesTxt)
      .then((r) => r.text())
      .then((text) => {
        const imagesArray = text
          .split("\n")
          .map(
            (path) =>
              `https://hikewise.sgp1.cdn.digitaloceanspaces.com/hikewise/images/assessment/aptitude/redesign/${path}`
          );
        setAllImages(imagesArray);
      });
  }

  function preloadAllImages() {
    allImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }

  useEffect(() => {
    getAllImages();
  }, []);

  useEffect(() => {
    if (!allImages) return;
    preloadAllImages();
  }, [allImages.length]);

  useEffect(() => {
    if (!type) return;

    dispatch({
      type: "SET_TEST_TYPE",
      payload: { type: userContext.state.profile.department },
    });
    dispatch({
      type: "SET_LANGUAGE",
      payload: { language: userContext.state.profile.pref_language },
    });
    dispatch({
      type: "SET_SEL_LANGUAGE",
      payload: { language: userContext.state.profile.pref_language },
    });
  }, [userContext.state.profile]);

  function renderContent(content) {
    switch (content.type) {
      case "START_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <StartInstructions />
          </div>
        );
      case "CONTINUE_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <ContinueInstructions />
          </div>
        );
      case "SEC_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <SectionInstructions />
          </div>
        );

      case "MISSED_QUES_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <MissedQuesInstructions />
          </div>
        );

      case "CAT_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <AptiCatInstructions />
          </div>
        );

      case "SUBCAT_INSTRUCTIONS":
        return (
          <div className={style.contentWrapper}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <AptiSubcatInstructions />
          </div>
        );

      default:
        return (
          <div className={clsx(style.contentWrapper, style.quesAnsWrapper)}>
            <div className={style.langSelector}>
              <LangSelection />
            </div>
            <LiveTest />
          </div>
        );
    }
  }

  return (
    <div className={style.wrapper}>
      <Navbar background="white" />

      {state.screenState.isLoading ? (
        <div className={style.loaderWrapper}>
          <ClipLoader color={"#9456c8"} loading={true} size={100} />
        </div>
      ) : (
        <>
          {state.testState.isEnd && <AssessmentCompleted />}

          {!state.testState.isEnd && (
            <>
              {renderContent(
                state.testData?.contents[state.testData.currIndices[0]]?.content[state.testData.currIndices[1]]
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
