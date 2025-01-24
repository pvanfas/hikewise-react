import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovCompassion({ score }) {
  const intro = {
    1: "You can improve your Compassion through the following strategies:",
    2: "You can improve your Compassion through the following strategies:",
    3: "You are highly compassionate",
  };

  const points = {
    1: [
      `<strong>Listen attentively:</strong> listen with the intent of understanding, this will give others a sense of
    being heard.`,
      `<strong>Remember the whole person:</strong> When someone exhibits an undesirable behavior, do not
    equate it to them as a whole. Remind yourself of their positive qualities.`,
      `<strong>Practice Empathy:</strong> Suffering is universal. , Although the particular details of the problems
    may be subjective, remind yourself of a time when you went through something related.`,
      `<strong>Practice expressing gratitude:</strong> It’s important to appreciate positive events and people in
    you. This allows you to practice humility and reciprocate the goodness you have received
    from others.`,
    ],
    2: [
      `<strong>Try to practice non- judgmental acceptance:</strong> Refrain from making value judgements and
      approach individuals with open mindedness.`,
      `<strong>Remember the whole person:</strong> When someone exhibits an undesirable behavior, do not
      equate it to them as a whole. Remind yourself of their positive qualities.`,
      `<strong>Practice Empathy:</strong> Suffering is universal. Although the particular details of the problems
      may be subjective, remind yourself of a time when you went through something related.`,
      `<strong>Practice expressing gratitude:</strong> It’s important to appreciate positive events and people in
      you. This allows you to practice humility and reciprocate the goodness you have received
      from others.`,
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
