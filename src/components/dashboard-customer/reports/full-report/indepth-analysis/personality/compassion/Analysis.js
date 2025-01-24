import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisCompassion({ score }) {
  const points = {
    1: [
      `You often see others as selfish, devious, and potentially dangerous as you may not trust
    people and things at face value`,
      `You may not be particularly interested in social causes. Requests for help feel like an
    imposition rather than an opportunity for self-fulfillment.`,
      `You are not strongly affected by human suffering. You pride yourself on making objective
    judgments based on reason. You are more concerned with truth and impartial justice than
    with mercy.`,
    ],
    2: [
      `You are disposed to believe that others are honest and well-intentioned. But sometimes you
    tend to be cynical and skeptical and assume that others may be dishonest or dangerous.`,
      `You have a reasonable concern for others' welfare and a willingness to assist others in need
    .However usually , you are reluctant to get involved in the problems of others at the expense
    yourself`,
      `You are usually moved by others' needs and emphasize the human side of social policies. But
    in some situations, you are more non sentimental and less moved by sympathetic appeals to
    pity. Sometimes you consider yourselves as a realist who makes rational decisions based on
    logic.`,
    ],
    3: [
      `You tend to benevolently interpret the intentions of people with the assumption that most
    people are fair, honest.`,
      `You find helping other people genuinely rewarding and see things in a humane way.
    Consequently, you are generally willing to assist those who are in need. You find that doing
    things for others is a form of self-fulfillment rather than self-sacrifice.`,
      `You are tenderhearted and compassionate. You feel the pain of others vicariously and are
    easily moved to pity.`,
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
