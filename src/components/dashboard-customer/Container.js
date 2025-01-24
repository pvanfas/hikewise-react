import React, { useEffect } from "react";
import style from "./Container.module.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import clsx from "clsx";

import DashNav from "./DashNav";
import Sidebar from "./Sidebar";
import DashHome from "./DashHome";
import MyTest from "./MyTest";

import { useSidebarContext } from "contexts/AllContexts";
import MyReports from "./reports/MyReports";
import MySessions from "./sessions/MySessions";
import Plans from "./Plans";
import Profile from "./profile/Profile";

export default function Container() {
  const SidebarContext = useSidebarContext();
  const sidebarIsOpen = SidebarContext.state.isOpen;

  function resizeHandler() {
    const width = window.innerWidth;
    if (width < 1150) {
      if (!SidebarContext.state.isMobile) {
        SidebarContext.dispatch({ type: "CLOSE_SIDEBAR" });
      }
      SidebarContext.dispatch({
        type: "SET_IS_MOBILE",
        payload: { isMobile: true },
      });
    } else {
      if (SidebarContext.state.isMobile) {
        SidebarContext.dispatch({ type: "OPEN_SIDEBAR" });
      }
      SidebarContext.dispatch({
        type: "SET_IS_MOBILE",
        payload: { isMobile: false },
      });
    }
  }

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className={style.wrapper}>
      <DashNav />
      <Sidebar />

      <div
        className={clsx(
          style.main,
          sidebarIsOpen ? style.sidebarOpen : style.sidebarClosed
        )}
      >
        <Routes>
          <Route path="/home" element={<DashHome />} />
          <Route path="/reports" element={<MyReports />} />
          <Route path="/assessment" element={<MyTest />} />
          <Route path="/sessions" element={<MySessions />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/profile" element={<Profile />} />

          <Route index element={<Navigate to="home" />} />
        </Routes>
      </div>
    </div>
  );
}
