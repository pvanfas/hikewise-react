import { createContext, useContext, useReducer } from "react";

const SidebarContext = createContext();

const _InitialState = {
  isOpen: true,
  isMobile: false,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "OPEN_SIDEBAR":
      return { ...state, isOpen: true };
    case "CLOSE_SIDEBAR":
      return { ...state, isOpen: false };
    case "TOGGLE_SIDEBAR":
      return { ...state, isOpen: !state.isOpen };
    case "SET_IS_MOBILE":
      return { ...state, isMobile: payload.isMobile };
    default:
      return state;
  }
}

export function SidebarContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  return <SidebarContext.Provider value={{ state, dispatch }}>{children}</SidebarContext.Provider>;
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}
