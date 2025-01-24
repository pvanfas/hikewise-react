import React from "react";
import style from "./Program3.module.scss";

import clsx from "clsx";

import WithPadding from "components/shared/WithPadding";
import SectionTitle from "./SectionTitle";

import steps_top from "../../assets/images/landing/steps_top.svg";
import steps_bottom from "../../assets/images/landing/steps_bottom.svg";

import How1 from "assets/images/landing/how1.png";
import How2 from "assets/images/landing/how2.png";
import How3 from "assets/images/landing/how3.png";

const _ArrayCards = [
  {
    title: "Take the online career assessment",
    body: "On signing up, you will be taken to India’s most comprehensive and scientific career assessment platform. Complete the online career assessment test that covers the most important dimensions of a person’s psychometric makeup like Interest, Aptitude, Personality, Work Value Preferences, and Emotional Intelligence.",
    img: How1,
  },
  {
    title: "Find out who you really are",
    body: "Get a detailed 50+ pages report that delves into great detail on multiple traits that describe your psychometric dimensions. The report gives a detailed definition, a critical analysis based on your score and suggests improvement strategies for each trait assessed by the career assessment test. It also gives you five career fields/two stream options that are the best fit for you.",
    img: How2,
  },
  {
    title: "Get personalised guidance from experts",
    body: "Get in to Hikewise’s unique post-assessment career counselling mechanism that includes a one to one online career counselling session with our career expert. At the end of the process, you get a detailed action plan for your future solving all your needs related to career planning, academic success, and personal and social development",
    img: How3,
  },
];

export default function Program3() {
  return (
    <WithPadding className={style.wrapper}>
      <div className={style.header}>
        {/* <div className={clsx(style.graphic, style.top)}>
          <img src={steps_top} alt="" />
        </div> */}

        <SectionTitle>
          <span>How</span> <span>It Works</span>
        </SectionTitle>
        <div className={style.subtitle}>A simple 3 step process to discover your perfect career</div>
      </div>

      <div className={style.cards}>
        {_ArrayCards.map((card, index) => (
          <div className={style.row} id={style["row" + index]}>
            <div className={style.card}>
              <div className={style.stepText}>Step {index + 1}</div>
              <div className={style.title}>{card.title}</div>
              <div className={style.body}>{card.body}</div>
            </div>
            <div className={style.image}>
              <img src={card.img} alt="step" />
            </div>
          </div>
        ))}
      </div>

      {/* <div className={clsx(style.graphic, style.bottom)}>
        <img src={steps_bottom} alt="" />
      </div> */}
    </WithPadding>
  );
}
