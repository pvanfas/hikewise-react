import React, { useState, useEffect } from "react";
import style from "./Reviews.module.scss";

import parse from "html-react-parser";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

import SectionTitle from "components/shared/SectionTitle";
import { getRequest } from "utils/api";
import ContentModal from "./ContentModal";

SwiperCore.use([Pagination, Autoplay, Navigation]);

const STR_TRUNCATE_LEN = 200;

export default function Reviews() {
  const [allReviews, setAllReviews] = useState([]);

  const [activeModalContent, setActiveModalContent] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  function getReviews() {
    getRequest(`/web/testimonials`, { noAuth: true })
      .then((resp) => {
        setAllReviews(
          resp.data.map((review) => ({
            ...review,
            contentTruncated: review.content.substring(0, Math.min(STR_TRUNCATE_LEN, review.content.length)),
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickReadMore(review) {
    toggleContentModal();
    setActiveModalContent({ body: review.content, title: review.name });
  }

  function toggleContentModal() {
    setIsOpenModal((prev) => !prev);
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className={style.wrapper} id="ReviewsCarousel">
      <header>
        <SectionTitle>
          <span>WHY STUDENTS/PROFESSIONALS</span> <span>LOVE US</span>
        </SectionTitle>
      </header>

      <ContentModal onClose={toggleContentModal} isOpen={isOpenModal} content={activeModalContent} />

      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        slidesPerView={"1"}
        spaceBetween={30}
        className={style.swiperContainer}
        allowTouchMove={true}
        speed={1000}
      >
        {allReviews.map((review) => (
          <SwiperSlide className={style.card} key={review.id}>
            <div className={style.content}>
              {parse(review.contentTruncated)}
              {review.content.length > STR_TRUNCATE_LEN && (
                <span onClick={handleClickReadMore.bind(this, review)} className={style.readMore}>
                  ...Read More
                </span>
              )}
            </div>
            <div className={style.image}>
              <img src={review.photo} alt="logo" />
            </div>
            <div className={style.user}>
              <div className={style.name}>{review.name}</div>
              <div className={style.desig}>{review.designation}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
