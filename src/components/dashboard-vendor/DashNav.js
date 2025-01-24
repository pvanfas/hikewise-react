import React from "react";
import style from "./DashNav.module.scss";

import clsx from "clsx";
import { Menu } from "react-feather";
import { useNavigate } from "react-router-dom";

import { useSidebarContext, useUserContext, SidebarContext } from "contexts/AllContexts";
import LogoImg from "assets/images/logo.svg";

export default function DashNav() {
  const SidebarContext = useSidebarContext();
  const UserContext = useUserContext();

  const sidebarIsOpen = SidebarContext.state.isOpen;
  const sidebarIsMobile = SidebarContext.state.isMobile;
  const profile = UserContext.state.profile;

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  }

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

      {/* {profile.first_name && (
        <div className={style.userController}>
          <div className={style.image}></div>
          <div className={style.controller}>
            <div className={style.name}>{profile.first_name}</div>
            <div className={style.logout} onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
