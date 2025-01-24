import { createContext, useContext, useEffect, useReducer } from "react";
import { getRequest } from "utils/api";

const UserContext = createContext();

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

const _InitialState = {
  profile: {},
  isLoading: false,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_PROFILE":
      return { ...state, profile: payload.profile };

    case "SET_IS_LOADING":
      return { ...state, isLoading: payload.isLoading };
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  function getProfile() {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    getRequest(`/accounts/profile`)
      .then((resp) => {
        dispatch({ type: "SET_PROFILE", payload: { profile: resp.data } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  useEffect(() => {
    if (isTokenPresent()) getProfile();
  }, []);

  return <UserContext.Provider value={{ state, dispatch, getProfile }}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
