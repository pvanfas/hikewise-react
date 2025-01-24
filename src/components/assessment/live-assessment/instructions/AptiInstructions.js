import React, { useState, useEffect } from "react";
import style from "./AptiInstructions.module.scss";

import InstructionsAssamese from "../engine/instructions/assamese/AptiSecInstructions.json";
import InstructionsBengali from "../engine/instructions/bengali/AptiSecInstructions.json";
import InstructionsEnglish from "../engine/instructions/english/AptiSecInstructions.json";
import InstructionsGujarati from "../engine/instructions/gujarati/AptiSecInstructions.json";
import InstructionsHindi from "../engine/instructions/hindi/AptiSecInstructions.json";
import InstructionsKannada from "../engine/instructions/kannada/AptiSecInstructions.json";
import InstructionsMalayalam from "../engine/instructions/malayalam/AptiSecInstructions.json";
import InstructionsMarathi from "../engine/instructions/marathi/AptiSecInstructions.json";
import InstructionsOdia from "../engine/instructions/odia/AptiSecInstructions.json";
import InstructionsPunjabi from "../engine/instructions/punjabi/AptiSecInstructions.json";
import InstructionsTamil from "../engine/instructions/tamil/AptiSecInstructions.json";
import InstructionsTelugu from "../engine/instructions/telegu/AptiSecInstructions.json";
import InstructionsUrdu from "../engine/instructions/urdu/AptiSecInstructions.json";

import { useEngine } from "../engine/EngineProvider";
import { useUserContext } from "contexts/UserContext";

export default function AptiInstructions() {
  const userContext = useUserContext();

  const { state, handleClickNextSectionInstructions } = useEngine();
  const apitTab = state.screenState.tabs.find((f) => f.key === "aptitude");

  const [instructions, setInstructions] = useState({});

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

  function getTimeForCat(catName) {
    if (state.settings.testType === "RISE") {
      switch (catName) {
        case "Numerical Aptitude":
          return 20;
        case "Abstract Reasoning":
          return 15;
        case "Verbal Aptitude":
          return 20;
        case "Mechanical Reasoning":
          return 15;
        case "Spatial Aptitude":
          return 15;
        case "Perceptual Aptitude":
          return 15;
        default:
          return 0;
      }
    } else if (state.settings.testType === "REDESIGN" || state.settings.testType === "REDESIGN_PLUS") {
      switch (catName) {
        case "Numerical Aptitude":
          return 20;
        case "Abstract Reasoning":
          return 15;
        case "Verbal Aptitude":
          return 20;
        case "Mechanical Reasoning":
          return 15;
        case "Spatial Aptitude":
          return 15;
        case "Perceptual Aptitude":
          return 15;

        default:
          return 0;
      }
    } else if (state.settings.testType === "SAIL") {
      switch (catName) {
        case "Numerical Aptitude":
          return 20;
        case "Abstract Reasoning":
          return 15;
        case "Verbal Aptitude":
          return 20;
        case "Mechanical Reasoning":
          return 15;
        case "Spatial Aptitude":
          return 15;
        case "Perceptual Aptitude":
          return 15;
        default:
          return 0;
      }
    }
  }

  useEffect(() => {
    let testType = state.settings.testType;
    if (testType === "REDESIGN_PLUS") testType = "REDESIGN";

    const language = state.settings.selectedLanguage;
    if (!language) return;

    const inst = getInstructionsForLang(language);
    setInstructions(inst);
  }, [state.settings]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Aptitude Assessment Instructions</div>
      <div className={style.inner}>
        <div className={style.subtext}>{instructions?.subtext}</div>

        <div className={style.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Time Alloted</th>
              </tr>
            </thead>

            {apitTab.categories.map((cat) => (
              <tbody key={cat.name}>
                <tr>
                  <td>{cat.name}</td>
                  <td>{getTimeForCat(cat.name)} Mins</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className={style.points}>
          <div className={style.italic}>Important points to remember</div>
          <ul>
            {instructions?.points?.map((pt) => (
              <li>{pt}</li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={handleClickNextSectionInstructions}>Proceed</button>
    </div>
  );
}
