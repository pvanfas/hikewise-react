import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovMechReasoning({ score }) {
  const intro = {
    1: "You can improve your Mechanical Reasoning through the following strategies:",
    2: "You can improve your Mechanical Reasoning through the following strategies:",
    3: "You have a high mechanical reasoning ability",
  };

  const points = {
    1: [
      "You may <strong>undertake ‘do-it-yourself’ projects</strong>, or repair simple household devices, for giving yourself the scope to exercise your mechanical competence.",
      "<strong>Try assembling furniture</strong> following given instructions in the catalog or simply take apart discarded machinery and put them back together again.",
      "<strong>Improve your understanding of concepts related to forces and machines</strong> and their applications in practical situations.",
    ],
    2: [
      "You may undertake <strong>‘do-it-yourself’ projects,</strong> or repair household devices, for giving yourself the scope to exercise your mechanical competence.",
      "<strong>Try assembling furniture without relying on catalogs</strong> or simply take discarded household devices apart and put them back together again.",
      "<strong>Pay visits to workshops and industrial units</strong> and closely observe operations involving machinery.",
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
