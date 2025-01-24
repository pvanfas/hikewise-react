import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisNumericalAptitude({ score }) {
  const points = {
    1: [
      "It may be very difficult for you to understand numerical concepts and perform computations using numbers.",
      "You might require a lot of time to grasp new numerical concepts and their manipulation.",
      "It might not be possible for you to recognize numerical relationships or apply numerical reasoning for decision making.",
    ],
    2: [
      "You have a reasonable level of understanding of numerical concepts and an average capacity to perform computations using numbers.",
      "You may be able to learn new numerical concepts and manipulate them fairly effectively.",
      "You are likely to be fairly good at identifying the relevant numerical information required for decision making and applying numerical reasoning while analyzing information.",
    ],
    3: [
      "You have a superior understanding of numerical concepts and mathematical operations",
      "You are likely to excel at tasks that require the ability to perform complex computations using numbers.",
      "It's easy for you to learn new numerical concepts quickly and effectively manipulate them.",
      "You are very good at identifying the relevant numerical information needed to enhance decision making.",
      "You are consistent in applying sound numerical reasoning when analyzing information and recognizing the numerical relationships among apparently different concepts.",
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
