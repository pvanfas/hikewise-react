import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisVerbalAptitude({ score }) {
  const points = {
    1: [
      "Your command over language is not up to the mark. While you will be able to formulate arguments in a fairly logical manner, you may face difficulty understanding the finer points of complex arguments.",
      "You may find it difficult to understand new ideas, and explain them coherently to others.",
      "Tasks that require the understanding of complex verbal relationships and skill in manipulating verbal concepts can turn out to be tough for you.",
    ],
    2: [
      "Your communication skills are good. You can understand others’ views and articulate your own points to an extent.",
      "You have a reasonable ability to find the right words to explain ideas and to interpret written and spoken instructions.",
      "You are fairly good at grasping new verbal concepts and learning new languages.",
    ],
    3: [
      "You are excellent at communication. You can comprehend others’ views very well and articulate your own points, easily framing supporting arguments.",
      "You have a very high ability to find the right words to explain ideas and to interpret written and spoken instructions.",
      "You are likely to be very quick at grasping new verbal concepts and learning new languages.",
      "You are highly effective at integrating relevant information from diverse perspectives, recognizing subtle relationships among apparently different concepts or ideas.",
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
