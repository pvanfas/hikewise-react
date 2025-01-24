import React, { useEffect, useState } from "react";
import style from "./StartInstructions.module.scss";

import InstructionsAssamese from "../engine/instructions/assamese/_MainInstructions.json";
import InstructionsBengali from "../engine/instructions/bengali/_MainInstructions.json";
import InstructionsEnglish from "../engine/instructions/english/_MainInstructions.json";
import InstructionsGujarati from "../engine/instructions/gujarati/_MainInstructions.json";
import InstructionsHindi from "../engine/instructions/hindi/_MainInstructions.json";
import InstructionsKannada from "../engine/instructions/kannada/_MainInstructions.json";
import InstructionsMalayalam from "../engine/instructions/malayalam/_MainInstructions.json";
import InstructionsMarathi from "../engine/instructions/marathi/_MainInstructions.json";
import InstructionsOdia from "../engine/instructions/odia/_MainInstructions.json";
import InstructionsPunjabi from "../engine/instructions/punjabi/_MainInstructions.json";
import InstructionsTamil from "../engine/instructions/tamil/_MainInstructions.json";
import InstructionsTelugu from "../engine/instructions/telegu/_MainInstructions.json";
import InstructionsUrdu from "../engine/instructions/urdu/_MainInstructions.json";

import { useEngine } from "../engine/EngineProvider";

export default function TestInstructions() {
  const { state, startTest } = useEngine();
  const [instructions, setInstructions] = useState(null);

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
    const language = state.settings.selectedLanguage;
    if (!language) return;

    setInstructions(getInstructionsForLang(language)[state.settings.testType]);
  }, [state.settings]);

  return (
    <div className={style.wrapper}>
      {instructions && (
        <div className={style.inner}>
          <div className={style.title}>{instructions.title}</div>
          <div className={style.subtext}>{instructions.subtext}</div>
          <div className={style.points}>
            <ul>
              {instructions.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={style.footer}>
        <button onClick={startTest}>Start Test</button>
      </div>
    </div>
  );
}
