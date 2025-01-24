import React from "react";
import styles from "./WithPadding.module.scss";

import clsx from "clsx";

export default function WithPadding({ children, className, id, style }) {
  return (
    <div id={id} className={clsx(styles.wrapper, className)} style={style ? style : {}}>
      {children}
    </div>
  );
}
