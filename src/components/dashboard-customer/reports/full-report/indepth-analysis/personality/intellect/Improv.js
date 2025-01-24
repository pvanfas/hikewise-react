import React from "react";
import style from "../../Common.module.scss";

import parse from "html-react-parser";

export default function ImprovIntellect({ score }) {
  const intro = {
    1: "You can improve your Intellect through the following strategies:",
    2: "You can improve your Intellect through the following strategies:",
    3: "You have a high intellect.",
  };

  const points = {
    1: [
      `<strong>Invest in self-directed, life-long learning;</strong> continually acquire new knowledge, skills and
    competencies throughout your working lives to meet the constantly changing challenges.`,
      `<strong>Stay alert; be curious</strong> about the world around you, and don't be afraid to ask some questions
      that others might consider as irrelevant.`,
      `<strong>Constantly challenge your own personal assumptions,</strong> and continually expand your habitual
      domain.`,
      `Collaborate and network with people; build and enhance your relationships, especially with
      those who are wiser and/or who demand more out of you.`,
      `<strong>Read extensively</strong>, also covering which are outside your interest domain.`,
      `<strong>Engage in novel thoughts and ideas:</strong> thirst for knowledge and an interest in new information
      may come more naturally to some than to others. However, a conscious effort to read up on new
      ideas, pay attention to sensory experiences, learn a new language, and pick up new skills can
      stimulate your intellect.`,
    ],
    2: [
      `<strong>Invest in self-directed, life-long learning;</strong> continually acquire new knowledge, skills and
    competencies throughout your working lives to meet the constantly changing challenges.`,
      `<strong>Stay alert; be curious</strong> about the world around you, and don't be afraid to ask some questions
      that others might consider as irrelevant.`,
      `<strong>Constantly challenge your own personal assumptions,</strong> and continually expand your habitual
      domain.`,
      `Collaborate and network with people; build and enhance your relationships, especially with
      those who are wiser and/or who demand more out of you.`,
      `<strong>Read extensively</strong>, also covering which are outside your interest domain.`,
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
