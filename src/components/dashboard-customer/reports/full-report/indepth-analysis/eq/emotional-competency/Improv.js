import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovAssert({ score }) {
  const intro = {
    1: "You can improve your Emotional Competency through the following strategies:",
    2: "You can improve your Emotional Competency through the following strategies:",
    3: "You have scored satisfactorily in this trait.",
    4: "You have scored well in this trait.",
  };

  const points = {
    1: [
      `You should find ways to deal with anger, fear, anxiety and sadness, since dealing with these
       are essential signs of emotional competency.`,
      `You should learn how to manage yourself when you are upset. Being able to channelize
       emotions to a positive end is a key skill to raise your EQ.`,
      `You should learn to be optimistic to boost your self‐esteem. High self‐esteem gives a person
       realistic confidence to perceive challenges as learning opportunities. As a result, one
       constantly grows and improves. High self‐esteem is the greatest gift a person can give to
       himself. You should learn to acquire high self‐esteem which is reflected in the feelings of
       confidence and competence.`,
      `Tackling ego problems without hurting one’s self‐esteem is the key to success. An ‘I am
       never wrong’ attitude may be harmful in many situations. One should not be an egoist. It is
       the root cause of problems in interpersonal relations.`,
    ],
    2: [
      `You should find ways to deal with anger, fear, anxiety and sadness, since dealing with these
      are essential signs of emotional competency.`,
      `You should learn how to manage yourself when you are upset. Being able to channelize
      emotions to a positive end is a key skill to raise your EQ.`,
      `You should learn to be optimistic to boost your self‐esteem. High self‐esteem gives a person
      realistic confidence to perceive challenges as learning opportunities. As a result, one
      constantly grows and improves. High self‐esteem is the greatest gift a person can give to
      himself. You should learn to acquire high self‐esteem which is reflected in the feelings of
      confidence and competence.`,
      `Tackling ego problems without hurting one’s self‐esteem is the key to success. An ‘I am
      never wrong’ attitude may be harmful in many situations. One should not be an egoist. It is
      the root cause of problems in interpersonal relations.`,
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
