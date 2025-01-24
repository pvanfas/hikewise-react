import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisEmoComp({ score }) {
  const points = {
    1: [
      `You are not good at tackling frustrations, conflicts, inferiority complexes etc. and also you
    don’t have the ability to avoid emotional exhaustion such as stress, burnout and negativity of
    emotions.`,
      `You always give yourself negative feedback. You do not believe that optimism can be a
    useful asset.`,
      `You never try to manipulate the ongoing environment to your advantage by reacting
    appropriately.`,
      `You have an ‘I am never wrong’ attitude and you are an egoist. You are not good at taking the
    initiative to resume dialogue and breaking the ice in situations where both parties have stuck
    to their original stand and have refused to budge.`,
    ],
    2: [
      `You are not so good at tackling frustrations, conflicts, inferiority complexes etc. and also you
    don’t have much ability to avoid emotional exhaustion such as stress, burnout and negativity
    of emotions.`,
      `You rarely give yourself negative feedback. You believe that optimism can be a useful asset.`,
      `Most of the time, you try to manipulate the ongoing environment to your advantage by
      reacting appropriately.`,
      `You do not have an ‘I am never wrong’ attitude and you are not an egoist. You are good at
      taking the initiative to resume dialogue and breaking the ice in situations where both parties
      have stuck to their original stand and have refused to budge.`,
    ],
    3: [
      `You are good at tackling frustrations, conflicts, inferiority complexes etc. and also you have
    the ability to avoid emotional exhaustion such as stress, burnout and negativity of emotions.`,
      `You rarely give yourself negative feedback. You believe that optimism can be a useful asset.`,
      `Most of the time, you try to manipulate the ongoing environment to your advantage by
      reacting appropriately.`,
      `You do not have an ‘I am never wrong’ attitude and you are not an egoist. You are good at
      taking the initiative to resume dialogue and breaking the ice in situations where both parties
      have stuck to their original stand and have refused to budge.`,
    ],
    4: [
      `You are very good at tackling frustrations, conflicts, inferiority complexes etc. and also you
    have a high ability to avoid emotional exhaustion such as stress, burnout and negativity of
    emotions.`,
      `You never give yourself negative feedback. You believe that optimism can be a useful asset.`,
      `You will always try to manipulate the ongoing environment to your advantage by reacting
      appropriately.`,
      `You do not have an ‘I am never wrong’ attitude and you are not an egoist. You are very good
      at taking the initiative to resume dialogue and breaking the ice in situations where both
      parties have stuck to their original stand and have refused to budge.`,
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
