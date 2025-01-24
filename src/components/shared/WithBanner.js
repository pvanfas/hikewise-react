import clsx from "clsx";
import React from "react";
import style from "./WithBanner.module.scss";

export default function WithBanner({ className, children }) {
  return <div className={clsx(style.wrapper, className)}>{children}</div>;
}
