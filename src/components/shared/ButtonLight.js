import clsx from "clsx";
import React from "react";
import style from "./ButtonLight.module.scss";

export default function ButtonLight({ options, children, className, id, onClick, disabled }) {
  function getStyle(width = "100px", height = "35px", radius = "2px", pointerEvents = "default") {
    return { width, height, borderRadius: radius, pointerEvents };
  }

  return (
    <button
      onClick={onClick}
      id={id}
      className={clsx(style.wrapper, className)}
      style={getStyle(options.width, options.height, options.radius, options.pointerEvents)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
