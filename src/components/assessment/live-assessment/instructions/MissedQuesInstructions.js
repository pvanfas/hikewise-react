import React, { useState, useEffect } from "react";
import style from "./SectionInstructions.module.scss";

import InstructionsAssamese from "../engine/instructions/assamese/_SectionInstructions.json";
import InstructionsBengali from "../engine/instructions/bengali/_SectionInstructions.json";
import InstructionsEnglish from "../engine/instructions/english/_SectionInstructions.json";
import InstructionsGujarati from "../engine/instructions/gujarati/_SectionInstructions.json";
import InstructionsHindi from "../engine/instructions/hindi/_SectionInstructions.json";
import InstructionsKannada from "../engine/instructions/kannada/_SectionInstructions.json";
import InstructionsMalayalam from "../engine/instructions/malayalam/_SectionInstructions.json";
import InstructionsMarathi from "../engine/instructions/marathi/_SectionInstructions.json";
import InstructionsOdia from "../engine/instructions/odia/_SectionInstructions.json";
import InstructionsPunjabi from "../engine/instructions/punjabi/_SectionInstructions.json";
import InstructionsTamil from "../engine/instructions/tamil/_SectionInstructions.json";
import InstructionsTelugu from "../engine/instructions/telegu/_SectionInstructions.json";
import InstructionsUrdu from "../engine/instructions/urdu/_SectionInstructions.json";

import WvpSs from "assets/images/assessment/wvp_ss.png";

import { useEngine } from "../engine/EngineProvider";
import { useUserContext } from "contexts/UserContext";
import { getRequest } from "utils/api";

export default function MissedQuesInstructions({ isModal }) {
  const userContext = useUserContext();

  const [isLoading, setIsLoading] = useState(true);

  const [instructions, setInstructions] = useState({});
  const { state, handleClickNextSectionInstructions, toggleInstructionsModal, handleEnd } = useEngine();

  let currContent = state.testData.contents[state.testData.currIndices[0]].content[state.testData.currIndices[1]];
  if (isModal) currContent = currContent.instructions;

  function getInstructionsForLang(lang) {
    switch (lang) {
      case "AS":
        return InstructionsAssamese;
      case "BN":
        return InstructionsBengali;
      case "EN":
        return InstructionsEnglish;
      case "GU":
        return InstructionsGujarati;
      case "HI":
        return InstructionsHindi;
      case "KN":
        return InstructionsKannada;
      case "ML":
        return InstructionsMalayalam;
      case "OD":
        return InstructionsOdia;
      case "PA":
        return InstructionsPunjabi;
      case "TA":
        return InstructionsTamil;
      case "MR":
        return InstructionsMarathi;
      case "TE":
        return InstructionsTelugu;
      case "UR":
        return InstructionsUrdu;
      default:
        return InstructionsEnglish;
    }
  }

  async function checkMissedQues() {
    const missedQuesResp = await getRequest(`/assessment/questions/missed`);
    const missedQues = missedQuesResp.data;
    let totMissed = 0;

    for (const key in missedQues) {
      totMissed += Array.isArray(missedQues[key]) ? missedQues[key].length : 0;
    }

    if (totMissed === 0) handleEnd();
  }

  useEffect(() => {
    let testType = state.settings.testType;
    if (testType === "REDESIGN_PLUS") testType = "REDESIGN";

    const language = userContext?.state?.profile?.pref_language;
    if (!language) return;

    const inst = getInstructionsForLang(language)[testType][currContent.tabKey];
    setInstructions(inst);
  }, [userContext]);

  useEffect(() => {
    checkMissedQues();
  }, []);

  return (
    !isLoading && (
      <div className={style.wrapper}>
        <div className={style.inner}>
          <div className={style.points}>
            <div className={style.italic}>MISSED QUESTIONS</div>

            <div>
              Congratulations! You've reached the end of the assessment. Unfortunately, due to a technical error, some
              questions were not displayed during the test. But don't worry, we've got you covered! We've provided you
              with the missed questions so you can answer them as you would any other question. We understand how
              important it is to receive a comprehensive evaluation, so please take your time and give your best shot.
              Thank you for participating and good luck.
            </div>
          </div>

          {!isModal ? (
            <button onClick={handleClickNextSectionInstructions}>Proceed</button>
          ) : (
            <button onClick={toggleInstructionsModal}>Close</button>
          )}
        </div>
      </div>
    )
  );
}
