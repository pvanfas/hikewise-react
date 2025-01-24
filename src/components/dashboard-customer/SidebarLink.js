import React from "react";
import style from "./SidebarLink.module.scss";

import { useNavigate } from "react-router";

import clsx from "clsx";

export default function SidebarLink({ icon, text, link, isActive, toggleSidebar, isMobileSidebar }) {
  const navigate = useNavigate();

  function handleClickLink() {
    navigate(link);

    if (isMobileSidebar) toggleSidebar();
  }
  return (
    <div onClick={handleClickLink} className={clsx(style.wrapper, isActive && style.active)}>
      <div className={style.icon}>
        <img src={icon} alt="nav-icon" />
      </div>
      <div className={style.text}>{text}</div>
    </div>
  );
}
