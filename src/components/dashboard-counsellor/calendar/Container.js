import React from "react";
import style from "./Container.module.scss";

import Calendar from "./Calendar";

import useCalendarSlots from "./useCalendarSlots";
import clsx from "clsx";

export default function Container() {
  const { isLoading, allSlots } = useCalendarSlots();

  return (
    <div className={style.wrapper}>
      <Calendar slots={allSlots} />
      <div className={style.legends}>
        {/* <div className={style.inner}> */}
        <div className={style.legendWrapper}>
          <span className={clsx(style.legend, style.notBooked)}></span>
          <span className={style.text}>Not Booked</span>
        </div>
        <div className={style.legendWrapper}>
          <span className={clsx(style.legend, style.booked)}></span>
          <span className={style.text}>Booked</span>
        </div>
        <div className={style.legendWrapper}>
          <span className={clsx(style.legend, style.settled)}></span>
          <span className={style.text}>Settled</span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
