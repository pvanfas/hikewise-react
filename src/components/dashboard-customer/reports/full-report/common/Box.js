import React from "react";
import style from "./Box.module.scss";

import clsx from "clsx";

export default function Box({ data, title, className, options }) {
  return (
    <div
      className={clsx(style.wrapper, className)}
      style={{
        backgroundColor: options.background,
        width: options.size === "half" ? "300px" : options.size === "medium" ? "450px" : "678px",
        height: options.size === "half" ? "280px" : options.size === "medium" ? "180px" : "120px",
      }}
    >
      {title && <div className={style.boxTitle}>{title}</div>}

      <div className={style.traits}>
        {data.map((item) => {
          return (
            <div
              className={clsx(
                style.trait,
                options.size === "full" && style.full,
                options.size === "medium" && style.medium
              )}
              key={item[0]}
            >
              <span className={style.traitText}>{item[0]}</span>
              <span className={style.icon}>
                <img style={{ width: "35px", height: "35px" }} src={item[1]} alt="" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
