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
      `Able to decide what work you do`,
      `Supervising your own work`,
      `Being creative and finding new ways to do things`,
    ],
    2: [
      `Able to decide what work you do`,
      `Supervising your own work`,
      `Being creative and finding new ways to do things`,
    ],
    3: [
      `Able to decide what work you do`,
      `Supervising your own work`,
      `Being creative and finding new ways to do things`,
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
