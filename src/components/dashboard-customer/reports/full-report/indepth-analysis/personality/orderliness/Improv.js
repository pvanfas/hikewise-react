import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovOrderliness({ score }) {
  const intro = {
    1: "You can practice Orderliness through the following strategies:",
    2: "You can practice Orderliness through the following strategies:",
    3: "You are highly orderly.",
  };

  const points = {
    1: [
      `<strong>Arrange the space around you</strong> in the way you like, keep it orderly and attractive. Order
    around you creates order inside you.`,
      `<strong>Make step by step plans and follow them:</strong> Break down problems into small parts and
    handle them one at a time. Make use of flow charts and to do lists.`,
      `<strong>Stick to your daily work plan:</strong> By regulating your sleep pattern and food habits. Being
    punctual will give you more time in hand. Repeated practice will make being orderly will
    make it more instinctive.`,
    ],
    2: [
      `<strong>Make step by step plans and follow them:</strong> Break down problems into small parts and
    handle them one at a time. Make use of flow charts and to do lists.`,
      `<strong>Stick to your daily work plan:</strong> By maintaining your sleep pattern and food habits. Being
      punctual will give you more time in hand. Repeated practice will make being orderly will
      make it more instinctive.`,
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
