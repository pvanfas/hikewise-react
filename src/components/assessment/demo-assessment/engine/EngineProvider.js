import { createContext, useContext, useReducer } from "react";
import { _InitialState, reducer } from "./reducer";

import useTestController from "./useTestController";
const EngineContext = createContext();

export function EngineProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  const { startTest, handleChangeRadioInput, navigateNext } = useTestController(
    {
      state,
      dispatch,
    }
  );

  return (
    <EngineContext.Provider
      value={{
        state,
        dispatch,
        startTest,
        navigateNext,
        handleChangeRadioInput,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  return useContext(EngineContext);
}
