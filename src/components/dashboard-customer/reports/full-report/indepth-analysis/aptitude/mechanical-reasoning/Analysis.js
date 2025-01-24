import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisMechReasoning({ score }) {
  const points = {
    1: [
      "It may be difficult for you to understand the principles of physical forces and mechanical elements or apply them in practical situations.",
      "You may not be able to learn unfamiliar mechanical concepts quickly and may find it very difficult to install devices or equipment.",
      "The ability to diagnose problems involving machinery and make repairs may not come naturally to you.",
    ],
    2: [
      "You are fairly good at tasks that require an understanding of the principles of physical forces and mechanical elements.",
      "You may possess a reasonable level of mechanical expertise which can be applied in practical situations.",
      "You are likely to be able to grasp new or unfamiliar mechanical concepts moderately well and can install common devices or equipment.",
      "The ability to diagnose problems involving machinery or equipment and make lasting repairs, is fairly good.",
    ],
    3: [
      "You are excellent at tasks that require an understanding of the principles of physical forces and mechanical elements and can apply these in practical situations.",
      "You possess a broad level of mechanical expertise that can be applied across several roles or functions.",
      "You are likely to be very good at learning new or unfamiliar mechanical concepts quickly and installing complex devices or equipment in a manner that meets or exceeds specifications",
      "You are quick and accurate in diagnosing complex problems involving machinery or equipment and making repairs that would rarely or never require rework",
    ],
  };
  return (
    <div className={style.wrapper}>
      <div className={style.analysis}>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
