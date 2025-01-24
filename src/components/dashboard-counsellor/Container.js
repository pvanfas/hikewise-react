import React, { useEffect } from "react";
import style from "./Container.module.scss";

import { Routes, Route, Navigate } from "react-router-dom";
import clsx from "clsx";

import DashNav from "./DashNav";
import Sidebar from "./Sidebar";

import Student from "./my-students/Student";
import StudentsList from "./my-students/StudentsList";

import SessionDetails from "./my-sessions/Sessions";
import CalendarContainer from "./calendar/Container";

import { useSidebarContext } from "contexts/AllContexts";
import { useAppContext } from "contexts/AppContext";

import CreateSlotModal from "./CreateSlotModal";
import UpdateMeetModal from "./UpdateMeetModal";

export default function Container() {
  const SidebarContext = useSidebarContext();
  const sidebarIsOpen = SidebarContext.state.isOpen;

  const appContext = useAppContext();

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
      {appContext.state.isOpenUpdateMeetModal && <UpdateMeetModal />}
      {appContext.state.isOpenCreateSlotModal && <CreateSlotModal />}

      <DashNav />
      <Sidebar />

      <div className={clsx(style.main, sidebarIsOpen ? style.sidebarOpen : style.sidebarClosed)}>
        <Routes>
          <Route path="/students" element={<StudentsList />} />
          <Route path="/student/:id" element={<Student />} />

          <Route path="/sessions" element={<SessionDetails />} />

          <Route path="/calendar" element={<CalendarContainer />} />

          <Route index element={<Navigate to="calendar" />} />
        </Routes>
      </div>
    </div>
  );
}
