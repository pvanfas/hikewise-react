import React from "react";
import style from "./DndQuestionDragMobile.module.scss";

import clsx from "clsx";

import { useDrag } from "react-dnd";
import { useEngine } from "../engine/EngineProvider";

export default function DndQuestionDrag({ dropped, onDropped, question }) {
  const { state } = useEngine();

  let currQues = question;
  if (state.settings.selectedLanguage === "EN") currQues = question.english;

  const [{ isDragging }, drag] = useDrag({
    type: "dragBoxMobile",
    end: (item, monitor) => {},
    item: { question, dropped, onDropped },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div ref={drag} className={clsx(style.wrapper, isDragging && style.dragActive, dropped && style.dropped)}>
      {currQues.question}
    </div>
  );
}
