import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisSelfControl({ score }) {
  const points = {
    1: [
      `You may feel enraged when things do not go your way. You are likely to be sensitive about
    being treated unfairly and feel resentful and bitter when you feel you are being cheated.`,
      `You feel strong cravings and urges that you have difficulty resisting. At Times you may get
    frustrated quickly .You tend to be oriented toward short-term pleasures and rewards rather
    than long-term consequences.`,
    ],
    2: [
      `You are usually an easy-going person but might get angry at times. Your level of anger is
       moderate.`,
      `To an extent you will be able to resist temptations but you might fall in as it gets stronger.
       You do experience strong cravings and consequently find yourselves tempted to overindulge.`,
    ],
    3: [
      `It’s not easy to provoke you or make you angry as you exhibit high levels of emotional
      stability. You may be able to execute difficult tasks without losing your temper`,
      `You may find it easier to resist temptations and overcome strong, irresistible cravings.`,
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
