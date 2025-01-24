import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovRelation({ score }) {
  const intro = {
    1: "For you; on your ideal job, the below given work values are <strong><em><u>Very Important.</strong></em></u>",
    2: "For you; on your ideal job, the below given work values are <strong><em><u>of Average Importance.</strong></em></u>",
    3: "For you; on your ideal job, the below given work values are <strong><em><u>Very Important.</strong></em></u>",
  };

  const points = {
    1: [
      `Getting along with your boss, coworkers, and customers`,
      `Working with diverse people of many cultures and backgrounds`,
      `Helping and caring for other people`,
    ],
    2: [
      `Having a boss that stands behind their employees`,
      `Access to the right tools, training, and resources needed to do your job`,
    ],
    3: [
      `Having a boss that stands behind their employees`,
      `Access to the right tools, training, and resources needed to do your job`,
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
