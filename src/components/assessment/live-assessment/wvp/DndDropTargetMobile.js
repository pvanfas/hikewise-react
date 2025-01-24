import React from "react";
import style from "./DndDropTargetMobile.module.scss";

import { useDrop } from "react-dnd";
import clsx from "clsx";
import { useEngine } from "../engine/EngineProvider";

export default function DndDropTargetMobile({ handleDrop, name, index, dropped, handleDropSidebar }) {
  const { state } = useEngine();

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "dragBoxMobile",
      drop: (item, monitor) => {
        if (item.onDropped) item.onDropped();
        handleDrop({ question: item.question, boxName: name, index: index });
      },
      collect: (monitor) => {
        return { isOver: monitor.isOver() };
      },
    }),
    [handleDrop]
  );

  const foundDrag = dropped.find((f) => f.targetIndex === index);

  let currQues = foundDrag;
  if (state.settings.selectedLanguage === "EN") currQues = currQues?.english;

  return (
    <div className={clsx(style.wrapper)}>
      {foundDrag ? (
        <div className={style.droppedWrapper}>
          {currQues.question}
          <span onClick={handleDropSidebar.bind(this, foundDrag)}>&times;</span>
        </div>
      ) : (
        <div ref={drop} className={clsx(style.targetWrapper, isOver && style.overActive)}></div>
      )}
    </div>
  );
}
