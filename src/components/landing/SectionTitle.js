import React from "react";
import style from "./SectionTitle.module.scss";

export default function SectionTitle({ children }) {
  return <div className={style.wrapper}>{children}</div>;
}
