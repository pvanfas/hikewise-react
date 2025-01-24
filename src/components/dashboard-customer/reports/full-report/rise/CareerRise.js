import React from "react";
import style from "../common/Career.module.scss";

import clsx from "clsx";

export default function CareerRise({ data }) {
  const name = data[0];
  const content = data[3];

  return (
    <div className={style.wrapper}>
      <div className={style.title}>{name}</div>

      <div className={clsx(style.para, style.desc)}>{content.desc}</div>

      <div className={style.title}>Opportunities</div>

      <div className={style.para}>{content.opp}</div>
    </div>
  );
}
