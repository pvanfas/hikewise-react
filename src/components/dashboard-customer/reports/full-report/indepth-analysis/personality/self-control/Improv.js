import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovAbsReason({ score }) {
  const intro = {
    1: "You can improve your Self Control through the following strategies:",
    2: "You can improve your Self Control through the following strategies:",
    3: "Your self control is high.",
  };

  const points = {
    1: [
      `<strong>Observe what happens</strong> during moments of losing self-control and critically examine the
      causes of your behavior`,
      `<strong>Set specific goals for improvement:</strong> understand precisely what you are trying to control,
       the key to setting goals to improve self control is about being precise with your goals.`,
      `<strong>Decrease the exposure:</strong> to stimuli which leads to undesirable behaviors.`,
      `<strong>Increase the attractiveness of desirable behavior: </strong> Self-control can be quickly improved if
      you acknowledge even the slightest of benefits that you get when you move towards the
      right behavior.`,
      `<strong>Create a recovery plan: </strong> Understand that you’ll probably experience setbacks and your
      self-control might fail. Don’t blame yourself for failure. Try Again.`,
    ],
    2: [
      `<strong>Critically examine the causes of your behavior</strong>: You should also critically look at your
    behavior and the real motivation behind it.`,
      `<strong>Set goals for improvement:</strong> understand precisely what you are trying to control, the key to
    setting goals to improve self-control is about being precise with your goals.`,
      `Decrease the exposure: to stimuli which leads to undesirable behaviors.`,
      `<strong>Decrease the exposure: </strong> to stimuli which leads to undesirable behaviors.`,
      `<strong>Increase the attractiveness of desirable behavior: </strong> Self-control can be quickly improved if
      you acknowledge even the slightest of benefits that you get when you move towards the
      right behavior.`,
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
