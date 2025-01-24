import React from "react";
import style from "./Sidebar.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import SidebarLinks from "./SidebarLinks";
import { useSidebarContext, useUserContext } from "contexts/AllContexts";

import LogoImg from "assets/images/logo.svg";

export default function Sidebar() {
  const SidebarContext = useSidebarContext();
  const UserContext = useUserContext();
  const profile = UserContext.state.profile;

  const isOpenSidebar = SidebarContext.state.isOpen;
  const isMobileSidebar = SidebarContext.state.isMobile;

  function toggleSidebar() {
    SidebarContext.dispatch({ type: "TOGGLE_SIDEBAR" });
  }

  const navigate = useNavigate();
  function handleClickLogo() {
    navigate("/");
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  }

  function getDeptName(dept) {
    let arrWords = dept.split("_");
    arrWords = arrWords.map((word) => capitalise(word));
    return arrWords.join(" ");
  }

  function capitalise(word) {
    if (!word) return "";
    let newWord = "";
    newWord += word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
      newWord += word.charAt(i).toLowerCase();
    }

    return newWord;
  }

  return (
    <div className={clsx(style.wrapper, isOpenSidebar ? style.open : style.closed)}>
      {isMobileSidebar && (
        <div className={clsx(style.logo)} onClick={handleClickLogo}>
          <img src={LogoImg} alt="" />
        </div>
      )}

      <div className={style.profile}>
        <div className={style.image}>
          <img src={profile.photo} alt="profile_img" />
        </div>
        {profile.department && (
          <div className={style.details}>
            <div>{profile.fullname}</div>
            <div>{getDeptName(profile.department)}</div>
          </div>
        )}
      </div>

      <div className={style.links}>
        <SidebarLinks isMobileSidebar={isMobileSidebar} toggleSidebar={toggleSidebar} />
      </div>

      <div onClick={handleLogout} className={style.logout}>
        Logout
      </div>
    </div>
  );
}
