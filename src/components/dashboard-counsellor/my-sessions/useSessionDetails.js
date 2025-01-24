import { useState, useEffect } from "react";

import moment from "moment";
import { getRequest, deleteRequest, patchRequest } from "utils/api";

import { isSameDay, startOfWeek, endOfWeek, isWithinInterval, addWeeks } from 'date-fns'

export default function useSessionDetails() {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState({ all: [], today: [], week: [] });
  const [isLoading, setIsLoading] = useState(false);

  function getSessions() {
    setIsLoading(true);
    getRequest(`/cde/sessions`)
      .then((resp) => {
        const allSessions = resp.data.map((session) => {
          const slot = session.counselling_slot.slot;

          const endSlot = slot.split("-")[1];
          const [year, month, date] = session.counselling_slot.date.split("-");

          const startDate = new Date(year, month - 1, date, endSlot, 0, 0);
          const currDate = new Date();

          const startDateOfWeek = startOfWeek(currDate);
          const endDateOfWeek = endOfWeek(currDate);

          const startDateOfNextWeek = startOfWeek(addWeeks(currDate, 1));
          const endDateOfNextWeek = endOfWeek(addWeeks(currDate, 1));

          return {
            ...session,
            isTimeOver: moment(startDate).isBefore(new Date()),

            isToday: isSameDay(startDate, currDate),
            isThisWeek: isWithinInterval(startDate, { start: startDateOfWeek, end: endDateOfWeek }),
            isNextWeek: isWithinInterval(startDate, { start: startDateOfNextWeek, end: endDateOfNextWeek })
          };
        });

        setFilteredSessions({
          all: allSessions,
          past: allSessions.filter(f => f.isTimeOver),
          today: allSessions.filter(f => f.isToday),
          thisWeek: allSessions.filter(f => f.isThisWeek),
          nextWeek: allSessions.filter(f => f.isNextWeek),
        })

        setSessions(allSessions);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUploadActionPlan(session, e) {
    const postData = new FormData();
    postData.append("action_plan", e.target.files[0]);

    setIsLoading(true);
    patchRequest(`/cde/sessions/${session.id}/action_plan`, postData)
      .then((resp) => {
        getSessions();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function cancelBooking(id) {
    setIsLoading(true);
    deleteRequest(`/counselling/cancel_slot`, { booking: id })
      .then((resp) => {
        getSessions();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSessions();
  }, []);

  return { sessions, filteredSessions, isLoading, cancelBooking, handleUploadActionPlan };
}
