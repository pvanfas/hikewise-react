import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisOrderliness({ score }) {
  const points = {
    1: [
      `You are likely to be disorganized and scattered as you find it difficult to stick to schedules
      and follow routine.`,
      `You find contracts, rules, and regulations overly confining. Others might view you as
      unreliable or irresponsible.`,
      `You are often impulsive and say or do the first thing that comes to your mind without
      deliberating alternative options and the probable consequences of those alternatives.`,
    ],
    2: [
      `You are usually neat, tidy, and well-organized, but there are times when you tend to get
       disorganized`,
      `You try to adhere strictly to your ethical principles and scrupulously fulfill your moral
       obligations as you understand them. However sometimes, you are more casual about such
       matters and may appear to be somewhat undependable or unreliable.`,
      `You generally take decisions after careful consideration. But at times you end up being hasty
       and speak or act without considering the consequences.`,
    ],
    3: [
      `You are well-organized. . You tend to keep lists, make plans and pay attention to detail.`,
      `You might enjoy living according to routines and schedules and may get disturbed things
      may fall out of place.`,
      `You have a strong sense of moral obligation.`,
      `You take your time when making decisions. You are cautious and deliberate.`,
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
