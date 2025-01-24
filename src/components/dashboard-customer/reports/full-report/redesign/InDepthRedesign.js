import React from "react";
import style from "./InDepthRedesign.module.scss";

import clsx from "clsx";

import Progress from "react-progressbar";
import { titleCase } from "utils/helper";

export default function InDepthPage({
  title,
  category,
  color,
  IntroComponent,
  AnalysisComponent,
  ImprovComponent,
  score,
  icons,
}) {
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
  const icon = icons.find((ic) => ic[0] === category);

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
        <IntroComponent />
      </div>

      {AnalysisComponent && (
        <div className={style.section}>
          <div className={style.sectionTitle} style={{ color: color }}>
            Critical Analysis Based on Your Score
          </div>
          <AnalysisComponent />
        </div>
      )}

      <div className={style.section}>
        <div className={style.sectionTitle} style={{ color: color }}>
          Improvement Strategies
        </div>
        <ImprovComponent />
      </div>
    </div>
  );
}
