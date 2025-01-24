import React, { useEffect, useState } from "react";
import style from "./Sidebar.module.scss";

import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";
import { useSidebarContext, useUserContext } from "contexts/AllContexts";

import LogoImg from "assets/images/logo.svg";
import AvatarImg from "assets/images/dashboard/user_avatar.png";
import { getRequest } from "utils/api";

import VendorCounsellorImg from "assets/images/dashboard/vendor/counsellor.svg";
import VendorNgoImg from "assets/images/dashboard/vendor/ngo.svg";
import VendorSchoolImg from "assets/images/dashboard/vendor/school.svg";

export default function Sidebar() {
  const SidebarContext = useSidebarContext();
  const isOpenSidebar = SidebarContext.state.isOpen;

  const UserContext = useUserContext();
  const profile = UserContext.state.profile;

  const isMobileSidebar = SidebarContext.state.isMobile;

  const navigate = useNavigate();

  const [graphic, setGraphic] = useState("");
  const [vendorProfile, setVendorProfile] = useState({});

  function handleClickLogo() {
    navigate("/");
  }

  function handleGenLicense() {
    navigate("/dashboard/vendor/license/new");
  }

  function handleLogout() {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    window.location.href = "/auth/login";
  }

  function handleVendorType() {
    getRequest(`/vendors/profile`)
      .then((resp) => {
        setVendorProfile(resp.data);
        switch (resp.data.type.toLowerCase()) {
          case "counsellor":
            setGraphic(VendorCounsellorImg);
            break;
          case "organization":
            setGraphic(VendorNgoImg);
            break;
          case "school":
          case "college":
            setGraphic(VendorSchoolImg);
            break;
          default:
            setGraphic(VendorSchoolImg);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    handleVendorType();
  }, []);

  const profileImage = vendorProfile.photo ? vendorProfile.photo : AvatarImg;

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
          {/* <div>{capitalise(profile.department)}</div> */}
        </div>
      </div>

      <div className={style.button}>
        <button onClick={handleGenLicense}>+ Generate License</button>
      </div>

      <div className={style.links}>
        <SidebarLinks />
      </div>

      <div className={style.graphic}>{graphic && <img src={graphic} alt="" />}</div>

      <div onClick={handleLogout} className={style.logout}>
        Logout
      </div>
    </div>
  );
}
