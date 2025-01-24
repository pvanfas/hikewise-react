import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisPerApti({ score }) {
  const points = {
    1: [
      `You may have difficulty in working with speed and accuracy.`,
      `Making logical decisions based upon visual information may not be easy for you`,
      `Work where attention to detail and quality are important may not be suitable for you.`,
    ],
    2: [
      `You are capable of working with a fair amount of accuracy and speed.`,
      `You are reasonably good at making logical decisions based upon visual information.`,
      `You are likely to perform moderately well in work where attention to detail and quality are
      important.`,
    ],
    3: [
      `You are capable of working with high levels of speed and accuracy.`,
      `You are excellent at making logical decisions based upon visual information and also possess a
    high ability to compare and mark written lists quickly and accurately.`,
      `You are likely to excel in work where attention to detail and quality are important.`,
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
