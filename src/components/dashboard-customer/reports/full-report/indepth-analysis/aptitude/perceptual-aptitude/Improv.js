import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovPerApti({ score }) {
  const intro = {
    1: "You can improve your Perceptual Aptitude through the following strategies:",
    2: "You can improve your Perceptual Aptitude through the following strategies:",
    3: "You have a high perceptual aptitude",
  };

  const points = {
    1: [
      `Try <strong>solving puzzles</strong> like jigsaws of designs, letters, pictures, words, etc. and ‘spot the
       difference’ games or memory games that are available online and in print.`,
      `<strong>Virtual games</strong> that require quick reflexes can improve your perceptual skills provided that
      you spend only a limited amount of time with greater focus.`,
      `<strong>Pay attention to detail</strong> in observing things around you and try to filter out relevant
      information`,
    ],
    2: [
      `Try <strong>solving puzzles</strong> like jigsaws with designs, letters, pictures, words, etc. and ‘spot the
      difference’ games or memory games that are available online and in print.`,
      `<strong>Play sports which require fast reaction time</strong> such as badminton, table tennis and squash
      etc.`,
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
