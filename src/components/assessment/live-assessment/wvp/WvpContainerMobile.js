import React from "react";
import style from "./WvpContainerMobile.module.scss";

import DndDropTargetMobile from "./DndDropTargetMobile";
import DndQuestionDragMobile from "./DndQuestionDragMobile";

import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination, Autoplay]);

export default function WvpContainerMobile({
  dropped,
  handleDrop,
  questions,
  getBoxesForSection,
  handleDropSidebar,
  toggleInstructionsModal,
  handleSubmit,
}) {
  return (
    <div className={style.wrapper} id="wvpMobile">
      <div className={style.dropTargets}>
        <Swiper
          pagination={{ clickable: true }}
          navigation={false}
          slidesPerView={1}
          spaceBetween={30}
          className={style.swiperContainer}
          allowTouchMove={true}
          speed={1000}
        >
          {["Most Important", "Important", "Somewhat Important", "Less Important", "Least Important"].map((item) => (
            <SwiperSlide className={style.slide} key={item}>
              <div className={style.name}>{item}</div>
              {getBoxesForSection(item).map((target, index) => (
                <DndDropTargetMobile
                  handleDrop={handleDrop}
                  key={target.index}
                  name={target.name}
                  index={target.index}
                  dropped={dropped}
                  handleDropSidebar={handleDropSidebar}
                />
              ))}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={style.questions}>
        {questions.map((ques) => (
          <div className={style.quesWrapper} key={ques._id}>
            <DndQuestionDragMobile question={ques} id={ques.id} />
          </div>
        ))}
      </div>
      <div className={style.button}>
        <button disabled={dropped.length === 20 ? false : true} onClick={handleSubmit}>
          Submit WVP
        </button>
        <div className={style.instructionsBtn} onClick={toggleInstructionsModal}>
          View Instructions
        </div>
      </div>
    </div>
  );
}
