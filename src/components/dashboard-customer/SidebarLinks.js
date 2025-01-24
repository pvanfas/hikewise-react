import React from "react";
import style from "./SidebarLinks.module.scss";

import { useLocation } from "react-router-dom";

import SidebarLink from "./SidebarLink";

import HomeIcon from "assets/images/dashboard/home.png";
import ProfileIcon from "assets/images/dashboard/profile.png";
import ReportsIcon from "assets/images/dashboard/reports.png";
import SessionsIcon from "assets/images/dashboard/sessions.png";
import TestsIcon from "assets/images/dashboard/tests.png";
import PackagesIcon from "assets/images/dashboard/packages.svg";

const _LINKS = [
  {
    text: "Dashboard",
    link: "/dashboard/candidate/home",
    icon: HomeIcon,
  },
  { text: "My Profile", link: "/dashboard/candidate/profile", icon: ProfileIcon },
  { text: "My Packages", link: "/dashboard/candidate/plans", icon: PackagesIcon },
  { text: "My Assessment", link: "/dashboard/candidate/assessment", icon: TestsIcon },
  { text: "My Report", link: "/dashboard/candidate/reports", icon: ReportsIcon },
  { text: "My Sessions", link: "/dashboard/candidate/sessions", icon: SessionsIcon },
];

export default function SidebarLinks({ isMobileSidebar, toggleSidebar }) {
  const location = useLocation();

  function isActive(link) {
    if (link === location.pathname) return true;
    return false;
  }

  return (
    <div className={style.wrapper}>
      {_LINKS.map((link) => (
        <SidebarLink
          toggleSidebar={toggleSidebar}
          isMobileSidebar={isMobileSidebar}
          isActive={isActive(link.link)}
          key={link.text}
          text={link.text}
          link={link.link}
          icon={link.icon}
        />
      ))}
    </div>
  );
}
