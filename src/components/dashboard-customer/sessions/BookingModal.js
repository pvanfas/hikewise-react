import React from "react";
import style from "./BookingModal.module.scss";

import { CheckCircle } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import Calendar from "./Calendar";
import Modal from "components/shared/Modal";
import InlineLoader from "components/shared/InlineLoader";

SwiperCore.use([Pagination, Autoplay]);

const languages = {
  AS: "Assamese",
  BN: "Bengali",
  EN: "English",
  GU: "Gujarati",
  HI: "Hindi",
  KN: "Kannada",
  ML: "Malayalam",
  MR: "Marathi",
  OD: "Odia",
  PA: "Punjabi",
  TA: "Tamil",
  TE: "Telugu",
  UR: "Urdu",
};

export default function BookingModal({ state, isOpen, handleClose, handleGetBookingSlots, bookSlot }) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} contentClassName={style.wrapper}>
      {state.activeScreen.cdes && (
        <div className={style.counsellingWrapper}>
          <button className={style.skipBtn} onClick={handleClose}>
            Skip
          </button>
          <div className={style.modalTitle}>Our Career counsellors</div>
          <div className={style.subtitle}>Choose your counsellor</div>

          <div className={style.cards}>
            {state.isLoading && <InlineLoader />}

            {!state.isLoading && (
              <Swiper
                pagination={{ clickable: true }}
                navigation={false}
                slidesPerView={"auto"}
                spaceBetween={30}
                className={style.swiperContainer}
                allowTouchMove={true}
                speed={1000}
              >
                {state.cdes.map((cde) => (
                  <SwiperSlide className={style.card} key={cde.id}>
                    <div className={style.image}>
                      <img src={cde.photo} alt="" />
                    </div>
                    <div className={style.name}>{cde.fullname}</div>
                    <div className={style.tags}>
                      {cde?.cde_languages?.map((lang) => (
                        <span className={style.lang}>{languages[lang]}</span>
                      ))}
                    </div>
                    <div className={style.body}>{cde.body}</div>
                    <div className={style.bio}>{cde.bio}</div>

                    <button onClick={handleGetBookingSlots.bind(this, cde.id)}>Select </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      )}

      {state.activeScreen.calendar && (
        <>
          {state.isLoading && <InlineLoader />}
          {!state.isLoading && <Calendar handleClose={handleClose} state={state} bookSlot={bookSlot} />}
        </>
      )}

      {state.activeScreen.completed && (
        <div className={style.successWrapper}>
          <div className={style.top}>
            <CheckCircle size={30} />
            Congratulations, you have booked a slot.
          </div>

          <div>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </Modal>
  );
}
