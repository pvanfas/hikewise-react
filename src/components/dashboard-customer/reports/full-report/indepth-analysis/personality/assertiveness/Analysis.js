import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisAssert({ score }) {
  const points = {
    1: [
      `You tend not to talk much and let others control the activities of groups that you are part of.
    You might prefer taking the backseat instead of taking the leadership role.`,
      `You may like to follow a slow, leisurely and relaxed pace in life.`,
      `You are overwhelmed by noise and commotion and tend to avoid thrill-seeking.`,
    ],
    2: [
      `Usually, you speak without hesitation and like to lead a group, but at times you prefer to
    keep in the background and let others do the talking.`,
      `Generally, you like to lead a fast-paced life. Though you are not necessarily sluggish or lazy,
    you have your moments of being leisurely and relaxed in tempo,`,
      `You seek excitement and stimulation most of the time. You might like bright colors and loud
    environments. At times you become averse to thrill seeking if it no longer excites you.`,
    ],
    3: [
      `You like to speak out, take charge, and direct the activities of others. You tend to be the
    leader in groups that you are part of.`,
      `You might like to lead a fast-paced, busy life. You move about quickly, energetically, and
    vigorously, and you are likely to be involved in multiple activities.`,
      `You are easily bored when the levels of simulation are not high. You may enjoy taking risks
    and seeking thrillful activities.`,
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
