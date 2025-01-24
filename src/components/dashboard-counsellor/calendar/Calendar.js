import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import style from "./Calendar.module.scss";

const localizer = momentLocalizer(moment);

const TimeSlotWrapper = ({ children }) => {
  return React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "white",
      border: "none",
    },
  });
};

export default function CalendarComp({ slots }) {
  const eventRenderProps = (event, start, end, isSelected) => {
    const { is_booked, is_settled } = event;

    let background = "";

    if (is_booked && !is_settled) {
      background = "#9456c8"; // purple
    } else if (!is_booked && !is_settled) {
      background = "#ff9f00"; // orange
    } else if (is_booked && is_settled) {
      background = "#26d426"; // green
    }

    let result = {
      style: {
        background,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
    };

    return result;
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0, 0);

  return (
    <div className={style.wrapper}>
      <Calendar
        localizer={localizer}
        events={slots}
        views={["day"]}
        defaultView="day"
        step={60}
        timeslots={1}
        selectable={false}
        components={{
          timeSlotWrapper: TimeSlotWrapper,
        }}
        min={minTime}
        max={maxTime}
        eventPropGetter={eventRenderProps}
      />
    </div>
  );
}
