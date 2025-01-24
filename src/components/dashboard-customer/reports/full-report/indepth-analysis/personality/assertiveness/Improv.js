import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovAssert({ score }) {
  const intro = {
    1: "You can improve your Assertiveness through the following strategies:",
    2: "You can improve your Assertiveness through the following strategies:",
    3: "You are highly assertive.",
  };

  const points = {
    1: [
      `<strong>Make the decision to positively assert yourself:</strong> Commit to being assertive rather than being
       passive or aggressive and start practicing this.`,
      `<strong>Aim for open communication:</strong> Be honest and tell others how you feel or what you want without
       making accusations or making them feel guilty. Remember to respect other people when you are
       sharing your feelings, wants, needs, beliefs or opinions.`,
      `<strong>Listen actively:</strong> Try to understand the other person’s point of view and don’t interrupt when they
       are explaining it to you.`,
      `<strong>Agree to disagree:</strong> Remember that having a different point of view doesn’t mean you are right
       and the other person is wrong`,
      `<strong>Practice assertiveness:</strong> Talk in an assertive way in front of a mirror or with a friend. Pay attention
      to your body language as well as to the words you say.`,
      `<strong>Use assertive phrases without being aggressive:</strong> Stick with statements that include ‘I’ in them
      such as ‘I think’ or ‘I feel’. Don’t use aggressive language such as ‘you always’ or ‘you never’.`,
    ],
    2: [
      `<strong>Make the decision to positively assert yourself:</strong> Commit to being assertive rather than being
      passive or aggressive and start practicing this.`,
      `<strong>Aim for open and honest communication:</strong> Remember to respect other people when you are
      sharing your feelings, wants, needs, beliefs or opinions.`,
      `<strong>Agree to disagree:</strong> Remember that having a different point of view doesn’t mean you are right
      and the other person is wrong.`,
      `<strong>Practice assertiveness:</strong> Talk in an assertive way in front of a mirror or with a friend. Pay attention
      to your body language as well as to the words you say. <strong>Use assertive phrases without being
      aggressive:</strong> Stick with statements that include ‘I’ in them such as ‘I think’ or ‘I feel’. Don’t use
      aggressive language such as ‘you always’ or ‘you never’.`,
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
