import React from "react";
import style from "./Sidebar.module.scss";

import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { PlusCircle } from "react-feather";

import SidebarLinks from "./SidebarLinks";
import { useSidebarContext, useAppContext, useUserContext } from "contexts/AllContexts";

import LogoImg from "assets/images/logo.svg";
import AvatarImg from "assets/images/dashboard/user_avatar.png";

export default function Sidebar() {
  const SidebarContext = useSidebarContext();
  const isOpenSidebar = SidebarContext.state.isOpen;

  const UserContext = useUserContext();
  const profile = UserContext.state.profile;
  const AppContext = useAppContext();

  const isMobileSidebar = SidebarContext.state.isMobile;

  function handleClickCreateSlot() {
    AppContext.dispatch({
      type: "SET_IS_OPEN_CREATE_SLOT_MODAL",
      payload: { isOpen: true },
    });
  }

  function handleClickUpdateMeet() {
    AppContext.dispatch({
      type: "SET_IS_OPEN_UPDATE_MEET_MODAL",
      payload: { isOpen: true },
    });
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  }

  const navigate = useNavigate();
  function handleClickLogo() {
    navigate("/");
  }

  function handleClickOpenMeet() {
    window.open(UserContext.state.profile.meet_link);
  }

  const profileImage = UserContext.state.profile.photo ? UserContext.state.profile.photo : AvatarImg;

  return (
    <div className={clsx(style.wrapper, isOpenSidebar ? style.open : style.closed)}>
      {isMobileSidebar && (
        <div className={clsx(style.logo)} onClick={handleClickLogo}>
          <img src={LogoImg} alt="" />
        </div>
      )}

      <div className={style.profile}>
        <div className={style.image}>
          <img src={profileImage} alt="profile_img" />
        </div>
        <div className={style.details}>
          <div>{profile.fullname}</div>
        </div>
      </div>

      <div className={style.button}>
        <button onClick={handleClickCreateSlot}>
          <PlusCircle size={18} /> Create Slot
        </button>
      </div>

      <div className={style.buttonLight}>
        <button onClick={handleClickUpdateMeet}>Update Meet Link</button>
      </div>

      <div className={style.buttonGreen}>
        <button onClick={handleClickOpenMeet}>Open Meet</button>
      </div>

      <div className={style.links}>
        <SidebarLinks />
      </div>

      <div onClick={handleLogout} className={style.logout}>
        Logout
      </div>
    </div>
  );
}
