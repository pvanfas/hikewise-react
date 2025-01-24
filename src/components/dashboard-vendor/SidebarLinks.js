import React from "react";
import style from "./SidebarLinks.module.scss";

import { useLocation } from "react-router-dom";

import SidebarLink from "./SidebarLink";

import HomeIcon from "assets/images/dashboard/home.png";

const _LINKS = [
  { text: "Dashboard", link: "/dashboard/vendor/home", icon: HomeIcon },
  { text: "Licenses", link: "/dashboard/vendor/licenses", icon: HomeIcon },
  { text: "Orders", link: "/dashboard/vendor/orders", icon: HomeIcon },
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
