import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovVerbalAptitude({ score }) {
  const intro = {
    1: "You can improve your Verbal Aptitude through the following strategies:",
    2: "You can improve your Verbal Aptitude through the following strategies::",
    3: "You have a well-developed verbal aptitude.",
  };

  const points = {
    1: [
      "<strong>Build a good vocabulary</strong> through extensive reading.",
      "<strong>Read articles from newspapers, magazines and blogs:</strong> Check out for new phrases and try to incorporate them in your language use.",
      "<strong>Improve Verbal Reasoning Skills by</strong> playing word games or games like spotting the odd word out, finding synonyms or spelling challenges, especially creative ones where you have to work out the flow, the reasoning etc.",
    ],
    2: [
      "<strong>Build a good vocabulary</strong> through extensive reading.",
      "<strong>Improving Verbal Reasoning Skills</strong> by playing word games or games like spotting the odd word out, finding synonyms or spelling challenges.",
      "<strong>Try to write out stories</strong> – especially creative ones where you have to work out the flow, the reasoning etc",
      "<strong>Actively take up part discussions and debates</strong> which will enable you to express yourself through words.",
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
