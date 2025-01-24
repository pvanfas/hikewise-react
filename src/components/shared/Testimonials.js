import React, { useState, useEffect } from "react";
import style from "./Testimonials.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import clsx from "clsx";

import { splitArrChunks } from "utils/helper";
import { getRequest } from "utils/api";

SwiperCore.use([Pagination, Autoplay]);

export default function Testimonials() {
  const [allReviews, setAllReviews] = useState([]);

  function getReviews() {
    getRequest(`/web/testimonials`, { noAuth: true })
      .then((resp) => {
        setAllReviews(splitArrChunks(resp.data, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div id="Testimonials_Carousel">
      <Swiper
        pagination={{ clickable: true }}
        navigation={false}
        slidesPerView={"auto"}
        spaceBetween={30}
        className={clsx(style.wrapper, "testimonialsCarousel")}
        allowTouchMove={true}
        speed={1000}
      >
        {allReviews.map((testimonialArray) => (
          <SwiperSlide className={style.slide}>
            <section>
              <div className={style.row}>
                {testimonialArray.slice(0, 2).map(({ name, photo, content, designation }) => (
                  <article>
                    <div className={style.user}>
                      <span className={style.image}>
                        <img src={photo} alt="" />
                      </span>

                      <span className={style.info}>
                        <span className={style.name}>{name}</span>
                        <span className={style.designation}>{designation}</span>
                      </span>
                    </div>
                    <div className={style.body}>{content}</div>
                  </article>
                ))}
              </div>
              <div className={style.row}>
                {testimonialArray.slice(2, 4).map(({ name, photo, content, designation }) => (
                  <article>
                    <div className={style.user}>
                      <span className={style.image}>
                        <img src={photo} alt="" />
                      </span>

                      <span className={style.info}>
                        <span className={style.name}>{name}</span>
                        <span className={style.designation}>{designation}</span>
                      </span>
                    </div>
                    <div className={style.body}>{content}</div>
                  </article>
                ))}
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
