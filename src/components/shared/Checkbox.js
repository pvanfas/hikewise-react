import React from "react";
import style from "./Checkbox.module.scss";

export default function Checkbox({ name, label, fontColor, radius, value }) {
  return (
    <label className={style.wrapper} style={{ color: fontColor }}>
      <span className={style.label}>{label}</span>
      <input name={name ? name : ""} type="checkbox" value={true} />
      <span className={style.checkmark} style={radius ? { borderRadius: radius } : {}}></span>
    </label>
  );
}
