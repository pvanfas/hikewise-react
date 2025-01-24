import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovNumericalAptitude({ score }) {
  const intro = {
    1: "You can try to make improvements in your numerical aptitude through the following strategies:",
    2: "You can try to make improvements in your numerical aptitude through the following strategies:",
    3: "You have a highly developed Numerical Aptitude.",
  };

  const points = {
    1: [
      "<strong>Refrain from using the calculator</strong> when required to make simple calculations.",
      "Work on <strong>improving understanding</strong> of concepts related to simple statistics and numerical data representation as graphs and charts etc. This may help you develop research skills.",
      "You may try <strong>rigorously practicing</strong> a lot of numerical problems ranging from basic ones to advanced and complex ones to develop a deeper understanding of numbers and their behavior.",
    ],
    2: [
      "Work on <strong>improving your understanding of concepts</strong> related to simple statistics and numerical data representation as graphs and charts etc. This may help you develop research skills.",
      "You may try <strong>rigorously practicing</strong> a lot of numerical problems ranging from basic ones to advanced and complex ones to develop a deeper understanding of numbers and their behavior.",
    ],
    3: [],
  };
  return (
    <div className={style.wrapper}>
      <div className={style.improv}>
        <div className={style.introText}>{intro[score]}</div>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{parse(point)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
