import React, { useEffect, useRef } from "react";
import style from "./LiveTest.module.scss";

import clsx from "clsx";
import ClipLoader from "react-spinners/ClipLoader";
import { Menu } from "react-feather";

import TestTabs from "../shared/TestTabs";
import TestFooter from "../shared/TestFooter";
import QuesAns from "./QuesAns";
import Categories from "./apti/AptiCategories";
import AptiCountdown from "./apti/AptiCountdown";

import { useEngine } from "./engine/EngineProvider";
import InstructionsModal from "./instructions/InstructionsModal";
import LangSelection from "./LangSelection";

export default function LiveTest() {
  const { state, dispatch, handleClickTab, handleClickPrev, handleClickNext, toggleInstructionsModal } = useEngine();

  const activeTab = state.screenState.tabs[state.screenState.activeTabIndex];
  const isActiveCatSidebar = state.screenState.isActiveCatSidebar;

  const shouldShowMissedTab =
    activeTab.key === "missing" &&
    state.screenState.activeTabIndex === state.screenState.tabs.findIndex((f) => f.key === "missing");

  const myRef = useRef(null);

  function handleClickHeaderHam() {
    dispatch({
      type: "SET_CAT_SIDEBAR",
      payload: {
        isActive: state.screenState.isActiveCatSidebar,
        isOpen: !state.screenState.isOpenCatSidebar,
      },
    });
  }

  useEffect(() => {
    // myRef.current.scrollIntoView();
  }, []);

  return (
    <div ref={myRef} className={clsx(style.wrapper)}>
      <div className={style.tabsWrapper}>
        <TestTabs state={state} handleClickTab={handleClickTab} shouldShowMissedTab={shouldShowMissedTab} />
      </div>

      <InstructionsModal isOpen={state.screenState.isOpenInstructionsModal} />

      <div
        className={clsx(
          style.testCard,
          state.screenState.tabs[state.screenState.activeTabIndex].key === "wvp" && style.wvp
        )}
      >
        <div className={style.header}>
          {state.screenState.isActiveCatSidebar && (
            <div className={style.ham} onClick={handleClickHeaderHam}>
              <Menu />
            </div>
          )}

          <div className={style.title}>{activeTab.name}</div>

          <div
            className={clsx(
              style.aptiTimer,
              state.screenState.tabs[state.screenState.activeTabIndex].key === "aptitude" && style.show
            )}
          >
            <AptiCountdown />
          </div>
        </div>
        <div className={clsx(style.main, isActiveCatSidebar && style.mobile)}>
          {activeTab.key === "aptitude" && (
            <div className={clsx(style.categories, activeTab.key === "wvp" && style.wvp)}>
              <Categories />
            </div>
          )}
          <div
            className={clsx(
              style.quesAns,

              activeTab.key === "wvp" && style.wvp,
              activeTab.key === "aptitude" && style.aptitude,
              state.screenState.isOpenCatSidebar && activeTab.key === "aptitude" && style.sidebarOpen
            )}
          >
            {state.screenState.isLoading ? (
              <div className={style.loaderWrapper}>
                <ClipLoader color={"#9456c8"} loading={true} size={100} />
              </div>
            ) : (
              <QuesAns />
            )}
          </div>
        </div>

        {!state.screenState.isLoading && activeTab.key !== "wvp" && (
          <TestFooter
            state={state}
            handleClickPrev={handleClickPrev}
            handleClickNext={handleClickNext}
            isApti={activeTab.key === "aptitude"}
            toggleInstructionsModal={toggleInstructionsModal}
          />
        )}
      </div>
    </div>
  );
}
