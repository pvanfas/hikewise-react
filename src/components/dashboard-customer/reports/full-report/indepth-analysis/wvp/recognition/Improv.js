import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovRecog({ score }) {
  const intro = {
    1: "For you; on your ideal job, the below given work values are <strong><em><u>of Little Importance.</strong></em></u>",
    2: "For you; on your ideal job, the below given work values are <strong><em><u>of Average Importance.</strong></em></u>",
    3: "For you; on your ideal job, the below given work values are <strong><em><u>Very Important.</strong></em></u>",
  };

  const points = {
    1: [
      `Chance to move up and be a leader`,
      `Being able to direct and influence others`,
      `Having an important or prestigious job`,
    ],
    2: [
      `Chance to move up and be a leader`,
      `Being able to direct and influence others`,
      `Having an important or prestigious job`,
    ],
    3: [
      `Chance to move up and be a leader`,
      `Being able to direct and influence others`,
      `Having an important or prestigious job`,
    ],
  };

  return (
    <div className={style.wrapper}>
      <div className={style.improv}>
        <div className={style.introText}>{parse(intro[score])}</div>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{parse(point)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
