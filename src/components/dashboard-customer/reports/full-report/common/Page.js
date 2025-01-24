import clsx from "clsx";
import React from "react";
import style from "./Page.module.scss";

export default function Page({ children, className }) {
  return <div className={clsx(style.wrapper, className)}>{children}</div>;
}
