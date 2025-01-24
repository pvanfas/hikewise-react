import React from "react";
import style from "./Clientelle.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";

import WithPadding from "components/shared/WithPadding";

import Client4 from "assets/images/landing/clients/Asset 4.svg";
import Client5 from "assets/images/landing/clients/client5.png";
import Client6 from "assets/images/landing/clients/Asset 6.svg";
import Client7 from "assets/images/landing/clients/Asset 7.svg";
import Client8 from "assets/images/landing/clients/client8.png";
import Client9 from "assets/images/landing/clients/Asset 9.svg";
import Client10 from "assets/images/landing/clients/client10.png";
import Client11 from "assets/images/landing/clients/client11.png";
import Client12 from "assets/images/landing/clients/Asset 12.svg";
import Client13 from "assets/images/landing/clients/Asset 13.svg";
import Client14 from "assets/images/landing/clients/Asset 14.svg";
// import Client15 from "assets/images/landing/clients/Asset 15.svg";
// import Client16 from "assets/images/landing/clients/Asset 16.svg";

SwiperCore.use([Pagination, Autoplay]);
const _ARR_IMAGES = [
  Client4,
  Client5,
  Client6,
  Client7,
  Client8,
  Client9,
  Client10,
  Client11,
  Client12,
  Client13,
  Client14,
  // Client15,
];

export default function Clientelle() {
  return (
    <WithPadding id="Clientelle_Carousel" className={style.wrapper}>
      <h4>Brought to you by the people from</h4>
      <Swiper
        pagination={{ clickable: true }}
        navigation={false}
        slidesPerView={"auto"}
        spaceBetween={0}
        className={style.swiperContainer}
        allowTouchMove={true}
        speed={1000}
      >
        {_ARR_IMAGES.map((image) => (
          <SwiperSlide className={style.slide}>
            <article>
              <img src={image} alt="" />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </WithPadding>
  );
}
