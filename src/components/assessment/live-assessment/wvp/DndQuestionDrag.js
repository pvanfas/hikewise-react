import React from "react";
import style from "./DndQuestionDrag.module.scss";

import clsx from "clsx";

import { useDrag } from "react-dnd";
import { useEngine } from "../engine/EngineProvider";

export default function DndQuestionDrag({ dropped, onDropped, question }) {
  const { state } = useEngine();

  const [{ isDragging }, drag] = useDrag({
    type: "dragBox",
    item: { dropped, onDropped, question },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  let currQues = question;
  if (state.settings.selectedLanguage === "EN") currQues = question.english;

  return (
    <div ref={drag} className={clsx(style.wrapper, isDragging && style.dragActive, dropped && style.dropped)}>
      {currQues.question}
    </div>
  );
}
