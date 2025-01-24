import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovEmoMaturity({ score }) {
  const intro = {
    1: "You can improve your Emotional Maturity through the following strategies:",
    2: "You can improve your Emotional Maturity through the following strategies:",
    3: "You have scored satisfactorily in this trait.",
    4: "You have scored well in this trait.",
  };

  const points = {
    1: [
      `<strong>Be present:</strong> You have to become fully conscious and present to what is happening both
      within and around you. If not alert and aware, you’ll quickly slip into old, habitual, negative
      ways of reacting. Being present does not make responding easy. But it does put you in the
      driver’s seat.`,
      `<strong>Embrace Reality:</strong> Reality is “what is” or “the way things are”. It is independent of your
      opinions about it. Embrace it and find peace. Resist it and experience pain and frustration.
      Some of your realities you chose (career, who you married) and others were thrust upon you
      by your heritage (your stature, age) or other factors outside your control.`,
      `<strong>Exercise Responsibility:</strong> Responsibility has to do with the choices you make about how to
      think, feel and act about reality. The quality of your life depends on your ability to make good
      choices—choices consistent with your best self and long-term best-interest—in spite of what happens to you.`,
      `<strong>Clarify Your Vision:</strong> What do you really want? What is most important to you? Being clear
      about your vision gives you the motivation or incentive to make good choices when in a key
      moment. It is easy to follow the path of least resistance or act out negative emotions.`,
    ],
    2: [
      `<strong>Be present:</strong> You have to become fully conscious and present to what is happening both
    within and around you. If not alert and aware, you’ll quickly slip into old, habitual, negative
    ways of reacting. Being present does not make responding easy. But it does put you in the
    driver’s seat.`,
      `<strong>Embrace Reality:</strong> Reality is “what is” or “the way things are”. It is independent of your
    opinions about it. Embrace it and find peace. Resist it and experience pain and frustration.
    Some of your realities you chose (career, who you married) and others were thrust upon you
    by your heritage (your stature, age) or other factors outside your control.`,
      `<strong>Exercise Responsibility:</strong> Responsibility has to do with the choices you make about how to
    think, feel and act about reality. The quality of your life depends on your ability to make good
    choices—choices consistent with your best self and long-term best-interest—in spite of
    <strong>Clarify Your Vision:</strong> What do you really want? What is most important to you? Being clear
    about your vision gives you the motivation or incentive to make good choices when in a key
    moment. It is easy to follow the path of least resistance or act out negative emotions.`,
    ],
    3: [],
    4: [],
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
