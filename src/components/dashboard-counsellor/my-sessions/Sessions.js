import React, { useEffect, useState } from "react";
import style from "./Sessions.module.scss";

import moment from "moment";
import { Download, Upload } from "react-feather";

import Button from "components/shared/Button";
import ButtonLight from "components/shared/ButtonLight";
import InlineLoader from "components/shared/InlineLoader";

import { useUserContext } from "contexts/UserContext";
import useSessionDetails from "./useSessionDetails";
import clsx from "clsx";

export default function Sessions() {
  const User = useUserContext();

  const { isLoading, sessions, filteredSessions, cancelBooking, handleUploadActionPlan } =
    useSessionDetails();

  function enterRoom() {
    window.open(User.state.profile.meet_link);
  }

  function handleClickDloadActionPlan(session) {
    window.open(session.action_plan);
  }

  const filters = [{ label: "Past", "value": "past" }, { label: "Today", "value": "today" }, { label: "This Week", "value": "thisWeek" }, { label: "Next Week", "value": "nextWeek" },]

  const [filter, setFilter] = useState("all");

  function handleClickFilter(filt) {
    if (filter === filt) setFilter("all");
    else setFilter(filt);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>My Sessions
        <div className={style.tabs}>
          {filters.map(item =>
            <span
              className={clsx(filter === item.value && style.active)}
              onClick={handleClickFilter.bind(this, item.value)}>
              {item.label}
            </span>)}
        </div>
      </div>

      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader size={80} />
        </div>
      ) : (
        <div className={style.sessions}>
          {filteredSessions[filter].map((session, index) => (
            <div key={session.id} className={style.session}>
              <div className={style.sessionTitle}>
                <span>Session {index + 1}</span>
                <span>
                  {moment(new Date(session.counselling_slot.date)).format(
                    "DD-MM-YY"
                  )}
                </span>
              </div>

              <div className={style.body}>
                <div className={style.header}>
                  <div className={style.prospect}>
                    <span>Prospect : </span>
                    <span>{session.candidate}</span>
                  </div>
                </div>

                <div className={style.content}>
                  <div className={style.left}>
                    <div className={style.text}>Scheduled</div>
                    <div className={style.dateDate}>
                      {session.id
                        ? moment(
                          new Date(session.counselling_slot.date)
                        ).format("DD")
                        : "??"}
                    </div>
                    <div className={style.dateMonth}>
                      <div>
                        <span>
                          {moment(
                            session.counselling_slot.slot.split("-")[0],
                            "HH"
                          ).format("hh")}
                        </span>
                        <span>
                          {moment(
                            session.counselling_slot.slot.split("-")[0],
                            "HH"
                          ).format("a")}
                        </span>
                      </div>
                      -
                      <div>
                        <span>
                          {moment(
                            session.counselling_slot.slot.split("-")[1],
                            "HH"
                          ).format("hh")}
                        </span>
                        <span>
                          {moment(
                            session.counselling_slot.slot.split("-")[1],
                            "HH"
                          ).format("a")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={style.right}>
                    {true ? (
                      <>
                        {!session.action_plan ? (
                          <label id={style.uploadBtn}>
                            <Upload size={18} /> Action Plan
                            <input
                              onChange={handleUploadActionPlan.bind(
                                this,
                                session
                              )}
                              type="file"
                            />
                          </label>
                        ) : (
                          <ButtonLight
                            id={style.dloadBtn}
                            onClick={handleClickDloadActionPlan.bind(
                              this,
                              session
                            )}
                            options={{ width: "140px", radius: "5px" }}
                          >
                            <Download size={18} /> Action Plan
                          </ButtonLight>
                        )}
                        <div className={style.slotEnd}>Slot Ended</div>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={enterRoom}
                          options={{ width: "120px", radius: "5px" }}
                          className={style.btnDark}
                        >
                          Enter Room
                        </Button>

                        <ButtonLight
                          onClick={cancelBooking.bind(this, session.id)}
                          options={{ width: "120px", radius: "5px" }}
                          className={style.btnLight}
                        >
                          Cancel Booking
                        </ButtonLight>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
