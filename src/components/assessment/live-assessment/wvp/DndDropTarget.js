import React from "react";
import style from "./DndDropTarget.module.scss";

import clsx from "clsx";

import DndQuestionDrag from "./DndQuestionDrag";

import { useDrop } from "react-dnd";

export default function DndDropTarget({ handleDrop, name, dropped, index }) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "dragBox",
      drop: (item, monitor) => {
        if (item.onDropped) item.onDropped();
        handleDrop({ question: item.question, boxName: name, index });
      },
      collect: (monitor) => {
        return { isOver: monitor.isOver() };
      },
    }),
    [handleDrop]
  );

  const foundDrag = dropped.find((f) => f.targetIndex === index);

  return (
    <div className={clsx(style.wrapper, isOver && style.overActive)}>
      {foundDrag ? (
        <DndQuestionDrag dropped={true} question={foundDrag} />
      ) : (
        <div ref={drop} className={style.targetWrapper}></div>
      )}
    </div>
  );
}
