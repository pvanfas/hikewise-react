import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import style from "./Calendar.module.scss";

const localizer = momentLocalizer(moment);

const TimeSlotWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "white",
      border: "none",
    },
  });

export default function CalendarComp({ state, bookSlot, handleClose }) {
  const events = state.slots;

  const eventRenderProps = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: "#9456c8",
      },
    };
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0, 0);

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Select a slot for counselling</div>
      <button className={style.skipBtn} onClick={handleClose}>
        Close
      </button>

      <Calendar
        localizer={localizer}
        events={events}
        views={["day"]}
        defaultView="day"
        step={60}
        timeslots={1}
        selectable={true}
        onSelectEvent={bookSlot}
        style={{ width: "100%", height: "92%" }}
        components={{
          timeSlotWrapper: TimeSlotWrapper,
        }}
        eventPropGetter={eventRenderProps}
        min={minTime}
        max={maxTime}
      />
    </div>
  );
}
