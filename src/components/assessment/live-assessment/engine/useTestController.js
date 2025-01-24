import { useEffect } from "react";
import { getTabsForTest } from "./helper";
import { getRequest, multiPostRequest, putRequest } from "utils/api";

import { useAppContext } from "contexts/AllContexts";

let nextQuestionTimeout = null;

export default function useTestController(params) {
  const AppContext = useAppContext();

  const {
    state,
    dispatch,
    getSectionQuestions,
    getAptiQuestions,
    getMissedQuestions,
    uploadAnswer,
    uploadWvpAnswer,
    startSubcatTimer,
    stopSubcatTimer,
  } = params;
  const { testData, screenState } = state;

  /* ---------------------------------- TEST START&END CONTROLLERS --------------------------------------*/
  /* ------------------------------------------------------------------------------------------------------*/

  function startTest() {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    putRequest("/assessment/status/update", {
      is_started: true,
      is_finished: false,
    })
      .then(() => {
        handleClickNextMainInstructions();
        dispatch({ type: "SET_IS_START", payload: { isStart: true } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  async function handleEnd() {
    putRequest("/assessment/status/update", {
      is_started: true,
      is_finished: true,
    })
      .then(() => {
        dispatch({ type: "SET_IS_END", payload: { isEnd: true } });
        AppContext.dispatch({
          type: "SET_IS_COMPLETE_MODAL",
          payload: { isOpen: true },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  async function setStatus() {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });

    let respStatusUpdate = await getRequest(`/assessment/status/update`);
    let respAssignmentData = await getRequest("/assessment/status");

    let contents = [];
    if (respStatusUpdate.data.is_started) {
      if (respStatusUpdate.data.is_finished) dispatch({ type: "SET_IS_END", payload: { isEnd: true } });
      else
        contents.push({
          key: "First",
          content: [{ type: "CONTINUE_INSTRUCTIONS" }],
        });
    } else
      contents.push({
        key: "First",
        content: [{ type: "START_INSTRUCTIONS" }],
      });

    const tabs = getTabsForTest(state.settings.testType);

    const missedQuesResp = await getMissedQuestions();

    const missedQues = missedQuesResp.data;
    let totMissed = 0;
    for (const key in missedQues) {
      totMissed += Array.isArray(missedQues[key]) ? missedQues[key].length : 0;
    }

    if (totMissed > 0) tabs.push({ name: "Missed Questions", key: "missing", isDone: false, isActive: false });

    tabs.forEach((tab) => {
      let section = {};
      if (tab.key === "missing") {
        section = {
          key: tab.key,
          content: [{ type: "MISSED_QUES_INSTRUCTIONS", tabKey: tab.key }],
        };
      } else {
        section = {
          key: tab.key,
          content: [{ type: "SEC_INSTRUCTIONS", tabKey: tab.key }],
        };
      }

      if (tab.key !== "aptitude" && tab.key !== "missing") {
        let quesCount = respAssignmentData.data[`${tab.key}_question_count`];
        for (let i = 0; i < quesCount; i++) {
          section.content.push({
            type: "QUESTION",
            question: {},
            instructions: { type: "SEC_INSTRUCTIONS", tabKey: tab.key },
          });
        }
      } else if (tab.key === "missing") {
        for (let i = 0; i < totMissed; i++) {
          section.content.push({
            type: "QUESTION",
            instructions: { type: "SEC_INSTRUCTIONS", tabKey: tab.key },
          });
        }
      } else {
        tab.categories.forEach((cat) => {
          section.content.push({
            type: "CAT_INSTRUCTIONS",
            catName: cat.name,
            tabKey: tab.key,
          });
          cat.subcategories.forEach((subcat) => {
            section.content.push({
              type: "SUBCAT_INSTRUCTIONS",
              subcatName: subcat.name,
              catName: cat.name,
              tabKey: tab.key,
            });
            const foundSubcat = respAssignmentData.data.aptitude_status.find((f) => f.subcategory === subcat.name);

            if (foundSubcat) {
              for (let i = 0; i < foundSubcat.questions; i++) {
                section.content.push({
                  type: "question",
                  question: {},
                  instructions: {
                    type: "SUBCAT_INSTRUCTIONS",
                    subcatName: subcat.name,
                    catName: cat.name,
                    tabKey: tab.key,
                  },
                });
              }
            }
          });
        });
      }

      contents.push(section);
    });

    dispatch({ type: "SET_TABS", payload: { tabs } });
    dispatch({ type: "SET_CONTENTS", payload: { contents: contents } });
    dispatch({
      type: "SET_STATUS_DATA",
      payload: { data: respAssignmentData.data },
    });
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
  }

  async function continueTest() {
    const statusData = state.testData.statusData;

    let tabs = screenState.tabs;

    let quesStats = { attempted: 0, count: 0 };

    tabs.forEach((tab) => {
      quesStats.attempted = quesStats.attempted + statusData[`${tab.key}_question_attempted_count`];
      quesStats.count = quesStats.count + statusData[`${tab.key}_question_count`];
    });

    if (quesStats.attempted === quesStats.count) {
      dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
      putRequest("/assessment/status/update", {
        is_started: true,
        is_finished: true,
      })
        .then(() => {
          dispatch({ type: "SET_IS_END", payload: { isEnd: true } });
          AppContext.dispatch({
            type: "SET_IS_COMPLETE_MODAL",
            payload: { isOpen: true },
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
        });
    }

    let foundTab, foundTabIndex;
    let quesAttempted = 0;
    let currAnswer = "";

    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];

      if (tab.key === "missing") {
        foundTab = tab;
        foundTabIndex = i;
        quesAttempted = 0;
        break;
      }

      const nextTab = tabs[i + 1];
      let nextQuestionsAnswered = 0;

      if (nextTab) nextQuestionsAnswered = statusData[`${nextTab.key}_question_attempted_count`];

      let questionsAnswered = statusData[`${tab.key}_question_attempted_count`];
      let questionsCount = statusData[`${tab.key}_question_count`];

      if (questionsAnswered < questionsCount && nextQuestionsAnswered === 0) {
        foundTab = tab;
        foundTabIndex = i;
        quesAttempted = questionsAnswered ? questionsAnswered : 1;

        let currTabEntries = statusData[`${tab.key}_entries`];

        if (tab.key === "aptitude") currTabEntries = statusData[`${tab.key}_status`];

        let lastEntry = currTabEntries[currTabEntries.length - 1];
        currAnswer = lastEntry ? (lastEntry.option ? lastEntry.option : null) : null;
        break;
      }
    }

    for (let i = 0; i < foundTabIndex; i++) {
      tabs[i].isDone = true;
    }

    tabs[foundTabIndex].isActive = true;

    const foundSecIndex = state.testData.contents.findIndex((f) => {
      return f.key ? f.key === foundTab.key : false;
    });

    dispatch({ type: "SET_TABS", payload: { tabs } });

    dispatch({
      type: "SET_ACTIVE_TAB_INDEX",
      payload: { activeTabIndex: foundTabIndex },
    });
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });

    if (foundTab.key === "missing") {
      const missedQuesResp = await getMissedQuestions();
      const missedQues = missedQuesResp.data;

      const questions = [];
      for (const key in missedQues) {
        const section = key.split("_")[0];

        if (Array.isArray(missedQues[key])) {
          questions.push(
            ...missedQues[key].map((ques) => {
              let instructions = { type: "SEC_INSTRUCTIONS", tabKey: section };
              if (section === "aptitude") {
                instructions = {
                  type: "SUBCAT_INSTRUCTIONS",
                  subcatName: ques.subcategory,
                  catName: ques.category,
                  tabKey: section,
                };
              }
              return {
                ...ques,
                section,
                instructions,
              };
            })
          );
        }
      }
      dispatch({
        type: "SET_SECTION_QUESTIONS",
        payload: { key: foundTab.key, questions },
      });
      dispatch({
        type: "SET_INDICES",
        payload: { indices: [foundSecIndex, 1] },
      });
      dispatch({
        type: "SET_CURR_QUES_NO",
        payload: { currQuesNo: 1 },
      });
    } else if (foundTab.key !== "aptitude" && foundTab.key !== "missing") {
      const questions = await getSectionQuestions(foundTab.key);
      dispatch({
        type: "SET_SECTION_QUESTIONS",
        payload: { key: foundTab.key, questions },
      });
      dispatch({
        type: "SET_INDICES",
        payload: { indices: [foundSecIndex, quesAttempted] },
      });
      dispatch({
        type: "SET_CURR_QUES_NO",
        payload: { currQuesNo: quesAttempted },
      });

      if (currAnswer)
        dispatch({
          type: "UPDATE_CURR_RESPONSE",
          payload: {
            answer: currAnswer,
          },
        });
    } else if (foundTab.key === "aptitude") {
      let currSubcat;
      let currCat;
      let aptiIndex = {
        cat: -1,
        subcat: -1,
      };

      let isBreak = false;
      for (let i = 0; i < foundTab.categories.length; i++) {
        if (isBreak) break;
        let cat = foundTab.categories[i];
        for (let j = 0; j < cat.subcategories.length; j++) {
          let subcat = cat.subcategories[j];

          const foundSubcatInStatus = statusData.aptitude_status.find((f) => {
            return f.subcategory === subcat.name;
          });

          if (foundSubcatInStatus.answered < foundSubcatInStatus.questions) {
            currSubcat = foundSubcatInStatus.subcategory;
            currCat = cat.name;
            isBreak = true;

            aptiIndex = { cat: i, subcat: j - 1 };
            break;
          }
        }
      }

      const questions = await getAptiQuestions(currSubcat, currCat);
      let contentIndex = -1;
      testData.contents[foundSecIndex].content.forEach((item, index) => {
        if (item.type === "SUBCAT_INSTRUCTIONS" && item.subcatName === currSubcat) contentIndex = index;
      });

      dispatch({
        type: "SET_APTI_QUESTIONS",
        payload: { key: foundTab.key, questions },
      });
      dispatch({
        type: "SET_INDICES",
        payload: { indices: [foundSecIndex, contentIndex] },
      });
      dispatch({ type: "SET_APTI_INDEX", payload: { ...aptiIndex } });
    }

    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
    dispatch({ type: "SET_IS_START", payload: { isStart: true } });
  }

  /* ---------------------------------- Question & Section Nav --------------------------------------*/
  /* ------------------------------------------------------------------------------------------------------*/

  function moveToNextQuestion(e) {
    const currContentLen = state.testData.contents[state.testData.currIndices[0]].content.length;
    const currContentInd = state.testData.currIndices[1];

    let currIndices = testData.currIndices;
    let newIndices = [...currIndices];
    let newQuesNo = testData.currQuesNo;

    if (currContentInd >= currContentLen - 1) {
      if (screenState.activeTabIndex >= screenState.tabs.length - 1) {
        return handleEnd();
      }
      dispatch({ type: "MOVE_TO_NEXT_TAB" });
      newIndices = [currIndices[0] + 1, 0];
      newQuesNo = 1;
    } else {
      newIndices = [currIndices[0], newIndices[1] + 1];
      newQuesNo = newQuesNo + 1;
    }

    dispatch({ type: "SET_INDICES", payload: { indices: newIndices } });
    dispatch({ type: "SET_CURR_QUES_NO", payload: { currQuesNo: newQuesNo } });
    dispatch({
      type: "SET_DISPLAY_PREV_BUTTON",
      payload: { showPrevButton: true },
    });
    dispatch({
      type: "SET_IS_DISABLE_PREV_BUTTON",
      payload: { isDisable: false },
    });
    dispatch({
      type: "SET_DISPLAY_NEXT_BUTTON",
      payload: { showNextButton: false },
    });
  }

  async function moveToNextSection() {
    const currTab = screenState.tabs[screenState.activeTabIndex];

    if (currTab.key === "aptitude") {
      let foundSecIndex = testData.contents.findIndex((f) => f.key === currTab.key);
      dispatch({
        type: "SET_INDICES",
        payload: { indices: [foundSecIndex, 1] },
      });
    } else if (currTab.key === "missing") {
      dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
      let questions = [];
      try {
        const questionsResp = await getMissedQuestions();
        const questionsData = questionsResp.data;
        for (const key in questionsResp.data) {
          const section = key.split("_")[0];

          const secQuestions = questionsData[key];
          if (Array.isArray(secQuestions))
            questions.push(
              ...secQuestions.map((ques) => {
                let instructions = { type: "SEC_INSTRUCTIONS", tabKey: section };
                if (section === "aptitude") {
                  instructions = {
                    type: "SUBCAT_INSTRUCTIONS",
                    subcatName: ques.subcategory,
                    catName: ques.category,
                    tabKey: section,
                  };
                }

                return {
                  ...ques,
                  instructions,
                  section,
                };
              })
            );
        }

        let foundSecIndex = testData.contents.findIndex((f) => f.key === currTab.key);

        dispatch({
          type: "SET_SECTION_QUESTIONS",
          payload: { key: currTab.key, questions },
        });
        dispatch({
          type: "SET_INDICES",
          payload: { indices: [foundSecIndex, 1] },
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      }
    } else {
      dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });

      let questions = [];
      try {
        questions = await getSectionQuestions(currTab.key);
        let foundSecIndex = testData.contents.findIndex((f) => f.key === currTab.key);

        dispatch({
          type: "SET_SECTION_QUESTIONS",
          payload: { key: currTab.key, questions },
        });
        dispatch({
          type: "SET_INDICES",
          payload: { indices: [foundSecIndex, 1] },
        });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      }
    }
  }

  function endCurrSubcat() {
    let currIndices = [...testData.currIndices];

    let arrResp = [];

    for (let i = currIndices[1]; i < testData.contents[currIndices[0]].content.length; i++) {
      if (testData.contents[currIndices[0]].content[i].type !== "question") {
        currIndices = [testData.currIndices[0], i];
        break;
      } else if (testData.contents[currIndices[0]].content[i].type === "question") {
        arrResp.push({
          question: testData.contents[currIndices[0]].content[i].question.id,
        });
      }

      if (i >= testData.contents[currIndices[0]].content.length - 1) {
        currIndices = [testData.currIndices[0] + 1, 0];
        break;
      }
    }

    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    let arrConfig = arrResp.map((item) => ({
      url: `/assessment/accept/aptitude`,
      data: { question: item.question },
    }));

    multiPostRequest(arrConfig)
      .then((resp) => {
        dispatch({
          type: "SET_INDICES",
          payload: { indices: [...currIndices] },
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function handleClickPrev() {
    let currIndices = testData.currIndices;
    let newIndices = [...currIndices];
    let newQuesNo = testData.currQuesNo;

    newIndices = [currIndices[0], newIndices[1] - 1];
    newQuesNo = newQuesNo - 1;

    dispatch({ type: "SET_INDICES", payload: { indices: newIndices } });
    dispatch({ type: "SET_CURR_QUES_NO", payload: { currQuesNo: newQuesNo } });
    dispatch({
      type: "SET_IS_DISABLE_PREV_BUTTON",
      payload: { isDisable: true },
    });
  }

  function handleClickNext() {
    let currIndices = testData.currIndices;
    let newIndices = [...currIndices];
    let newQuesNo = testData.currQuesNo;

    newIndices = [currIndices[0], newIndices[1] + 1];
    newQuesNo = newQuesNo + 1;

    dispatch({ type: "SET_INDICES", payload: { indices: newIndices } });
    dispatch({ type: "SET_CURR_QUES_NO", payload: { currQuesNo: newQuesNo } });
    dispatch({
      type: "SET_IS_DISABLE_PREV_BUTTON",
      payload: { isDisable: true },
    });
    dispatch({
      type: "SET_DISPLAY_NEXT_BUTTON",
      payload: { showNextButton: false },
    });
  }

  /* ---------------------------------- Instruction Click Handlers   --------------------------------------*/
  /* ------------------------------------------------------------------------------------------------------*/

  function handleClickNextMainInstructions() {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    const currTab = screenState.tabs[screenState.activeTabIndex];
    const foundSecIndex = testData.contents.findIndex((f) => f.key === currTab.key);
    dispatch({ type: "SET_INDICES", payload: { indices: [foundSecIndex, 0] } });
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
  }

  function handleClickNextSectionInstructions() {
    moveToNextSection();
  }

  function handleClickNextCatInstructions() {
    const currIndices = [...state.testData.currIndices];
    dispatch({
      type: "SET_INDICES",
      payload: { indices: [currIndices[0], currIndices[1] + 1] },
    });
    dispatch({
      type: "SET_APTI_INDEX",
      payload: { cat: screenState.activeAptiCatIndex + 1, subcat: -1 },
    });
  }

  async function handleClickNextSubcatInstructions() {
    const subcat = state.testData.contents[state.testData.currIndices[0]].content[state.testData.currIndices[1]];
    const currIndices = [...state.testData.currIndices];

    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });

    try {
      const questions = await getAptiQuestions(subcat.subcatName, subcat.catName);

      dispatch({
        type: "SET_APTI_QUESTIONS",
        payload: { subcat: subcat.subcatName, questions },
      });
      dispatch({
        type: "SET_INDICES",
        payload: { indices: [currIndices[0], currIndices[1] + 1] },
      });

      dispatch({
        type: "SET_APTI_INDEX",
        payload: {
          cat: screenState.activeAptiCatIndex,
          subcat: screenState.activeAptiSubcatIndex + 1,
        },
      });

      dispatch({
        type: "SET_DISPLAY_PREV_BUTTON",
        payload: { showPrevButton: false },
      });
      dispatch({ type: "SET_CURR_QUES_NO", payload: { currQuesNo: 1 } });

      dispatch({
        type: "START_SUBCAT_COUNTDOWN",
        payload: { time: questions[0].subcategory_time },
      });
      startSubcatTimer();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
    }
  }

  /* ---------------------------------- User Action Handlers  --------------------------------------*/

  async function handleSubmitWvp(answers) {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    uploadWvpAnswer(answers)
      .then(() => {
        let tabs = state.screenState.tabs;
        if (screenState.activeTabIndex >= tabs.length - 1) {
          return handleEnd();
        } else {
          let currIndices = testData.currIndices;
          let newIndices = [...currIndices];
          newIndices = [currIndices[0] + 1, 0];
          dispatch({ type: "MOVE_TO_NEXT_TAB" });
          dispatch({ type: "SET_INDICES", payload: { indices: newIndices } });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function handleSelectOption(e) {
    if (!e.target.value) return;

    /* prevent multiple clicks (before is answer clickable turns false) */
    e.target.disabled = true;

    /* enable click again before exiting function */
    if (!state.screenState.isAnswerClickable) return (e.target.disabled = false);

    /* input is disabled until question changes (useEffect quesNumber change)*/
    dispatch({
      type: "SET_IS_ANSWER_CLICKABLE",
      payload: { isAnswerClickable: false },
    });

    const answer = e.target.value;
    const question =
      state.testData.contents[state.testData.currIndices[0]].content[state.testData.currIndices[1]].question;

    uploadAnswer({ question, answer });
    dispatch({
      type: "UPDATE_CURR_RESPONSE",
      payload: {
        answer: answer,
      },
    });

    e.target.disabled = false;
    nextQuestionTimeout = window.setTimeout(() => {
      moveToNextQuestion();
    }, 200);
  }

  function toggleInstructionsModal() {
    dispatch({ type: "TOGGLE_INSTRUCTIONS_MODAL" });
  }

  function handleChangeLang(lang) {
    console.log({ lang });
    dispatch({
      type: "SET_SEL_LANGUAGE",
      payload: { language: lang },
    });
  }

  useEffect(() => {
    dispatch({
      type: "SET_IS_ANSWER_CLICKABLE",
      payload: { isAnswerClickable: true },
    });
  }, [state.testData.currQuesNo]);

  useEffect(() => {
    if (state.settings.testType && state.settings.testType.length) setStatus();
  }, [state.settings.testType]);

  useEffect(() => {
    if (state.testData.timeRemSubcat && state.testData.timeRemSubcat <= 0) {
      stopSubcatTimer();
      endCurrSubcat();
    }
  }, [state.testData.timeRemSubcat]);

  useEffect(() => {
    return () => window.clearTimeout(nextQuestionTimeout);
  }, []);

  return {
    continueTest,
    startTest,

    handleClickPrev,
    handleClickNext,
    handleEnd,

    handleClickNextMainInstructions,
    handleClickNextSectionInstructions,
    handleClickNextCatInstructions,
    handleClickNextSubcatInstructions,

    handleChangeLang,

    handleSelectOption,
    handleSubmitWvp,
    toggleInstructionsModal,
  };
}
