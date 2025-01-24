import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisIntellect({ score }) {
  const points = {
    1: [
      `You may be slow in doing complex tasks and you may be difficult to face unexpected
    problems`,
      `You may be better at dealing with people or things rather than ideas.`,
      `You may regard intellectual exercises as difficult to comprehend or as a waste of time.`,
    ],
    2: [
      `You may enjoy both philosophical arguments and brain teasers. but you may prefer not to
      engage in such in tasks all the time`,
      `You don’t get curious about things very often and you tend to narrowly focus your
      intellectual resources on limited topics.`,
    ],
    3: [
      `You are open-minded to new and unusual ideas as you love playing around with them , and
      focused on taking new challenges and obstacles`,
      `You may like to debate intellectual issues as you are happy to think about abstract concepts.`,
      `You tend to enjoy riddles, puzzles, and brain teasers.`,
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
