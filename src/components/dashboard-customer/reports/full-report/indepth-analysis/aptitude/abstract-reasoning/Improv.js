import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovAbsReason({ score }) {
  const intro = {
    1: "You can try improving the use of your Abstract Reasoning skills through the following strategies:",
    2: "You can improve your Abstract Reasoning through the following strategies:",
    3: "You have a high level of abstract reasoning ability.",
  };

  const points = {
    1: [
      `<strong>Be a fine observer</strong> – observe receptively what happens around you with an open mind and attempt to observe the patterns in human and nature’s behavior.`,
      `<strong>Engage with problems that you enjoy solving</strong> and look for ways of approaching them from a different angle more abstractly. Try forming theories about ways of solving these problems.`,
      `<strong>Seek out and practice abstract problems</strong> and thought experiments in newspapers,
       magazines and quiz books, and from online platforms.`,
      `<strong>Regular intense exercise/ workouts and a balanced diet</strong> will keep your brain cells stimulated to help in abstract thinking.`,
    ],
    2: [
      `<strong>Engage with problems that you enjoy solving</strong> and look for ways of approaching them from
        a different angle more abstractly. Try forming theories about ways of solving these
        problems.`,
      `<strong>Seek out and practice abstract problems</strong> and thought experiments in newspapers, magazines and quiz books, and from online platforms.`,
      `<strong>Use improvisations</strong> : such skills may also help increase your creativity and abstract thinking skills`,
      `<strong>Regular intense exercise/ workouts and a balanced diet</strong> will keep your brain cells stimulated to help in abstract thinking.`,
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
