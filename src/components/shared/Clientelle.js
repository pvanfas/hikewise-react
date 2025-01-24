import React from "react";
import style from "./Clientelle.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0].toLowerCase()] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context("assets/images/landing/new-clients", true, /\.(png|jpe?g|svg|webp|gif)$/));

SwiperCore.use([Pagination, Autoplay]);

export default function Clientelle() {
  return (
    <div id="Clientelle_Carousel_New" className={style.wrapper}>
      <div className={style.top}>
        <div className={style.absolute}>50000</div>

        <div className={style.title}>Loved By</div>
        <div className={style.numbers}>
          <span className={style.bold}>50,000+</span>
          <span className={style.black}>Students/Professionals From Institutions Across India</span>
        </div>
      </div>

      <Swiper
        pagination={{ clickable: true }}
        navigation={false}
        slidesPerView={"auto"}
        spaceBetween={30}
        className={style.swiperContainer}
        allowTouchMove={true}
        speed={1000}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((item) => (
          <SwiperSlide className={style.slide}>
            <article>
              <img src={IMAGES[`client${item}`]} alt="" />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
