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
      `You should learn to be in a position to respond to stimuli of low intensity. What, for instance,
   triggered a particular emotion? What was the feeling behind a specific action? These are
   questions that you ought to ask yourselves to understand the intensity of emotions better.`,
      `You should be able to distinguish between what others do or say, and your own personal
   reactions and judgements. You must try to understand both the pain and joy of others so that
   you should be able to intuitively sense what the other person is going through. You should
   try to develop compassion for those you come across which will make you a great friend to
   have.`,
      `You should improve your interpersonal relations. Developing quality inter‐relationships has a
   positive effect on all the parties. Positive interpersonal relations are a sure sign of success.
   The key to good interpersonal relations is to believe in the basic elements of trust,
   confidence and reliance.`,
      `You should try to become a cheerful person who communicates a message of confidence and
   self‐respect. You should learn how to communicate emotions through verbal and non‐verbal
   mediums.`,
    ],
    2: [
      `You should learn to be in a position to respond to stimuli of low intensity. What, for instance,
    triggered a particular emotion? What was the feeling behind a specific action? These are
    questions that you ought to ask yourselves to understand the intensity of emotions better.`,
      `You should be able to distinguish between what others do or say, and your own personal
    reactions and judgements. You must try to understand both the pain and joy of others so that
    you should be able to intuitively sense what the other person is going through. You should
    try to develop compassion for those you come across which will make you a great friend to
    have.`,
      `You should improve your interpersonal relations. Developing quality inter‐relationships has a
    positive effect on all the parties. Positive interpersonal relations are a sure sign of success.
    The key to good interpersonal relations is to believe in the basic elements of trust,
    confidence and reliance.`,
      `You should try to become a cheerful person who communicates a message of confidence and
    self‐respect. You should learn how to communicate emotions through verbal and non‐verbal
    mediums.`,
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
