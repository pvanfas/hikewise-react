import React from "react";
import style from "./SessionCard.module.scss";

import moment from "moment";
import clsx from "clsx";

import { Download } from "react-feather";
import Button from "components/shared/Button";
import ButtonLight from "components/shared/ButtonLight";

export default function SessionCard({
  session,
  isOpen,
  index,
  toggleIsOpen,
  toggleModalIsOpen,
  handleClickDlaodActionPlan,
  handleClickCancelBooking,
}) {
  function handleClickMeeting(session) {
    if (session.counselling_slot.cde.meet_link)
      window.open(session.counselling_slot.cde.meet_link);
  }

  return (
    <div
      className={clsx(style.wrapper, isOpen[index] && style.open)}
      key={index}
    >
      <div className={style.sessionTitle}>Session {index + 1}</div>
      <div className={style.body}>
        <div className={style.left}>
          {session.id && (
            <div className={style.text}>
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
                  ).format("A")}
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
                  ).format("A")}
                </span>
              </div>
            </div>
          )}

          <div className={style.dateDate}>
            {session.id
              ? moment(new Date(session.counselling_slot.date)).format("DD")
              : "??"}
          </div>
          <div className={style.dateMonth}>
            {session.id
              ? moment(new Date(session.counselling_slot.date)).format(
                  "MM-yyyy"
                )
              : null}
          </div>
        </div>
        <div className={style.right}>
          {session.id ? (
            <>
              {session.isTimeOver ? (
                <button className={style.slotOver}>Time Over</button>
              ) : (
                <Button
                  options={{ width: "120px", radius: "5px" }}
                  onClick={handleClickMeeting.bind(this, session)}
                  className={style.btnDark}
                >
                  Enter Room
                </Button>
              )}

              {/* <Button
                onClick={toggleIsOpen.bind(this, index)}
                options={{ width: "120px", radius: "5px" }}
                className={style.btnDark}
              >
                View Booking
              </Button> */}
              {session.isTimeOver ? (
                <>
                  {session.action_plan ? (
                    <ButtonLight
                      onClick={handleClickDlaodActionPlan.bind(this, session)}
                      options={{
                        width: "120px",
                        radius: "5px",
                      }}
                      className={style.btnDark}
                    >
                      <Download size={18} /> Action Plan
                    </ButtonLight>
                  ) : (
                    <div className={style.slotOver}>Slot Ended</div>
                  )}
                </>
              ) : (
                <ButtonLight
                  onClick={handleClickCancelBooking.bind(this, session.id)}
                  options={{
                    width: "120px",
                    radius: "5px",
                  }}
                  className={style.btnLight}
                >
                  Cancel Booking
                </ButtonLight>
              )}
            </>
          ) : (
            <Button
              options={{ width: "120px", radius: "5px" }}
              onClick={toggleModalIsOpen}
            >
              Book Session
            </Button>
          )}
        </div>
      </div>
      <div className={clsx(style.hidden, isOpen[index] && style.open)}>
        {/* <p>
          Vivamus magna justo, lacinia eget consectetur sed, convallis at
          tellus. Praesent sapien massa, convallis a pellentesque nec, egestas
          non nisi.
        </p>
        <p>
          Vivamus magna justo, lacinia eget consectetur sed, convallis at
          tellus. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor
          eget felis
        </p>

        <p>
          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
        </p>
        <p>
          quis ac lectus. Sed porttitor lectus nibh. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec sollicitudin molestie malesuada.
          Nulla quis lorem ut libero malesuada feugiat. Sed porttitor lectus
          nibh. Donec rutrum congue leo eget malesuada. Curabitur aliquet quam
          id dui posuere
        </p>
        <p>
          Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo
          eget malesuada. Mauris blandit aliquet elit, eget tincidunt nibh
          pulvinar a.
        </p> */}

        {session.isTimeOver ? (
          <button>Time Over</button>
        ) : (
          <button onClick={handleClickMeeting.bind(this, session)}>
            Enter the counselling room
          </button>
        )}
      </div>
    </div>
  );
}
