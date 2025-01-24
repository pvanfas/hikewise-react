import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovSpatApti({ score }) {
  const intro = {
    1: "You can try and improve your Spatial Aptitude through the following strategies:",
    2: "You can try to improve your Spatial Aptitude through the following strategies:",
    3: "You have a high spatial aptitude",
  };

  const points = {
    1: [
      `Try <strong>navigating</strong> to small distances without the use of maps. Try to construct the routes and
      directions in your head.`,
      `<strong>Practice assembling and making things</strong>: you could build models or assemble jigsaw
      puzzles. Three-dimensional puzzles provide very good practice in imagining how complex
      parts fit together.`,
      `Try <strong>solving Rubik's cube</strong> (considered the perfect brain training), or learning strategy games
      that involve moving pieces, like checkers and chess.`,
    ],
    2: [
      `Try navigating to small distances without <strong>the use of maps</strong>. Try to construct the routes and
      directions in your head.`,
      `<strong>Practice assembling and making things:<strong/> you could build models or assemble objects.
      Three-dimensional puzzles provide very good practice in imagining how complex parts fit
      together.`,
      `Try <strong>Solving Rubik’s cube</strong> (considered the perfect brain training), or learning strategy games
      that involve moving pieces, like checkers and chess.`,
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
