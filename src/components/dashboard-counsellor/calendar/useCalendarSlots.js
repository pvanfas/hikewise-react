import { useEffect, useState } from "react";
import { getRequest, multiGetRequest } from "utils/api";

import moment from "moment";

export default function useCalendarSlots() {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [createdSlots, setCreatedSlots] = useState([]);

  const [allSlots, setAllSlots] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  function getAllSlots() {
    setIsLoading(true);
    getRequest(["/cde/slots"])
      .then((resp) => {
        let formatted = resp.data.map((slot) => {
          let arrSlot = slot.slot.split("-");
          let [slotStart, slotEnd] = [...arrSlot];
          let startTime = `${slot.date} ${slotStart}:00:00`;
          let endTime = `${slot.date} ${slotEnd}:00:00`;

          return {
            ...slot,
            start: moment(new Date(startTime)).toDate(),
            end: moment(new Date(endTime)).toDate(),
          };
        });

        setAllSlots(formatted);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //   function getBookedSlots() {
  //     getRequest(`/cde/sessions`).then((resp) => {
  //       console.log("Booked");

  //       let formatted = resp.data.map((session) => {
  //         let slot = session.counselling_slot;

  //         let arrSlot = slot.slot.split("-");
  //         let [slotStart, slotEnd] = [...arrSlot];
  //         let startTime = `${slot.date} ${slotStart}:00:00`;
  //         let endTime = `${slot.date} ${slotEnd}:00:00`;

  //         return {
  //           ...session,
  //           slot: {
  //             ...slot,
  //             start: moment(new Date(startTime)).toDate(),
  //             end: moment(new Date(endTime)).toDate(),
  //             type: "booked",
  //           },
  //         };
  //       });

  //       setBookedSlots(formatted);
  //     });
  //   }

  //   function getCreatedSlots() {
  //     getRequest(`/cde/slots`).then((resp) => {
  //       console.log("Created");

  //       let formatted = resp.data.map((slot) => {
  //         let arrSlot = slot.slot.split("-");
  //         let [slotStart, slotEnd] = [...arrSlot];
  //         let startTime = `${slot.date} ${slotStart}:00:00`;
  //         let endTime = `${slot.date} ${slotEnd}:00:00`;

  //         return {
  //           slot: {
  //             ...slot,
  //             start: moment(new Date(startTime)).toDate(),
  //             end: moment(new Date(endTime)).toDate(),
  //             type: "created",
  //           },
  //         };
  //       });

  //       setCreatedSlots(formatted);
  //     });
  //   }

  useEffect(() => {
    getAllSlots();
    // getBookedSlots();
    // getCreatedSlots();
  }, []);

  return { allSlots };
}
