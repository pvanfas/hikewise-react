export const _InitialState = {
  testState: {
    isStart: false,
    isEnd: false,
  },
  runData: {
    content: [],
    currIndex: 0,
    totQuesCount: {}, // by tabs (categories)
    currResp: "",
  },
  screenState: {
    isLoading: false,
    isLoadingImage: false,
    tabs: [],
    currTabIndex: 0,
  },
};

export function reducer(state, action) {
  const { type, payload } = action;

  let toUpdateState = { ...state };
  let currIndex = toUpdateState.runData.currIndex;
  let currContent = toUpdateState.runData.content[currIndex];

  switch (type) {
    case "SET_CONTENT":
      return {
        ...state,
        runData: { ...state.runData, content: payload.content },
      };
    case "SET_TABS":
      return {
        ...state,
        screenState: { ...state.screenState, tabs: payload.tabs },
      };
    case "INC_INDEX":
      return {
        ...state,
        runData: { ...state.runData, currIndex: state.runData.currIndex + 1 },
      };
    case "SET_CURR_TAB_INDEX":
      return {
        ...state,
        screenState: { ...state.screenState, currTabIndex: payload.index },
      };
    case "UPDATE_TOT_QUES_COUNT":
      return {
        ...state,
        runData: {
          ...state.runData,
          totQuesCount: { ...state.runData.totQuesCount, ...payload },
        },
      };
    case "UPDATE_CURR_RESP":
      currContent.question.resp = payload.resp;
      return toUpdateState;
    case "SET_IS_LOADING_IMAGE":
      return {
        ...state,
        screenState: {
          ...state.screenState,
          isLoadingImage: payload.isLoadingImage,
        },
      };
    default:
      return state;
  }
}
