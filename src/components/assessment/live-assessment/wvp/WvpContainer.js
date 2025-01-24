import React, { useEffect, useState } from "react";
import style from "./WvpContainer.module.scss";

import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

import DndDropTarget from "./DndDropTarget";
import DndQuestionDrag from "./DndQuestionDrag";

import { useEngine } from "../engine/EngineProvider";
import WvpContainerMobile from "./WvpContainerMobile";
import SidebarDropTarget from "./SidebarDropTarget";
import { sortArrOfObjects } from "utils/helper";

export default function WvpContainer() {
  const { state, handleSubmitWvp, toggleInstructionsModal } = useEngine();

  const [boxes, setBoxes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [dropped, setDropped] = useState([]);

  const [isMobile, setIsMobile] = useState(false);

  function getBoxesForSection(secName) {
    switch (secName) {
      case "Most Important":
        return boxes.slice(0, 4).map((box, index) => ({ ...box, name: secName, index: index }));
      case "Important":
        return boxes.slice(4, 8).map((box, index) => ({ ...box, name: secName, index: index + 4 }));
      case "Somewhat Important":
        return boxes.slice(8, 12).map((box, index) => ({ ...box, name: secName, index: index + 8 }));
      case "Less Important":
        return boxes.slice(12, 16).map((box, index) => ({ ...box, name: secName, index: index + 12 }));
      case "Least Important":
        return boxes.slice(16, 20).map((box, index) => ({ ...box, name: secName, index: index + 16 }));
      default:
        return [];
    }
  }

  function getOptionKey(value) {
    let arrSplit = value.split(" ");
    arrSplit = arrSplit.map((word) => word.toUpperCase());
    return arrSplit.join("_");
  }

  function handleDrop({ question, boxName, index }) {
    let foundIndex = questions.findIndex((f) => f.id === question.id);

    let toUpdate = [...questions];

    if (foundIndex !== -1) toUpdate.splice(foundIndex, 1);
    setQuestions(sortArrOfObjects(toUpdate, "auto_id", "asc"));

    let uploadObject = {
      ...question,
      targetIndex: index,
      option: getOptionKey(boxName),
    };

    setDropped((prev) => {
      let toUpdate = [...prev];
      const prevDroppedIndex = toUpdate.findIndex((f) => f.id === uploadObject.id);

      if (prevDroppedIndex !== -1) toUpdate.splice(prevDroppedIndex, 1);
      toUpdate.push(uploadObject);
      return toUpdate;
    });
  }

  function handleDropSidebar(ques) {
    const { id } = ques;
    setQuestions((prev) => {
      let toUpdate = [...prev];
      const foundIndex = toUpdate.findIndex((f) => f.id === id);

      if (foundIndex === -1) toUpdate.push(ques);

      return sortArrOfObjects(toUpdate, "auto_id", "asc");
    });

    setDropped((prev) => {
      let toUpdate = [...prev];
      const prevDroppedIndex = toUpdate.findIndex((f) => f.id === id);
      if (prevDroppedIndex !== -1) toUpdate.splice(prevDroppedIndex, 1);
      return toUpdate;
    });
  }

  function handleSubmit() {
    handleSubmitWvp(dropped.map((item) => ({ question: item.id, option: item.option })));
  }

  useEffect(() => {
    let defaultBoxes = [];
    for (let i = 0; i < 20; i++) {
      let newBoxElem = { type: "dnd" };
      defaultBoxes.push(newBoxElem);
    }

    setBoxes(defaultBoxes);

    const currSection = state.testData.contents[state.testData.currIndices[0]];
    setQuestions(currSection.content.slice(-20).map((content) => content.question));
  }, []);

  function handleResize() {
    if (window.innerWidth <= 1310) setIsMobile(true);
    else setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <div className={style.wrapper}>
      <DndProvider options={HTML5toTouch}>
        {!isMobile ? (
          <>
            <div className={style.top}>
              <SidebarDropTarget handleDropSidebar={handleDropSidebar} className={style.questions}>
                {questions.map((ques) => (
                  <div className={style.quesWrapper} key={ques.id}>
                    <DndQuestionDrag language={state.settings.selectedLanguage} question={ques} id={ques.id} />
                  </div>
                ))}
              </SidebarDropTarget>
              <div className={style.dropTargets}>
                {["Most Important", "Important", "Somewhat Important", "Less Important", "Least Important"].map(
                  (item) => (
                    <div className={style.col} key={item}>
                      <div className={style.name}>{item}</div>
                      {getBoxesForSection(item).map((target) => {
                        return (
                          <DndDropTarget
                            handleDrop={handleDrop}
                            key={target.index}
                            name={target.name}
                            dropped={dropped}
                            index={target.index}
                          />
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </div>
            <div className={style.footer}>
              <div className={style.instructionsBtn} onClick={toggleInstructionsModal}>
                View Instructions
              </div>

              <button disabled={dropped.length === 20 ? false : true} onClick={handleSubmit}>
                Submit WVP
              </button>
            </div>
          </>
        ) : (
          <WvpContainerMobile
            handleDrop={handleDrop}
            boxes={boxes}
            questions={questions}
            getBoxesForSection={getBoxesForSection}
            dropped={dropped}
            handleDropSidebar={handleDropSidebar}
            handleSubmit={handleSubmit}
            toggleInstructionsModal={toggleInstructionsModal}
          />
        )}
      </DndProvider>
    </div>
  );
}
