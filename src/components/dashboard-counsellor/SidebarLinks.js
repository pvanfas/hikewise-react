import React from "react";
import style from "./SidebarLinks.module.scss";

import { useLocation } from "react-router-dom";

import SidebarLink from "./SidebarLink";

import HomeIcon from "assets/images/dashboard/home.png";
import ProfileIcon from "assets/images/dashboard/profile.png";
import SessionsIcon from "assets/images/dashboard/sessions.png";

const _LINKS = [
  {
    text: "Calendar",
    link: "/dashboard/counsellor/calendar",
    icon: HomeIcon,
  },
  {
    text: "My Students",
    link: "/dashboard/counsellor/students",
    icon: ProfileIcon,
  },
  {
    text: "My Sessions",
    link: "/dashboard/counsellor/sessions",
    icon: SessionsIcon,
  },
  // { text: "Candidate Feedback", link: "/dashboard/counsellor/feedback" },
];

export default function SidebarLinks() {
  const location = useLocation();

  function isActive(link) {
    if (link === location.pathname) return true;
    return false;
  }

  return (
    <div className={style.wrapper}>
      {_LINKS.map((link) => (
        <SidebarLink
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
