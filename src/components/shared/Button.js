import clsx from "clsx";
import React from "react";
import style from "./Button.module.scss";

export default function Button({ options, children, className, id, onClick, ...props }) {
  function getStyle(width = "100px", height = "35px", radius = "5px") {
    return { width, height, borderRadius: radius };
  }

  const type = props.submit ? "submit" : "button";
  const isDisabled = props.disabled ? true : false;

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(style.wrapper, className)}
      id={id}
      style={getStyle(options.width, options.height, options.radius)}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
