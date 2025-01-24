import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovRecog({ score }) {
  const intro = {
    1: "For you; on your ideal job, the below given work values are <strong><em><u>Very Important.</strong></em></u>",
    2: "For you; on your ideal job, the below given work values are <strong><em><u>of Average Importance.</strong></em></u>",
    3: "For you; on your ideal job, the below given work values are <strong><em><u>Very Important.</strong></em></u>",
  };

  const points = {
    1: [
      `Having good work conditions`,
      `Being well paid and having good benefits`,
      `Having a job with low risk of a change in pay or work duties`,
      `Having a variety of things to do on the job`,
    ],
    2: [
      `Chance to use your strongest skills and feel good about your work`,
      `Being challenged and doing interesting work`,
      `Learning and gaining new skills`,
    ],
    3: [
      `Chance to use your strongest skills and feel good about your work`,
      `Being challenged and doing interesting work`,
      `Learning and gaining new skills`,
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
