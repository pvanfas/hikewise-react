import React, { useEffect } from "react";
import style from "./Container.module.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import clsx from "clsx";

import DashNav from "./DashNav";
import Sidebar from "./Sidebar";

import Home from "./Home";
import Licenses from "./Licenses";
import Orders from "./Orders";
import GenLicense from "./GenLicense";
import Student from "./student-details/Student";

import { useSidebarContext } from "contexts/AllContexts";
import StudentDetails from "./student-details/StudentDetails";

export default function Container() {
  const SidebarContext = useSidebarContext();
  const sidebarIsOpen = SidebarContext.state.isOpen;

  function resizeHandler() {
    const width = window.innerWidth;
    if (width < 1150) {
      if (!SidebarContext.state.isMobile) {
        SidebarContext.dispatch({ type: "CLOSE_SIDEBAR" });
      }
      SidebarContext.dispatch({ type: "SET_IS_MOBILE", payload: { isMobile: true } });
    } else {
      if (SidebarContext.state.isMobile) {
        SidebarContext.dispatch({ type: "OPEN_SIDEBAR" });
      }
      SidebarContext.dispatch({ type: "SET_IS_MOBILE", payload: { isMobile: false } });
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

      <div className={clsx(style.main, sidebarIsOpen ? style.sidebarOpen : style.sidebarClosed)}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/students" element={<StudentDetails />} />
          <Route path="/candidate/:accessKey" element={<Student />} />
          <Route path="/license/new" element={<GenLicense />} />

          <Route index element={<Navigate to="/dashboard/vendor/home" />} />
        </Routes>
      </div>
    </div>
  );
}
