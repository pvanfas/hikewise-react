import React, { useEffect, useState } from "react";
import style from "./WorkingProfessionals.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";
// import { BiCheck } from "react-icons/bi";

import { HiOutlineCheckCircle } from "react-icons/hi";
// import { GoChevronDown, GoChevronRight } from "react-icons/go";

import Navbar from "components/navbar/Navbar";
import Footer from "components/footer/Footer";
import WithPadding from "components/shared/WithPadding";
import Button from "components/shared/Button";
// import GetInTouch from "components/shared/GetInTouch";
// import Testimonials from "components/shared/Testimonials";
import { makePayment } from "components/payment/Payment";
import InlineLoader from "components/shared/InlineLoader";

// import { useUserContext } from "contexts/AllContexts";
// import { getRequest } from "utils/api";
// import PlanCard from "components/shared/PlanCard";
// import { useEffect } from "react";

import SwiperCore, { Autoplay, Pagination } from "swiper/core";
// import { Swiper, SwiperSlide } from "swiper/react";

import SectionTitle from "components/shared/SectionTitle";
import Reviews from "components/shared/Reviews";
import { getRequest } from "utils/api";
import PlanCard from "components/shared/PlanCard";

SwiperCore.use([Pagination, Autoplay]);

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0]] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context("assets/images/working-professionals", true, /\.(png|jpe?g|svg|webp)$/));

// const WHO_ARR = [
//   { title: `A personalised online career personalised online` },
//   { title: `A personalised online career personalised online` },
//   { title: `A personalised online career personalised online` },
//   { title: `A personalised online career personalised online` },
// ];

// const WHY_ARR = [
//   {
//     title: `A personalised online career personalised online`,
//     desc: `Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an `,
//   },
//   {
//     title: `A personalised online career personalised online`,
//     desc: `Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an `,
//   },
//   {
//     title: `A personalised online career personalised online`,
//     desc: `Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an `,
//   },
//   {
//     title: `A personalised online career personalised online`,
//     desc: `Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an `,
//   },
//   {
//     title: `A personalised online career personalised online`,
//     desc: `Lorem Ipsum has been the industry's standard
// dummy text ever since the 1500s, when an `,
//   },
// ];

const Plans = [
  {
    name: "Assess",
    subtext: "Career Assessment",
    price: "2400",
    features: [
      ` Multiple Trait Career Assessment`,
      `Career Interest Areas Assessment`,
      `Personality Aspects Assessment`,
      `Aptitude Assessment`,
      `Work Value Preferences Assessment`,
      `56-Page Career Assessment Report`,
      `A Detailed Picture of your Psychometric Profile`,
      `5 Best-Fit Career Recommendations`,
      `Detailed Career Info in the Form of Mind Maps`,
    ],
  },
  {
    name: "Guide",
    subtext: "Career Assessment + Counselling",
    price: "3400",
    features: [
      ` Multiple Trait Career Assessment`,
      `Career Interest Areas Assessment`,
      `Personality Aspects Assessment`,
      `Aptitude Assessment`,
      `Work Value Preferences Assessment`,
      `56-Page Career Assessment Report`,
      `A Detailed Picture of your Psychometric Profile`,
      `5 Best-Fit Career Recommendations`,
      `Detailed Career Info in the Form of Mind Maps`,
      `2-Month Online Support for all Career-Related Queries`,
      `Online one on one Counselling Session with our Career Experts`,
      `Comprehensive Action Plan for Your Holistic Development`,
      `Assistance on Possible Career Switches and Higher Education`,
      `Tailor Made Resources to Ease Your Career Path`,
      `Skill Building to Take Your Career to The Next Level`,
      `Aptitude Development Strategies`,
      `Areas to Focus in Academics/Work to Enhance Your Career`,
      `Personality Improvement Plans`,
      `Activities to Focus for Personal Development`,
    ],
  },
];

const STEPS_ARR = [
  {
    header: "Take the online career assessment",
    body: [
      "Once the client registers through our website, they will be given access to a personalized dashboard. He/she then takes a series of tests to help assess parameters like their interests, aptitude, emotional quotient, personality characteristics, and work-value preferences, which might take 2 to 2.5 hours to complete.",
      "The outcome of the first step is a detailed career assessment report of 50 odd pages that the client receives immediately after the completion of the assessment via the dashboard. The report features psychometric profiles of each parameter assessed, critical analysis, and strategies to improve these parameters. Our algorithm also suggests five career fields that may best suit the client.",
    ],
    img: "how1",
  },
  {
    header: "Collecting Additional Supporting Information",
    body: [
      "The client then fills three forms through the dashboard, including a general portfolio of personal information and a SWOT analysis. This is our attempt at contextualizing the individual’s career decision making within his/her socio-cultural milieu.",
    ],
    img: "how2",
  },
  {
    header: "One-on-One Counselling",
    body: [
      "Once all the data has been gathered a video session is scheduled with one of our career counsellors. The counsellor consults with other career development executives on our team and field experts, and analyses the case in light of the assessment and the additional supporting information. The observations are then shared with the client and a collaborative career development charting process follows.",
      "The outcome of step three is a detailed action plan which is drawn up in conversation with the client. It is geared not only to help the client progress career-wise but also to maximize the client’s overall personal development.",
    ],
    img: "how3",
  },
];

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

export default function WorkingProfessionals() {
  const navigate = useNavigate();
  // const userContext = useUserContext();

  // const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // function getPaymentPlans() {
  // setIsLoading(true);
  // getRequest(`/payment/plans?is_booster=false`, { noAuth: true })
  //   .then((resp) => {
  //     setPlans(resp.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  //   .finally(() => {
  //     setIsLoading(false);
  //   });
  // }

  function handleClickContinue(plan) {
    if (!isTokenPresent()) return navigate(`/auth/login?to=working-professionals`);

    setIsLoading(true);
    makePayment({
      plan: plan.code,
      name: "Hikewise",
      onSuccess: () => {
        window.location.href = "/dashboard/candidate/home";
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }

  function handleClickGetStarted() {
    if (isTokenPresent()) {
      window.location.href = "/dashboard";
    } else {
      navigate("/auth/register");
    }
  }

  const [plans, setPlans] = useState([]);
  function getPaymentPlans() {
    setIsLoading(true);

    getRequest(`/payment/plans?dept=REDESIGN_PLUS&is_booster=false`, {
      noAuth: true,
      removeTrailingSlash: true,
    })
      .then((resp) => {
        setPlans(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(getPaymentPlans, []);

  return (
    <div className={style.wrapper}>
      <Navbar background={"white"} />

      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader size={150} />
        </div>
      ) : (
        <>
          <WithPadding className={style.hero}>
            <div className={style.absolute}>
              <img src={IMAGES["hero_oval"]} alt="" />
            </div>
            <div className={style.text}>
              <div className={style.header}>
                Re-Imagine your career with <span>Hikewise</span>
              </div>
              <div className={style.subheader}></div>
              <p>
                It takes courage to rethink your profession, but it's not always simple to do it in the best way. We can
                assist you in utilising your current skill-sets and interests to identify the professional path that
                will lead to your satisfaction and success.
              </p>
              <p>
                Don't let fate determine your future. Discover your innate potential and the career path you're supposed
                to follow with the help of Hikewise Career Development Mechanism for Working Professionals.
              </p>
              <div className={style.button}>
                <Button onClick={handleClickGetStarted} options={{ width: "150px" }}>
                  Get Started
                </Button>
              </div>
            </div>
            <div className={style.image}>
              <img src={IMAGES["hero"]} alt="" />
            </div>
          </WithPadding>

          <WithPadding className={style.howSection}>
            <header>
              <SectionTitle>
                <span>How it</span> <span>works</span>
              </SectionTitle>
            </header>

            <div className={style.steps}>
              {STEPS_ARR.map((step, index) => (
                <div className={style.step}>
                  <div className={style.left}>
                    <div>Step {index + 1}</div>
                    <div>{step.header}</div>
                    <div className={style.body}>
                      {step.body.map((point) => (
                        <p>{point}</p>
                      ))}
                    </div>
                  </div>
                  <div className={style.right}>
                    <img src={IMAGES[step.img]} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </WithPadding>

          <WithPadding className={style.whySection}>
            <header>
              Why Choose <span>Hikewise</span> over other online career counselling platforms ?
            </header>
            <div className={style.content}>
              <div className={style.body}>
                <p>
                  Both our assessment and counselling are designed to tackle the unique problem that each instance of
                  career decision making is, and to find a solution to it. The problem is seen as multi-layered, with
                  each case being a unique combination of individual characteristics and contextual factors. And in each
                  step along our process, we seek to arrive at a solution that is suited to all these layers.
                </p>
                <p>
                  Secondly, unlike conventional career guidance services, our counsellors on an average spend around 8+
                  hours on a single case, which means devoting almost an entire working day to one client. 4 to 5 hours
                  are spent in pre-counselling preparation in consultation with the team and outside experts in
                  analysing the data from the assessment. The counselling takes around an hour and drawing up the action
                  plan may take up to 4 hours. What is important to note is that the counselling sessions with Hikewise
                  career development executives are not merely a relaying of the results from the assessment or just a
                  report-interpretation session.
                </p>
                <p>
                  At any cost, we do not want to leave our clients undecided or in a state of confusion, and the action
                  plan is a structured way to work towards a solution. We believe that career guidance is not a single
                  episode of decision-making but a process that needs continuous tracking and inputs. In addition to our
                  initial assessment and counselling, we also offer continued mentorship to clients.
                </p>
                <p>
                  Given the time investment on part of our team of counsellors and the comprehensiveness of our career
                  development program, our packages are quite affordable.
                </p>
              </div>
              <div className={style.image}>
                <img src={IMAGES["why"]} alt="" />
              </div>
            </div>
          </WithPadding>

          <WithPadding className={style.plans}>
            <header>
              Let's help you <span> redesign your career journey</span>
              <div>Choose a program that's right for you</div>
            </header>

            <div className={style.cards}>
              <div className={style.cards}>
                {plans.map((plan) => (
                  <PlanCard
                    className={clsx(style.card, plan.isActive ? style.active : style.inActive)}
                    plan={plan}
                    handleClickContinue={handleClickContinue}
                  />
                ))}
              </div>

              {/* {Plans.map(({ name, subtext, price, features }, index) => (
                <article className={clsx(index === 1 && style.active)}>
                  <div className={style.name}>{name}</div>
                  <div className={style.subtext}>{subtext} </div>

                  <div className={style.price}>&#8377; {price}</div>

                  <ul>
                    {features.map((feat) => (
                      <li>
                        <HiOutlineCheckCircle size={15} /> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className={style.footer}>
                    <div>View Sample Report</div>
                    {index === 1 && <div>View Action Plan</div>}
                  </div>

                  <div className={style.button}>
                    <Button onClick={handleClickContinue} options={{ width: "120px" }}>
                      Continue
                    </Button>
                  </div>
                </article>
              ))} */}
            </div>
          </WithPadding>

          <div style={{ paddingTop: "3em" }}>
            <Reviews />
          </div>

          {/* <WithPadding className={style.who}>
            <div className={style.image}>
              <img src={IMAGES["who_graphic"]} alt="" />
            </div>

            <div className={style.content}>
              <header>
                Who can join in <span>Hikewise?</span>
              </header>
              <div className={style.body}>
                {WHO_ARR.map((point) => (
                  <article>
                    <div className={style.point}>
                      <span>
                        <BiCheck />
                      </span>
                      {point.title}
                    </div>
                  </article>
                ))}
              </div>
              <div className={style.button}>
                <Button options={{ width: "100px" }}>View more</Button>
              </div>
            </div>
          </WithPadding> */}

          {/* <WithPadding className={clsx(style.who, style.alt)}>
            <div className={style.image}>
              <img src={IMAGES["why_graphic"]} alt="" />
            </div>

            <div className={style.content}>
              <header>
                Why are we checking your <span>Eligibility?</span>
              </header>
              <div className={style.body}>
                {WHY_ARR.map((point) => (
                  <article>
                    <div className={style.point}>
                      <span>
                        <BiCheck />
                      </span>
                      {point.title}
                    </div>

                    <div className={style.desc}>{point.desc}</div>
                  </article>
                ))}
              </div>
              <div className={style.button}>
                <Button options={{ width: "100px" }}>View more</Button>
              </div>
            </div>
          </WithPadding> */}

          {/* <WithPadding className={style.plans}>
            <header>
              OUR <span>Certified Career Counsellors</span>
            </header>

            <div className={style.text}>
              <p>
                A personalised online career guidance platform that works for
                everyone
              </p>
            </div>

            <div
              className={style.cards}
              id="Working_Professionals_Plans_Carousel"
            >
              <Swiper
                pagination={{ clickable: true }}
                navigation={false}
                slidesPerView={"auto"}
                spaceBetween={30}
                allowTouchMove={true}
                speed={1000}
              >
                {plans.map((plan) => (
                  <SwiperSlide className={style.slide} key={plan.id}>
                    <PlanCard
                      plan={plan}
                      handleClickContinue={handleClickContinue}
                      className={style.planCard}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </WithPadding> */}

          {/* <div className={style.getInTouch}>
            <GetInTouch />
          </div> */}

          {/* <WithPadding className={style.testimonials}>
            <Testimonials />
          </WithPadding> */}
          <Footer />
        </>
      )}
    </div>
  );
}
