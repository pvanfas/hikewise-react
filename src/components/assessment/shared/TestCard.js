import React from "react";
import style from "./TestCard.module.scss";

import clsx from "clsx";

export default function TestCard({ title, children, className }) {
  return (
    <div className={clsx(style.wrapper, className)}>
      <div className={style.banner}>
        {title.split(" ").map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
      {children}
    </div>
  );
}
