import React from "react";
import style from "./InDepthRise.module.scss";

import clsx from "clsx";
import Progress from "react-progressbar";
import parse from "html-react-parser";

import DataJson from "../indepth-analysis/_Rise.json";
import { titleCase } from "utils/helper";

export default function InDepthAnalysis({ title, category, color, score, icons }) {
  const data = DataJson[titleCase(category)];
  const icon = icons.find((ic) => ic[0] === category);

  function getScoreTitle() {
    switch (score) {
      case 1:
        return "Low";
      case 2:
        return "Moderate";
      case 3:
        return "High";
      default:
        return "";
    }
  }

  const percent = score === 1 ? 1 / 3 : score === 2 ? 2 / 3 : 3 / 3;

  return (
    <div className={style.wrapper}>
      <div className={style.title} style={{ color: color }}>
        In Depth Analysis of Your {title}
      </div>

      <div className={style.category}>
        <div className={clsx(style.top, style[title])}>
          <div className={style.left} style={{ background: color }}>
            <img src={icon[1]} alt="" />
          </div>
          <div className={style.right}>
            <div className={style.wordValue}>{getScoreTitle()}</div>
            <div className={style.name} style={{ color }}>
              {titleCase(category)}
            </div>
          </div>
        </div>
        <div className={style.progress}>
          <Progress id={title} completed={percent * 100} />
        </div>
      </div>

      <div className={style.section}>
        <div className={style.sectionTitle} style={{ color: color }}>
          What does it mean ?
        </div>
        <div className={style.intro}>
          {data.intro.points.map((point, index) => (
            <p key={index}>{parse(point)}</p>
          ))}
        </div>
      </div>

      <div className={style.section}>
        <div className={style.sectionTitle} style={{ color: color }}>
          Critical Analysis Based on Your Score
        </div>
        <div className={style.analysis}>
          <ul>
            {data.critical_analysis[score].map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={style.section}>
        <div className={style.sectionTitle} style={{ color: color }}>
          Improvement Strategies
        </div>
        <div className={style.improv}>
          <div className={style.introText}>{data.improvement_strats.intro[score]}</div>
          <ul>
            {data.improvement_strats.points[score].map((point, index) => (
              <li key={index}>{parse(point)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
