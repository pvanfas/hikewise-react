import React from "react";
import style from "./SectionTitle.module.scss";

import clsx from "clsx";
import WithPadding from "./WithPadding";

export default function SectionTitle({ children, className }) {
  return (
    <WithPadding className={clsx(style.wrapper, className)}>
      {children}
    </WithPadding>
  );
}
