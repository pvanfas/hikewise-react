import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisIndustriousness({ score }) {
  const points = {
    1: [
      `You tend to feel ineffective, and may have a sense that you are not in control of your lives.`,
      `You may be content to get by with a minimal amount of work, and might be seen by others
      as lazy.`,
      `You may be involved in procrastination and show poor follow-through, often failing to
      complete tasks-even tasks you want very much to complete.`,
      `You may find it difficult to set Goals and accomplish them.`,
    ],
    2: [
      `Although you are generally well-prepared to deal with life. But sometimes, you have a poor
    opinion of your abilities and admit that you are often under prepared and inept.`,
      `More often than not you have high aspiration levels and motivation to achieve your goals.
    However, sometimes you may feel lazy, aimless and complacent.`,
      `Most of the time you are able to begin tasks and carry them through to completion most of
    the time, but at times when you are bored and distracted you will struggle to carry them
    through. Usually, you can motivate yourselves to get the job done.`,
    ],
    3: [
      `You tend to set extremely high standards for yourself and you are highly driven to keep up
    with it.`,
      `You strive hard to achieve excellence. Your drive to be recognized as successful keeps you on
    track toward your challenging goals.`,
      `You are able to overcome reluctance to begin tasks and stay on track despite distractions.`,
    ],
  };
  return (
    <div className={style.wrapper}>
      <div className={style.analysis}>
        <ul>
          {points[score].map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
