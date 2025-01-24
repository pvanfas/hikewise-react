import React, { useState, useEffect } from "react";
import style from "./SectionInstructions.module.scss";

import parse from "html-react-parser";

import AptiInstructions from "./AptiInstructions";

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
import WvpGif from "assets/images/assessment/wvp_gif_desktop.gif";
import WvpGifMob from "assets/images/assessment/wvp_gif_mob.gif";

import { useEngine } from "../engine/EngineProvider";
import { useUserContext } from "contexts/UserContext";

export default function SectionInstructions({ isModal }) {
  const userContext = useUserContext();

  const [instructions, setInstructions] = useState({});
  const { state, handleClickNextSectionInstructions, toggleInstructionsModal } = useEngine();

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

  useEffect(() => {
    let testType = state.settings.testType;
    if (testType === "REDESIGN_PLUS") testType = "REDESIGN";

    const language = state.settings.selectedLanguage;
    if (!language) return;

    const inst = getInstructionsForLang(language)[testType][currContent.tabKey];
    setInstructions(inst);
  }, [state.settings]);

  return currContent.tabKey === "aptitude" ? (
    <AptiInstructions />
  ) : (
    <div className={style.wrapper}>
      <div className={style.title}>{instructions.title}</div>
      <div className={style.inner}>
        <div className={style.subtext}>{instructions.intro}</div>

        <div className={style.points}>
          <div className={style.italic}>Important points to remember</div>

          <ul>
            {instructions.imp_points?.points.map((point) => {
              if (point.type === "li") return <li key={point.content}>{parse(point.content)}</li>;

              if (point.type === "ol")
                return (
                  <>
                    <li>{parse(point.content)}</li>
                    <ol style={{ paddingLeft: "30px", listStyleType: "lower-roman" }}>
                      {point.items.map((item) => (
                        <li>{parse(item.content)}</li>
                      ))}
                    </ol>
                  </>
                );
            })}
          </ul>
        </div>

        {currContent.tabKey === "wvp" && <img src={window.innerWidth < 640 ? WvpGifMob : WvpGif} alt="" />}

        {!isModal ? (
          <button onClick={handleClickNextSectionInstructions}>Proceed</button>
        ) : (
          <button onClick={toggleInstructionsModal}>Close</button>
        )}
      </div>
    </div>
  );
}
