import React from "react";
import style from "./TestTabs.module.scss";

import clsx from "clsx";

export default function LiveTestTabs({ state, className }) {
  const tabs = state.screenState.tabs;
  const { currTabIndex } = state.screenState;

  return (
    <div className={clsx(style.wrapper, className)}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.key}>
          <button
            className={clsx(index === currTabIndex && style.active, index < currTabIndex && style.done)}
            style={!tab.isActive && !tab.isDone ? { pointerEvents: "none" } : {}}
          >
            {tab.name}
          </button>
          {index !== tabs.length - 1 && (
            <span className={style.dots}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
