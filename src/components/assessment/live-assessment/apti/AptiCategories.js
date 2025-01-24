import React, { useRef, useEffect, useState } from "react";
import style from "./AptiCategories.module.scss";

import clsx from "clsx";

import { useEngine } from "../engine/EngineProvider";

export default function Categories() {
  const ref = useRef();

  const { state, dispatch } = useEngine();
  const { activeAptiCatIndex, activeAptiSubcatIndex } = state.screenState;

  const [scrollHeight, setScrollHeight] = useState(0);

  const aptiTab = state.screenState.tabs.find((tab) => tab.key === "aptitude");
  const currCat = aptiTab.categories[activeAptiCatIndex];

  function resizeHandler() {
    if (window.innerWidth < 650) {
      dispatch({
        type: "SET_CAT_SIDEBAR",
        payload: {
          isActive: true,
          isOpen: state.screenState.isActiveCatSidebar ? state.screenState.isOpenCatSidebar : false,
        },
      });
    } else {
      dispatch({ type: "SET_CAT_SIDEBAR", payload: { isActive: false, isOpen: false } });
    }
  }

  useEffect(() => {
    if (state.screenState.activeAptiSubcatIndex) setScrollHeight((prev) => prev + 25);
  }, [state.screenState.activeAptiSubcatIndex]);

  useEffect(() => {
    if (state.screenState.activeAptiCatIndex) {
      setScrollHeight((prev) => prev + 100);
    }
  }, [state.screenState.activeAptiCatIndex]);

  useEffect(() => {
    ref.current.scrollTop = scrollHeight;
  }, [scrollHeight]);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <div
      className={clsx(
        style.wrapper,
        state.screenState.isOpenCatSidebar && style.open,
        state.screenState.isActiveCatSidebar && style.active
      )}
      ref={ref}
    >
      {currCat && (
        <>
          {aptiTab.categories.map((cat, catInd) => (
            <div className={clsx(style.cat, catInd <= activeAptiCatIndex && style.active)} key={cat.name}>
              <div className={style.catName}>
                <span>{cat.name}</span>
              </div>

              <div className={style.subcats}>
                {cat.subcategories.map((subcat, subcatIndex) => {
                  let isActive = false;
                  if (catInd < activeAptiCatIndex) isActive = true;
                  else if (catInd === activeAptiCatIndex) {
                    if (subcatIndex <= activeAptiSubcatIndex) isActive = true;
                  }

                  let showConnector = false;

                  if (catInd === aptiTab.categories.length - 1) {
                    if (subcatIndex < cat.subcategories.length - 1) showConnector = true;
                  } else {
                    if (subcatIndex < cat.subcategories.length) showConnector = true;
                  }
                  return (
                    <div key={subcat.name} className={style.subcatContainer}>
                      <div className={clsx(style.subcat, isActive && style.active)}>
                        <span className={style.circle}></span>
                        <span>{subcat.name}</span>
                      </div>
                      {showConnector && (
                        <div className={style.connector}>
                          <div>|</div> <div>|</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
