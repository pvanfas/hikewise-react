import React from "react";
import style from "../../Common.module.scss";

export default function AnalysisAbsReason({ score }) {
  const points = {
    1: [
      "You may find it difficult to draw accurate conclusions from the available information and solve problems on a complex, thought-based level.",
      "Working with new concepts, recognizing patterns and similarities among things may not come naturally to you.",
      "You are not likely to be oriented towards combining pieces of relevant information from diverse perspectives and integrating verbal and non-verbal ideas.",
    ],
    2: [
      "To an extent you are capable of analyzing information and solving problems, although not on a complex, thought-based level",
      "You may be fairly good at working with new concepts and ideas and recognizing relationships among things",
      "You are likely to be reasonably good at integrating pieces of relevant information from diverse perspectives and dealing with non-verbal problems.",
    ],
    3: [
      "You hold great ability to analyze information and solve problems on a complex,thought-based level.",
      "You are proficient at working with new concepts, abstract ideas and recognizing patterns and similarities between them.",
      `You are likely to be very good at identifying non-obvious causes of problems and drawing accurate conclusions from the available information.`,
      `You demonstrate high ability in developing insight into non-verbal problems and integrating pieces of relevant information from diverse perspectives.`,
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
