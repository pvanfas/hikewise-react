import React from "react";
import style from "./TestTabs.module.scss";

import clsx from "clsx";

export default function LiveTestTabs({ state, className, shouldShowMissedTab }) {
  const tabs = state.screenState.tabs;
  const tabsWithoutMissed = tabs.filter((f) => f.key !== "missing");
  const tabsToBeShown = shouldShowMissedTab ? tabs : tabsWithoutMissed;

  return (
    <div className={clsx(style.wrapper, className)}>
      {tabsToBeShown.map((tab, index) => (
        <React.Fragment key={tab.key}>
          <button
            className={clsx(tab.isActive && style.active, tab.isDone && style.done)}
            style={!tab.isActive && !tab.isDone ? { pointerEvents: "none" } : {}}
          >
            {tab.name}
          </button>
          {index !== tabsToBeShown.length - 1 && (
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
