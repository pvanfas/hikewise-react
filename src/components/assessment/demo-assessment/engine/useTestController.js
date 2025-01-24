import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "contexts/AllContexts";

import RiseData from "./rise.json";
import SailData from "./sail.json";
import RedesignData from "./redesign.json";
import RedesignPlusData from "./redesign_plus.json";

let quesTimeout = null;

export default function useTestController({ state, dispatch }) {
  const navigate = useNavigate();
  const UserContext = useUserContext();

  function setContent() {
    const dept = UserContext.state.profile.department;
    let content = [];
    if (dept === "RISE") {
      content = RiseData.content;
    } else if (dept === "SAIL") {
      content = SailData.content;
    } else if (dept === "REDESIGN") {
      content = RedesignData.content;
    } else if (dept === "REDESIGN_PLUS") {
      content = RedesignPlusData.content;
    }

    const contentWithQuesNumber = assignQuesIndices(content);
    dispatch({
      type: "SET_CONTENT",
      payload: { content: contentWithQuesNumber },
    });
  }

  function startTest() {
    const dept = UserContext.state.profile.department;

    let tabs = [];
    if (dept === "RISE") {
      tabs = RiseData.tabs;
    } else if (dept === "SAIL") {
      tabs = SailData.tabs;
    } else if (dept === "REDESIGN") {
      tabs = RedesignData.tabs;
    } else if (dept === "REDESIGN_PLUS") {
      tabs = RedesignPlusData.tabs;
    }

    dispatch({ type: "SET_TABS", payload: { tabs } });
    navigateNext();
  }

  function assignQuesIndices(content) {
    /* Assign total ques counts for each tab &&
       question index to each question to display in footer  
       Ex: Q 2/5, 3/5, 4/5.... 
   */

    let newContent = [...content];
    let prevKey = "personality";
    let currKey = "personality";

    let currQuesNumber = 1;

    newContent
      .filter((f) => f.tabKey !== "wvp")
      .forEach((item, index) => {
        if (item.type === "QUESTION" || item.type === "gif") {
          prevKey = currKey;
          currKey = item.tabKey;

          if (index < newContent.length - 2) {
            if (prevKey === currKey) {
              item.quesNumber = currQuesNumber++;
            } else {
              dispatch({
                type: "UPDATE_TOT_QUES_COUNT",
                payload: { [prevKey]: currQuesNumber - 1 },
              });
              currQuesNumber = 1;
              item.quesNumber = currQuesNumber++;
            }
          } else {
            dispatch({
              type: "UPDATE_TOT_QUES_COUNT",
              payload: { [prevKey]: currQuesNumber },
            });
            item.quesNumber = currQuesNumber++;
          }
        }
      });

    return newContent;
  }

  function navigateNext() {
    dispatch({ type: "INC_INDEX" });

    const { currIndex } = state.runData;
    if (currIndex === state.runData.content.length - 1) endTest();
  }

  function handleChangeRadioInput(e) {
    dispatch({ type: "UPDATE_CURR_RESP", payload: { resp: e.target.value } });
    quesTimeout = window.setTimeout(() => {
      navigateNext();
    }, 200);
  }

  function updateCurrTabStatus() {
    const currContent = state.runData.content[state.runData.currIndex];

    if (!currContent) return;

    const currTabKey = currContent.tabKey;
    const activeTabIndex = state.screenState.tabs.findIndex((f) => f.key === currTabKey);

    dispatch({
      type: "SET_CURR_TAB_INDEX",
      payload: { index: activeTabIndex },
    });
  }

  function endTest() {
    navigate("/dashboard/candidate/plans");
  }

  useEffect(() => {
    updateCurrTabStatus();
  }, [state.runData.currIndex]);

  useEffect(() => {
    setContent();
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(quesTimeout);
    };
  }, []);

  return { startTest, handleChangeRadioInput, navigateNext };
}
