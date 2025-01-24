import React, { useState, useEffect } from "react";
import style from "./AptiSubcatInstructions.module.scss";

import clsx from "clsx";
import parse from "html-react-parser";

import { useEngine } from "../engine/EngineProvider";

import InstructionsAssamese from "../engine/instructions/assamese/_SubcatInstructions.json";
import InstructionsBengali from "../engine/instructions/bengali/_SubcatInstructions.json";
import InstructionsEnglish from "../engine/instructions/english/_SubcatInstructions.json";
import InstructionsGujarati from "../engine/instructions/gujarati/_SubcatInstructions.json";
import InstructionsHindi from "../engine/instructions/hindi/_SubcatInstructions.json";
import InstructionsKannada from "../engine/instructions/kannada/_SubcatInstructions.json";
import InstructionsMalayalam from "../engine/instructions/malayalam/_SubcatInstructions.json";
import InstructionsMarathi from "../engine/instructions/marathi/_SubcatInstructions.json";
import InstructionsOdia from "../engine/instructions/odia/_SubcatInstructions.json";
import InstructionsPunjabi from "../engine/instructions/punjabi/_SubcatInstructions.json";
import InstructionsTamil from "../engine/instructions/tamil/_SubcatInstructions.json";
import InstructionsTelugu from "../engine/instructions/telegu/_SubcatInstructions.json";
import InstructionsUrdu from "../engine/instructions/urdu/_SubcatInstructions.json";

export default function AptiSubcatInstructions({ isModal }) {
  const [instructions, setInstructions] = useState({});

  const { state, handleClickNextSubcatInstructions, toggleInstructionsModal } = useEngine();

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

  let testType = state.settings.testType;
  if (testType === "REDESIGN_PLUS") testType = "REDESIGN";

  useEffect(() => {
    const language = state.settings.selectedLanguage;
    if (!language) return;
    const inst = getInstructionsForLang(language)[testType][currContent.tabKey][currContent.catName][currContent.subcatName];
    setInstructions(inst);
  }, [state.settings]);


  const isCheckingInformation = instructions.title === "Checking Information";

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{instructions.title} </div>
      <div className={style.body}>
        {instructions.body?.map((point, index) => {
          if (point.type === "TEXT") {
            return <React.Fragment key={index}>{parse(point.content)}</React.Fragment>;
          } else if (point.type === "IMG")
            return (
              <div className={style.image} key={index}>
                <img
                  className={clsx(isCheckingInformation && style.checkingInfo)}
                  src={point.content}
                  alt="figure explaining problem"
                />
              </div>
            );
        })}
      </div>
      <div className={style.footer}>
        <div className={style.numberOfQuesns}>No of questions: {instructions.quesCount}</div>
        <div className={style.time}>Time alloted : {instructions.time} </div>
      </div>
      {isModal ? (
        <button onClick={toggleInstructionsModal}>Close</button>
      ) : (
        <button onClick={handleClickNextSubcatInstructions}>Proceed</button>
      )}
    </div>
  );
}
