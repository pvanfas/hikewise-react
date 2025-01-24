import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const _InitialState = {
  isOpenCompletionModal: false,
  isOpenCreateSlotModal: false,
  isOpenNewUserModal: false,
  isOpenUpdateMeetModal: false,
  accessToken: null,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: payload.token };
    case "SET_IS_COMPLETE_MODAL":
      return { ...state, isOpenCompletionModal: payload.isOpen };
    case "SET_IS_OPEN_CREATE_SLOT_MODAL":
      return { ...state, isOpenCreateSlotModal: payload.isOpen };
    case "SET_IS_OPEN_NEW_USER_MODAL":
      return { ...state, isOpenNewUserModal: payload.isOpen };
    case "SET_IS_OPEN_UPDATE_MEET_MODAL":
      return { ...state, isOpenUpdateMeetModal: payload.isOpen };
    default:
      return state;
  }
}

export function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
