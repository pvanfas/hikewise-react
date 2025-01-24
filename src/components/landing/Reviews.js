import React, { useEffect, useState } from "react";
import style from "./Reviews.module.scss";

import clsx from "clsx";
import { VscQuote } from "react-icons/vsc";

import SectionTitle from "./SectionTitle";
import WithPadding from "components/shared/WithPadding";
import { getRequest } from "utils/api";

export default function Review() {
  const [allReviews, setAllReviews] = useState([]);
  const [activeReview, setActiveReview] = useState("");

  const [activeTab, setActiveTab] = useState("GOOGLE");

  function getReviews() {
    getRequest(`/web/reviews`, { noAuth: true })
      .then((resp) => {
        let arrReviews = resp.data.map((review) => ({ ...review, isActive: false }));
        arrReviews[0].isActive = true;
        setAllReviews(arrReviews);
        setActiveReview(arrReviews[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickReview(review) {
    setActiveReview(review);
    let toUpdate = [...allReviews];
    toUpdate.forEach((r) => (r.isActive = review.id === r.id ? true : false));
    setAllReviews(toUpdate);
  }

  function handleClickTab(tab) {
    setActiveTab(tab);
    const filteredReviews = allReviews.filter((f) => f.source === tab);
    setActiveReview(filteredReviews[0]);
  }

  function updateIsActive() {
    handleClickReview(activeReview);
  }

  useEffect(updateIsActive, [activeReview]);
  useEffect(getReviews, []);

  return (
    <WithPadding className={style.wrapper}>
      <SectionTitle>
        <span>Our</span> <span>Reviews</span>
      </SectionTitle>

      <div className={style.text}>Loved by 50,000+ Students & Working Professionals Across India and Middle East</div>

      <div className={style.tabs}>
        <button
          onClick={() => handleClickTab("GOOGLE")}
          className={clsx(style.tab, activeTab === "GOOGLE" && style.active)}
        >
          Google
        </button>
        <button
          onClick={() => handleClickTab("QUORA")}
          className={clsx(style.tab, activeTab === "QUORA" && style.active)}
        >
          Quora
        </button>
      </div>

      <div className={style.reviewContainer}>
        {allReviews
          .filter((f) => f.source === activeTab)
          .map((review, index) => (
            <article
              className={clsx(style[`article${index + 1}`], review.isActive && style.active)}
              onClick={handleClickReview.bind(this, review)}
            >
              <div className={style.image}>
                <img src={review.photo} alt="" />
              </div>
            </article>
          ))}
        <div className={style.activeReview}>
          <span>
            <VscQuote />
          </span>
          <div>{activeReview.content}</div>
        </div>
      </div>
    </WithPadding>
  );
}
