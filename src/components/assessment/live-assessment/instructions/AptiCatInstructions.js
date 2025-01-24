import React, { useEffect, useState } from "react";
import style from "./AptiCatInstructions.module.scss";

import { useEngine } from "../engine/EngineProvider";
import CatInstructions from "../engine/_CatInstructions.json";

import InstructionsAssamese from "../engine/instructions/assamese/_CatPointsInstructions.json";
import InstructionsBengali from "../engine/instructions/bengali/_CatPointsInstructions.json";
import InstructionsEnglish from "../engine/instructions/english/_CatPointsInstructions.json";
import InstructionsGujarati from "../engine/instructions/gujarati/_CatPointsInstructions.json";
import InstructionsHindi from "../engine/instructions/hindi/_CatPointsInstructions.json";
import InstructionsKannada from "../engine/instructions/kannada/_CatPointsInstructions.json";
import InstructionsMalayalam from "../engine/instructions/malayalam/_CatPointsInstructions.json";
import InstructionsMarathi from "../engine/instructions/marathi/_CatPointsInstructions.json";
import InstructionsOdia from "../engine/instructions/odia/_CatPointsInstructions.json";
import InstructionsPunjabi from "../engine/instructions/punjabi/_CatPointsInstructions.json";
import InstructionsTamil from "../engine/instructions/tamil/_CatPointsInstructions.json";
import InstructionsTelugu from "../engine/instructions/telegu/_CatPointsInstructions.json";
import InstructionsUrdu from "../engine/instructions/urdu/_CatPointsInstructions.json";

export default function AptiCatInstructions() {
  const { state, handleClickNextCatInstructions } = useEngine();

  const [instructions, setInstructions] = useState(null);

  let testType = state.settings.testType;
  if (testType === "REDESIGN_PLUS") testType = "REDESIGN";

  const currContent = state.testData.contents[state.testData.currIndices[0]].content[state.testData.currIndices[1]];
  const distribution = CatInstructions[testType][currContent.tabKey][currContent.catName].distribution;

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

    setInstructions(getInstructionsForLang(language));
  }, [state.settings.selectedLanguage]);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{currContent.catName} Instructions</div>
      <div className={style.inner}>
        <div className={style.subtext}>
          In {currContent.catName} test, there will be <strong>{distribution.length} sub-sections</strong>
        </div>

        <div className={style.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>No. Of Questions</th>
                <th>Time Alloted</th>
              </tr>
            </thead>

            {distribution.map((item) => (
              <tbody key={item.type}>
                <tr>
                  <td>{item.type}</td>
                  <td>{item.quesCount} </td>
                  <td>{item.time} </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>

        <div className={style.points}>
          <div className={style.italic}>{`${instructions?.subtext.split("::")[0]} ${distribution.length} ${
            instructions?.subtext.split("::")[1]
          } `}</div>
          <ul>
            {instructions?.points?.map((point, index) => {
              return index === 0 ? (
                <li>{point.split("::")[0] + " " + currContent.catName + " " + point.split("::")[1]}</li>
              ) : (
                <li>{point}</li>
              );
            })}
            {/* <li>Each subsection in {currContent.catName} is alloted a limited time as indicated in the table</li>
            <li>You won't be able to go back to the previous sub-section once the time alloted is over.</li>
            <li>Once you start a question, you will have access to the immediate previous question only.</li>
            <li>So choose the options (responses) carefully.</li> */}
          </ul>
        </div>
      </div>

      <button onClick={handleClickNextCatInstructions}>Proceed</button>
    </div>
  );
}
