import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovStressTol({ score }) {
  const intro = {
    1: "You can improve your Stress Tolerance through the following strategies:",
    2: "You can improve your Stress Tolerance through the following strategies:",
    3: "Your stress tolerance is high.",
  };

  const points = {
    1: [
      `<strong>Recognize your stress and name it:</strong> Ignoring your stress doesn’t improve your tolerance to it.
       But paying attention to it and putting it into words does.`,
      `<strong>Change your position or your perspective:</strong> You may not be able to change or control
       external circumstances causing your stress, but you can take other actions, like changing
       your position, your role, or your perspective.`,
      `<strong>Learn to understand the importance of positive stress:</strong> Getting afraid about your stress
       increases the stress. But if you think that stress is a natural or even helpful response, then
       you can manage it in a better way.`,
      `<strong>Check in with your values:</strong> One of the causes for internal stress is going against your values
       or what you want. It’s worth figuring out what you really value if you want to better manage
       your stress.`,
      `<strong>Allow yourself recovery time:</strong> When a stressful situation comes your way, especially one
       involving a big loss or change, be sure to allow yourself time to recover.`,
      `<strong>Get support:</strong> Experts agree that one of the key factors in how well we handle stress is
       whether we have support when we are stressed.`,
    ],
    2: [
      `<strong>Recognize your stress and name it:</strong> Ignoring your stress doesn’t improve your tolerance to it.
    But paying attention to it and putting it into words does.`,
      `<strong>Change your position or your perspective:</strong> You may not be able to change or control
    external circumstances causing your stress, but you can take other actions, like changing
    your position, your role, or your perspective.`,
      `<strong>Learn to understand the importance of positive stress:</strong> Getting afraid about your stress
    increases the stress. But if you think that stress is a natural or even helpful response, then
    you can manage it in a better way.`,
      `<strong>Allow yourself recovery time:</strong> When a stressful situation comes your way, especially one
    involving a big loss or change, be sure to allow yourself time to recover.`,
      `<strong>Get support:</strong> Experts agree that one of the key factors in how well we handle stress is
    whether we have support when we are stressed.`,
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
