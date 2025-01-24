import React from "react";
import style from "./Assessment.module.scss";

import clsx from "clsx";
import Navbar from "components/navbar/Navbar";
import PreFooterBanner from "components/shared/PreFooterBanner";

import HeroLaptopImg from "assets/images/PAGE3/hero_laptop.svg";
import HeroOval from "assets/images/PAGE3/hero_oval.svg";

import What1Img from "assets/images/PAGE3/What_1.svg";
import What2Img from "assets/images/PAGE3/What_2.svg";
import What3Img from "assets/images/PAGE3/What_3.svg";
import What4Img from "assets/images/PAGE3/What_4.svg";
import What5Img from "assets/images/PAGE3/What_5.svg";

import InforgraphicReportImg from "assets/images/PAGE3/infographic_report.svg";
import InforgraphicStepsImg from "assets/images/PAGE3/infographic_steps.png";

import UniqueLeftImg from "assets/images/PAGE3/unique_left.svg";
import UniqueRightImg from "assets/images/PAGE3/unique_right.svg";
import Footer from "components/footer/Footer";
import CLientelle from "components/landing/Clientelle";
import { splitArrChunks } from "utils/helper";

const _WHAT_CARDS = [
  {
    title: "Cultural context oriented research",
    img: What1Img,
    text: `The most important aspect required of a psychometric test to provide reliable results is that it should be valid in the cultural context that the test taker belongs to. The highly diverse composition that the Indian culture is, makes it a very difficult task to achieve and this is where most of the other Indian tests fail and what provides Hikewise its unique edge. The meticulous cultural context oriented research process coupled with the extensive scientific framework that Hikewise is built upon which lends it important psychometric properties like objectivity, standardization, and practicability makes it one of India’s most reliable and valid career assessment tests with a scientific reliability of more than 0.9.`,
  },
  {
    title: "Easily accessible to everyone",
    img: What2Img,
    text: `At every stage of the development of Hikewise, utmost care has been taken to make it easily accessible to everyone in the country. The extremely smooth user experience and low bandwidth compatibility of the Hikewise dashboard ensures that even the remotest part of the country with a low speed mobile internet connectivity is able to take the test. The availability of the test in local languages and the highly affordable pricing structure make sure that language or financial barriers do not come in between an aspiring student and India’s most comprehensive career development mechanism.`,
  },
  {
    title: "Highly scientific selection of traits",
    img: What3Img,
    text: `The selection of the specific traits that are to be assessed is one of the most crucial process in the development of a psychometric test. The Indian career development space that has long been reigned over by pop psychology and an overdose of practices like DMIT and learning styles assessment that has no scientific basis to it whatsoever, has seen a long-awaited exception in Hikewise. The set of traits used in Hikewise which is designed to provide a holistic picture of an individual’s psychometric profile and at the same time doesn’t become a burden to the test taker has been selected on the basis of established scientific mechanisms like the Delphi method and Factor Analysis.`,
  },
  {
    title: "Fully self-administered",
    img: What4Img,
    text: `The availability of Hikewise as a completely online platform and the use of detailed, simple and well-structured instructions that have been tested and experimented to be able to connect with anyone irrespective of their cognitive abilities makes Hikewise a fully self-administered psychometric test. This makes Hikewise highly disruptive owing to its ability to provide a comfortable and flexible test taking experience even at the nooks and corners of the country and a welcome alternative to the prevalent pen and paper tests that are clumsy, time taking and highly prone to human errors.`,
  },
  {
    title: "Actionable outcomes",
    img: What5Img,
    text: `Being able to provide well defined and actionable insights and outcomes to support the different sets of dynamics that govern a complex process like career decision making including those between the parent-student, counsellor-student, and counsellor-parent is something that renders Hikewise as extra unique and sets it apart from the currently available tests that often beats around the bush by providing results that are neither predictive nor diagnostic.`,
  },
];

const _WHAT_CARDS_SPLIT = splitArrChunks(_WHAT_CARDS, 3);

export default function Page3() {
  return (
    <>
      <Navbar background={"white"} />
      <div className={style.wrapper}>
        <div className={clsx(style.hero, style.hPadding)}>
          <div className={clsx(style.graphic, style.left)}>
            <img src={HeroLaptopImg} alt="" />
          </div>
          <div className={style.textBox}>
            <h1>State of the Art Analytics Driven Career Assessment Tool</h1>

            <div className={style.subtitle}>
              Hikewise is based on an extensive scientific framework that has been formulated after closely observing the various advancements in the field of psychometrics. Available across 4 categories (Rise, Sail, Redesign, and Redesign Plus) for school students, college students, graduates, and working professionals who are in need of personalized and holistic guidance with regard to their career development.
            </div>
          </div>
          <div className={clsx(style.graphic, style.right)}>
            <img src={HeroOval} alt="" />
          </div>
        </div>

        <div className={clsx(style.reportSection, style.hPadding)}>
          <div className={style.sectionHeader}>
            HIKEWISE <span>REPORT</span>
          </div>

          <div className={style.contentText}>
            <p>
              The Hikewise Report which is generated on the successful completion of the test provides detailed
              information and analysis on five key psychometric dimensions: Interest, Personality, Aptitude, Work Value
              Preferences and EQ which is further divided into multiple traits. For each of the psychometric trait
              assessed, a critical review of the candidate’s score and a set of improvement strategies that can be
              adopted is also provided. The stream/career matches that are based on the overall psychological make-up of
              the individual is explained in detail and the opportunities that can be explored in each of these fields
              is appended in the form of elaborate mind maps.
            </p>
          </div>

          <div className={style.infoGraphic}>
            <img src={InforgraphicReportImg} alt="" />
          </div>
        </div>

        <div className={clsx(style.howSection, style.hPadding)}>
          <div className={style.sectionHeader}>
            HOW WAS HIKEWISE <span>DEVELOPED</span>
          </div>
          <div className={style.contentText}>
            <p>
              The formulation of Hikewise was done on the basis of a bottom-up approach by thoroughly analysing and
              evaluating the exact needs and requirements of the various stakeholders in the career development process
              like the students, parents, and other facilitators like teachers. The development phase of the test saw a
              team of highly qualified researchers with an academic background from world class universities like IIT
              Kharagpur, IIT Madras, Eindhoven University of Technology Netherlands, National University of Singapore,
              University of Hyderabad, Delhi University and NIT Calicut spending more than 18000 quality man hours under
              the guidance of experienced psychometricians from around the world.
            </p>
          </div>
          {/* <div className={style.logos}> */}
          <CLientelle />
          {/* </div> */}
          <div className={style.contentText}>
            <p>
              Highly advanced scientific methods like Artificial Intelligence and Machine Learning, and sophisticated
              statistical tools like Factor Analysis and Analytical Hierarchy Process were employed. The prolonged
              process also included an extensive data survey among a very large group of students and had the
              involvement of industry experts belonging to diverse backgrounds.
            </p>
            <p>
              Our firm, with research and innovation imbibed in its culture has a team that never stops working and is
              in constant search for creative solutions to the various challenges in the area of career planning and
              development. This tireless commitment has indeed paid its dividends by developing the Hikewise mechanism
              into India’s most comprehensive and effective career development solution in such a short time.
            </p>
          </div>
          <div className={style.infoGraphic}>
            <img className={style.infoGraphicStepImg} src={InforgraphicStepsImg} alt="" />
          </div>
        </div>

        <div className={style.whatSection}>
          <div className={style.sectionHeader}>
            WHAT MAKES HIKEWISE <span>UNIQUE ?</span>
          </div>

          <div className={clsx(style.graphic, style.left)}>
            <img src={UniqueLeftImg} alt="" />
          </div>

          <div className={clsx(style.graphic, style.right)}>
            <img src={UniqueRightImg} alt="" />
          </div>

          <div className={clsx(style.whatCards, style.hPadding)}>
            {_WHAT_CARDS_SPLIT.map((row) => (
              <section>
                {row.map((item) => (
                  <div className={style.card} key={item.title}>
                    <div className={style.image}>
                      <img src={item.img} alt="" />
                    </div>
                    <div className={style.title}>{item.title}</div>
                    <div className={style.text}>{item.text}</div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
        <PreFooterBanner />

        <Footer />
      </div>
    </>
  );
}
