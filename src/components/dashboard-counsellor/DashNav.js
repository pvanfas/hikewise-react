import React from "react";
import style from "./DashNav.module.scss";

import clsx from "clsx";
import { Menu } from "react-feather";
import { useNavigate } from "react-router-dom";

import { useSidebarContext } from "contexts/AllContexts";
import LogoImg from "assets/images/logo.svg";

export default function DashNav() {
  const SidebarContext = useSidebarContext();

  const sidebarIsOpen = SidebarContext.state.isOpen;
  const sidebarIsMobile = SidebarContext.state.isMobile;

  const navigate = useNavigate();

  function toggleSidebar() {
    SidebarContext.dispatch({ type: "TOGGLE_SIDEBAR" });
  }

  function handleClickLogo() {
    navigate("/");
  }

  return (
    <div className={clsx(style.wrapper)}>
      <div className={style.logo} onClick={handleClickLogo}>
        <img src={LogoImg} alt="" />
      </div>

      <button className={clsx(style.ham, sidebarIsMobile && style.mobile)} onClick={toggleSidebar}>
        <Menu size={15} /> {sidebarIsOpen ? "Hide" : "Show"} Menu
      </button>
    </div>
  );
}
