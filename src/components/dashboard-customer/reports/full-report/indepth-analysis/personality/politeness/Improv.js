import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovPoliteness({ score }) {
  const intro = {
    1: "You can improve your Politeness through the following strategies:",
    2: "You can improve your Politeness through the following strategies:",
    3: "You are highly polite.",
  };

  const points = {
    1: [
      `<strong>Incorporate greeting culture:</strong> Use your energy to express formal greetings and don’t be
       hesitant to apologize when it’s required.`,
      `<strong>Compliment others:</strong> Take initiative in praising others. Be enthusiastic and true to your words.`,
      `<strong>Don’t say anything negative:</strong> You should try to find new ways to express disapproval that`,
      `<strong>Respect your stance:</strong> You may disagree with others, but you can do so without causing
      conflict by keeping a positive tone of voice and smiling face.`,
      `<strong>Body language:</strong> Don’t forget, when it’s appropriate, to embrace, shake hands, and use your
      body language to accentuate your words and praises. They make you a more characteristic
      and memorable person, and people will easily remember your rhetoric and positive attitude.`,
    ],
    2: [
      `<strong>Compliment others:</strong> Take initiative in praising others. Be enthusiastic and true to your words.`,
      `<strong>Respect your stance:<strong> You may have to disagree with others, but you can do so without
      causing conflict by keeping a positive tone of voice and smiling face.`,
      `<strong>Body language:</strong> Don’t forget, when it’s appropriate, to embrace, shake hands, and use your
      body language to accentuate your words and praises. They make you a more characteristic
      and memorable person, and people will easily remember your rhetoric and positive attitude.`,
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
