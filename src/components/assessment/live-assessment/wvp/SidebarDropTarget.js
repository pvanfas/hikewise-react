import React from "react";
import { useDrop } from "react-dnd";
// import style from "./SidebarDropTarget.module.scss";

export default function SidebarDropTarget({ handleDrop, children, className, handleDropSidebar }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "dragBox",
      drop: (item, monitor) => {
        handleDropSidebar(item.question);
      },
      collect: (monitor) => {
        return { isOver: monitor.isOver() };
      },
    }),
    [handleDrop]
  );

  return (
    <div ref={drop} className={className}>
      {children}
    </div>
  );
}
