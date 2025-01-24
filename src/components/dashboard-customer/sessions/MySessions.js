import React, { useEffect, useState } from "react";
import style from "./MySessions.module.scss";

import clsx from "clsx";
// import moment from "moment";

// import Button from "components/shared/Button";
// import ButtonLight from "components/shared/ButtonLight";
// import { Download } from "react-feather";
import Modal from "components/shared/Modal";

import { useHandleBooking } from "./useHandleBooking";
import { getRequest } from "utils/api";
import BookingModal from "./BookingModal";
import InlineLoader from "components/shared/InlineLoader";
import PlanPrompt from "./PlanPrompt";
import CompleteAssessment from "./CompleteAssessment";
import Survey from "./Survey";
import SessionCard from "./SessionCard";

export default function MySessions() {
  const [isOpen, setIsOpen] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isCounsellingAvail, setIsCounsellingAvail] = useState(true);
  const [showNewBooking, setShowNewBooking] = useState(false);

  const [isAssessmentFinished, setIsAssessmentFinished] = useState(true);
  const [isSurveyFinished, setIsSurveyFinished] = useState(true);
  const [activeSessionId, setActiveSessionId] = useState(true);

  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);

  const [surveys, setSurveys] = useState([]);

  const { state, dispatch, handleGetBookingSlots, bookSlot, cancelBooking } =
    useHandleBooking();

  function toggleModalIsOpen() {
    setIsOpenModal((prev) => !prev);
    dispatch({ type: "SET_ACTIVE_SCREEN", payload: { screen: "cdes" } });
  }

  function toggleIsOpen(index) {
    setIsOpen((prev) => {
      let toUpdate = [...prev];
      toUpdate[index] = !toUpdate[index];
      return toUpdate;
    });
  }

  function handleClickCancelBooking(sessionId) {
    setIsOpenCancelModal(true);
    setActiveSessionId(sessionId);
  }

  function getCounsellingStatus() {
    setIsLoading(true);

    getRequest(`/counselling/status`)
      .then((resp) => {
        let arrSurveys = [];

        // resp.data = {
        //   pk: "aae8ee66-cec8-42ac-9224-f099c9e593ac",
        //   department: "REDESIGN",
        //   pref_language: "EN",
        //   is_assessment_purhased: true,
        //   is_assessment_consumed: false,
        //   is_counselling_purchased: true,
        //   is_counselling_consumed: false,
        //   is_next_counselling_purchased: true,
        //   is_next_counselling_consumed: false,
        //   survey_1: "gKfjGy",
        //   survey_2: "x3PCI4",
        //   survey_3: "x3PCI4",
        //   survey_4: "gKfjGy",
        //   is_survey_1_completed: true,
        //   is_survey_2_completed: true,
        //   is_survey_3_completed: true,
        //   is_survey_4_completed: false,
        //   survey_1_response_id: "sa",
        //   survey_2_response_id: "vs",
        //   survey_3_response_id: null,
        //   survey_4_response_id: null,
        // };

        arrSurveys.push({
          id: "1",
          name: "Survey 1 - Portfolio",
          survey: resp.data.survey_1,
          isDone: resp.data.is_survey_1_completed,
          responseId: resp.data.survey_1_response_id,
          // isDone: true,
        });
        arrSurveys.push({
          id: "2",
          survey: resp.data.survey_2,
          name: "Survey 2 - SWOT",
          isDone: resp.data.is_survey_2_completed,
          responseId: resp.data.survey_2_response_id,
          // isDone: true,
        });
        if (resp.data.survey_3) {
          arrSurveys.push({
            id: "3",
            name: "Survey 3 - Parent's Form",
            survey: resp.data.survey_3,
            isDone: resp.data.is_survey_3_completed,
            responseId: resp.data.survey_3_response_id,
            // isDone: true,
          });
        }

        if (
          resp.data.is_next_counselling_purchased &&
          !resp.data.is_next_counselling_consumed
        ) {
          if (resp.data.survey_4) {
            arrSurveys.push({
              id: "4",
              name: "Survey 4 - Feedback",
              survey: resp.data.survey_4,
              isDone: resp.data.is_survey_4_completed,
              responseId: resp.data.survey_4_response_id,
              // isDone: true,
            });
          }
        }

        setSurveys(arrSurveys);
        // console.log(arrSurveys);
        setIsSurveyFinished(
          arrSurveys.reduce((accum, survey) => survey.isDone && accum, true)
        );

        const {
          is_counselling_purchased,
          is_counselling_consumed,
          is_next_counselling_purchased,
          is_next_counselling_consumed,
        } = resp.data;

        if (!is_counselling_consumed) {
          // Counselling purchased and not consumed

          // If counselling slot is settled or not
          const isOver = state.bookings.every((booking) => booking.is_over);

          setShowNewBooking(isOver);
          setIsCounsellingAvail(true);
        } else {
          // Counselling is consumed

          if (!is_counselling_purchased) {
            //Counselling consumed but not purchased ??
            setIsCounsellingAvail(false);
          } else {
            //Counselling puchased and consumed
            if (is_next_counselling_purchased) {
              // Counselling purchased and consumed and Next counselling also purchased
              setIsCounsellingAvail(true);

              if (!is_next_counselling_consumed) {
                // Counselling purchased and consumed and Next counselling purchased but not consumed
                setShowNewBooking(true);
              } else {
                // Counselling purchased and consumed and Next counselling purchased and consumed
                setIsCounsellingAvail(false);
                setShowNewBooking(false);
              }
            } else {
              // Counselling purchased and consumed and Next counselling not purchased
              setIsCounsellingAvail(false);
              setShowNewBooking(false);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getAssessmentStatus() {
    setIsLoading(true);
    getRequest("/assessment/status/update")
      .then((resp) => {
        setIsAssessmentFinished(resp.data.is_finished);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickDlaodActionPlan(session) {
    window.open(session.action_plan);
  }

  useEffect(() => {
    setIsOpen(state.bookings.map(() => false));
  }, [state.bookings]);

  useEffect(() => {
    if (state.bookings && state.bookings.length) getCounsellingStatus();
  }, [state]);

  useEffect(() => {
    getCounsellingStatus();
    getAssessmentStatus();
  }, []);

  return (
    <div
      className={clsx(
        style.wrapper,
        isOpen.reduce((accum, curr) => accum || curr, false) && style.cardOpen
      )}
    >
      <div className={style.title}>My Sessions</div>
      <div className={style.sessions}>
        {state.isLoading && (
          <div className={style.loaderWrapper}>
            <InlineLoader size={100} />
          </div>
        )}

        {!state.isLoading && !isLoading && (
          <>
            {!isAssessmentFinished ? (
              <CompleteAssessment />
            ) : isCounsellingAvail ? (
              <>
                {!isSurveyFinished ? (
                  <Survey surveys={surveys} />
                ) : (
                  <>
                    {!state.isLoading &&
                      state.bookings.map((session, index) => (
                        <SessionCard
                          session={session}
                          index={index}
                          isOpen={isOpen}
                          toggleIsOpen={toggleIsOpen}
                          toggleModalIsOpen={toggleModalIsOpen}
                          handleClickDlaodActionPlan={
                            handleClickDlaodActionPlan
                          }
                          handleClickCancelBooking={handleClickCancelBooking}
                        />
                      ))}
                    {showNewBooking && (
                      <SessionCard
                        session={{ id: null, date: null }}
                        index={state.bookings.length}
                        isOpen={isOpen}
                        toggleIsOpen={toggleIsOpen}
                        toggleModalIsOpen={toggleModalIsOpen}
                        handleClickDlaodActionPlan={handleClickDlaodActionPlan}
                        handleClickCancelBooking={handleClickCancelBooking}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <PlanPrompt />
            )}
          </>
        )}
      </div>

      <BookingModal
        isOpen={isOpenModal}
        state={state}
        handleClose={toggleModalIsOpen}
        handleGetBookingSlots={handleGetBookingSlots}
        bookSlot={bookSlot}
      />

      <Modal
        isOpen={isOpenCancelModal}
        contentClassName={style.cancelModalWrapper}
      >
        <div className={style.text}>
          Are you sure you want to cancel booking ?
        </div>
        <div className={style.buttons}>
          <button
            onClick={() => {
              cancelBooking(activeSessionId);
              setIsOpenCancelModal(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => setIsOpenCancelModal(false)}>No</button>
        </div>
      </Modal>
    </div>
  );
}
