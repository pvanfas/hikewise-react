import React from "react";
import style from "../common/Career.module.scss";

import clsx from "clsx";

export default function CareerRedesign({ name, img, data }) {
  const content = data;

  return (
    <div className={style.wrapper}>
      <div className={style.image}>
        <img src={img} alt="" />
      </div>

      <div className={style.title}>{name}</div>

      <div className={clsx(style.para, style.desc)}>{content.desc}</div>

      <div className={style.title}>Opportunities</div>

      <div className={style.para}>{content.opp}</div>
    </div>
  );
}
