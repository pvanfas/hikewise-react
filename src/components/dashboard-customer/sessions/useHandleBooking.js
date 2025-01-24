import { useEffect, useReducer } from "react";

import moment from "moment";
import cloneDeep from "lodash.clonedeep";

import { getRequest, postRequest, deleteRequest } from "utils/api";

const _InitialState = {
  cdes: [],
  slots: [],
  bookings: [],
  isLoading: false,
  activeScreen: {
    cdes: true,
    calendar: false,
    completed: false,
  },
};
function reducer(state, action) {
  const { type, payload } = action;

  let toUpdate = cloneDeep(state);

  switch (type) {
    case "SET_PAST_BOOKINGS":
      return { ...state, bookings: payload.bookings };
    case "SET_CDES":
      return { ...state, cdes: payload.slots };

    case "SET_IS_LOADING":
      return { ...state, isLoading: payload.isLoading };

    case "SET_SLOTS":
      return { ...state, slots: payload.slots };

    case "SET_ACTIVE_SCREEN":
      toUpdate.activeScreen = {
        cdes: false,
        calendar: false,
        completed: false,
      };
      toUpdate.activeScreen[payload.screen] = true;
      return toUpdate;
    default:
      return state;
  }
}

export function useHandleBooking() {
  const [state, dispatch] = useReducer(reducer, _InitialState);

  function getPastBookings() {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    getRequest(`/counselling/myslots`)
      .then((resp) => {
        const pastBookings = resp.data.map((session) => {
          const slot = session.counselling_slot.slot;

          const endSlot = slot.split("-")[1];
          const [year, month, date] = session.counselling_slot.date.split("-");
          const startDate = new Date(year, month - 1, date, endSlot, 0, 0);

          return {
            ...session,
            isTimeOver: moment(startDate).isBefore(new Date()),
          };
        });

        dispatch({
          type: "SET_PAST_BOOKINGS",
          payload: { bookings: [...pastBookings] },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function cancelBooking(id) {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    deleteRequest(`/counselling/cancel_slot`, { booking: id })
      .then((resp) => {
        getPastBookings();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function handleGetCdes() {
    getRequest("/counselling/cdes")
      .then((resp) => {
        dispatch({ type: "SET_CDES", payload: { slots: resp.data } });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGetBookingSlots(cdeId) {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    getRequest(`/counselling/slots/${cdeId}`)
      .then((resp) => {
        let formatted = resp.data.map((slot) => {
          let arrSlot = slot.slot.split("-");
          let [slotStart, slotEnd] = [...arrSlot];
          let startTime = `${slot.date} ${slotStart}:00:00`;
          let endTime = `${slot.date} ${slotEnd}:00:00`;

          return {
            id: slot.id,
            start: moment(new Date(startTime)).toDate(),
            end: moment(new Date(endTime)).toDate(),
          };
        });
        dispatch({
          type: "SET_ACTIVE_SCREEN",
          payload: { screen: "calendar" },
        });
        dispatch({ type: "SET_SLOTS", payload: { slots: formatted } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function bookSlot(slotEvent) {
    dispatch({ type: "SET_IS_LOADING", payload: { isLoading: true } });
    postRequest(`/counselling/book`, { slot: slotEvent.id })
      .then((resp) => {
        dispatch({
          type: "SET_ACTIVE_SCREEN",
          payload: { screen: "completed" },
        });
        getPastBookings();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: "SET_IS_LOADING", payload: { isLoading: false } });
      });
  }

  function getCdeProfile(id) {
    return state.cdes.find((f) => f.id === id);
  }

  useEffect(() => {
    handleGetCdes();
    getPastBookings();
  }, []);

  return {
    state,
    dispatch,
    handleGetCdes,
    handleGetBookingSlots,
    bookSlot,
    getPastBookings,
    cancelBooking,
    getCdeProfile,
  };
}
