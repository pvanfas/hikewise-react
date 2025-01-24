import React from "react";
import style from "./SidebarLink.module.scss";

import clsx from "clsx";

import { Link } from "react-router-dom";

export default function SidebarLink({ icon, text, link, isActive }) {
  return (
    <Link to={link} className={clsx(style.wrapper, isActive && style.active)}>
      <div className={style.icon}>
        <img src={icon} alt="nav-icon" />
      </div>
      <div className={style.text}>{text}</div>
    </Link>
  );
}
