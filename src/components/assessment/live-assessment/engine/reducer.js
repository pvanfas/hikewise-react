const cloneDeep = require("lodash.clonedeep");

export const _InitialState = {
  settings: {
    testType: null,
    language: "EN",
    selectedLanguage: "EN",
  },
  testState: {
    isStart: false,
    isEnd: false,
  },
  testData: {
    statusData: {}, //If assignment already started then previous data of the assignment stored here

    contents: [], // Contains all the screens one by one , could be question or instruction
    currIndices: [0, 0], //Indicates the current position in the contents array

    currQuesNo: 1, // Ques number to show in UI for current section
    currQuestionCount: 0, // Total ques count to show in UI for current section

    epochStartTimeSubcat: 0,
    maxTimeAllowedSubcat: null,
    timeRemSubcat: null,

    currAnswer: null,
  },
  screenState: {
    isLoading: true,
    isAnswerClickable: true,

    tabs: [], // Tabs according to assessment type
    activeTabIndex: 0, // Current active tab

    swiper: null,

    isOpenCatSidebar: true, // Category split sidebar (for mobile view)
    isActiveCatSidebar: false, // Category split sidebar (for mobile view)

    activeAptiCatIndex: -1, // Indicates the current category in Apti
    activeAptiSubcatIndex: -1, // Indicates the current subCategory in Apti

    showPrevButton: false,
    showNextButton: true,
    isDisablePrevButton: false,

    isOpenInstructionsModal: false,
  },
};

export function reducer(state, action) {
  const { type, payload } = action;

  let stateCloned = cloneDeep(state);
  const currEpoch = new Date().getTime() / 1000;

  switch (type) {
    case "SET_TEST_TYPE":
      return {
        ...state,
        settings: { ...state.settings, testType: payload.type },
      };

    case "SET_LANGUAGE":
      return {
        ...state,
        settings: { ...state.settings, language: payload.language },
      };

    case "SET_SEL_LANGUAGE":
      return {
        ...state,
        settings: { ...state.settings, selectedLanguage: payload.language },
      };

    case "SET_IS_LOADING":
      return {
        ...state,
        screenState: { ...state.screenState, isLoading: payload.isLoading },
      };

    case "SET_TABS":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          tabs: payload.tabs,
        },
      };

    case "SET_ACTIVE_TAB_INDEX":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          activeTabIndex: payload.activeTabIndex,
        },
      };

    case "SET_CONTENTS":
      return {
        ...state,
        testData: { ...state.testData, contents: payload.contents },
      };

    case "SET_IS_START":
      let toUpdate = {
        ...state,
        testState: {
          ...state.testState,
          isStart: payload.isStart,
        },
      };
      if (payload.isStart) toUpdate.testData.epochStartTime = new Date().getTime() / 1000;
      return toUpdate;

    case "SET_IS_END":
      return {
        ...state,
        testState: { ...state.testState, isEnd: payload.isEnd },
      };

    case "SET_SECTION_QUESTIONS":
      let updateSecQues = stateCloned;

      updateSecQues.testData.contents.forEach((section) => {
        if (section.key === payload.key) {
          for (let i = 1; i <= payload.questions.length; i++) {
            if (section.content[i]) {
              const ques = payload.questions[i - 1];

              let instructions = {};
              if (ques.category && ques.subcategory) {
                instructions = {
                  type: "SUBCAT_INSTRUCTIONS",
                  subcatName: ques.subcategory,
                  catName: ques.category,
                  tabKey: "aptitude",
                };
              } else {
                instructions = { type: "SEC_INSTRUCTIONS", tabKey: ques.section };
              }

              section.content[i].question = {
                ...section.content[i].question,
                ...payload.questions[i - 1],
              };
              section.content[i].instructions = instructions;
            }
          }
        }
      });
      updateSecQues.testData.currQuesCount = payload.questions.length;
      return updateSecQues;

    case "SET_APTI_QUESTIONS":
      let updateSecQuesApti = stateCloned;
      updateSecQuesApti.testData.contents.forEach((section) => {
        if (section.key === "aptitude") {
          const foundSubcatIndex = section.content.findIndex(
            (f) => f.type === "SUBCAT_INSTRUCTIONS" && f.subcatName === payload.subcat
          );

          let i = foundSubcatIndex + 1;
          let k = 0;
          while (k < payload.questions.length) {
            if (section.content[i]) {
              section.content[i].question = {
                ...section.content[i].question,
                ...payload.questions[k++],
              };
              i++;
            }
          }
        }
      });

      updateSecQuesApti.testData.currQuesCount = payload.questions.length;
      return updateSecQuesApti;

    case "SET_INDICES":
      return {
        ...state,
        testData: { ...state.testData, currIndices: payload.indices },
      };

    case "SET_STATUS_DATA":
      return {
        ...state,
        testData: { ...state.testData, statusData: payload.data },
      };

    case "SET_CURR_QUES_NO":
      return {
        ...state,
        testData: { ...state.testData, currQuesNo: payload.currQuesNo },
      };

    case "SET_CURR_QUES_COUNT":
      return {
        ...state,
        testData: { ...state.testData, currQuesCount: payload.currQuesCount },
      };

    case "UPDATE_CURR_RESPONSE":
      let currQuesUpdateResp = stateCloned;
      const question =
        currQuesUpdateResp.testData.contents[currQuesUpdateResp.testData.currIndices[0]].content[
          currQuesUpdateResp.testData.currIndices[1]
        ].question;

      question.answer = payload.answer;
      return currQuesUpdateResp;

    case "SET_DISPLAY_PREV_BUTTON":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          showPrevButton: payload.showPrevButton,
        },
      };

    case "SET_DISPLAY_NEXT_BUTTON":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          showNextButton: payload.showNextButton,
        },
      };

    case "SET_IS_DISABLE_PREV_BUTTON":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          isDisablePrevButton: payload.isDisable,
        },
      };

    case "MOVE_TO_NEXT_TAB":
      let tabs = stateCloned.screenState.tabs;

      let activeTab = tabs[stateCloned.screenState.activeTabIndex];
      activeTab.isDone = true;
      activeTab.isActive = false;
      let nextTab = tabs[stateCloned.screenState.activeTabIndex + 1];
      nextTab.isDone = false;
      nextTab.isActive = true;

      stateCloned.screenState.activeTabIndex = stateCloned.screenState.activeTabIndex + 1;
      return stateCloned;

    case "SET_APTI_INDEX":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          activeAptiSubcatIndex: payload.subcat,
          activeAptiCatIndex: payload.cat,
        },
      };

    case "START_SUBCAT_COUNTDOWN":
      return {
        ...state,
        testData: {
          ...state.testData,
          epochStartTimeSubcat: currEpoch,
          maxTimeAllowedSubcat: payload.time + 1,
        },
      };

    case "DEC_SUBCAT_COUNTDOWN":
      return {
        ...state,
        testData: {
          ...state.testData,
          timeRemSubcat: Math.floor(
            state.testData.maxTimeAllowedSubcat - (currEpoch - state.testData.epochStartTimeSubcat)
          ),
        },
      };

    case "STOP_SUBCAT_COUNTDOWN":
      return {
        ...state,
        testData: {
          ...state.testData,
          epochStartTimeSubcat: null,
          maxTimeAllowedSubcat: null,
        },
      };

    case "SET_CAT_SIDEBAR":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          isOpenCatSidebar: payload.isOpen,
          isActiveCatSidebar: payload.isActive,
        },
      };

    case "SET_IS_ANSWER_CLICKABLE":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          isAnswerClickable: payload.isAnswerClickable,
        },
      };

    case "TOGGLE_INSTRUCTIONS_MODAL":
      return {
        ...state,
        screenState: { ...state.screenState, isOpenInstructionsModal: !state.screenState.isOpenInstructionsModal },
      };

    default:
      return state;
  }
}
