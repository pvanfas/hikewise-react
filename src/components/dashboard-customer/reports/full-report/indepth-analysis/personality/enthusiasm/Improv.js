import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovEnthu({ score }) {
  const intro = {
    1: "You can improve your Enthusiasm through the following strategies:",
    2: "You can improve your Enthusiasm through the following strategies:",
    3: "You are highly enthusiastic",
  };

  const points = {
    1: [
      `<strong>Find what interests you:</strong> Develop a love for learning. Ask a lot of questions and do plenty of
      exploration.`,
      `<strong>Focus on the good:</strong> Look for the opportunities that difficulties offer. Focus on what you can
      do instead of what you can’t. If you focus too much on the negative, it can zap you of your
      creativity, energy, and productivity.`,
      `<strong>Hang around with enthusiastic people:</strong> Enthusiasm is contagious. The more you can find
      ways to connect with and develop relationships with enthusiastic people, the more
      excitement will “rub off” on you, inspiring you to want to do more.`,
    ],
    2: [
      `<strong>Find what interests you:</strong> Develop a love for learning. Ask a lot of questions and do plenty of
    exploration.`,
      `<strong>Hang around with enthusiastic people:</strong> Enthusiasm is contagious. The more you can find
    ways to connect with and develop relationships with enthusiastic people, the more
    excitement will “rub off” on you, inspiring you to want to do more.`,
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
