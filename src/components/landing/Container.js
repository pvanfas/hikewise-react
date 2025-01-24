import React from "react";
import style from "./Container.module.scss";

import Navbar from "../navbar/Navbar";
import Hero from "./Hero";
import Program1 from "./Program1";
// import Footer from "./Footer";
import Footer from "../footer/Footer";
import Program2 from "./Program2";
import Program3 from "./Program3";
// import Review from "./Reviews";
import Program4 from "./Program4";
import Why from "./Why";
import Faq from "./Faq";
// import Journey from "./Journey";
import PreFooterBanner from "components/shared/PreFooterBanner";
import Clientelle from "./Clientelle";
import Media from "components/shared/Media";
import Reviews from "components/shared/Reviews";

export default function Container() {
  return (
    <div className={style.wrapper}>
      <Navbar background="white" />
      <Hero />
      <Program1 />
      <Program2 />
      <Program3 />
      <div className={style.reviewWrapper}>
        <Reviews />
      </div>
      {/* <Review /> */}
      <Program4 />
      <Why />
      <Clientelle />
      <div style={{ marginTop: "2em" }}>
        <Media />
      </div>
      {/* <Journey /> */}
      <Faq />
      <PreFooterBanner />
      <Footer />
    </div>
  );
}
