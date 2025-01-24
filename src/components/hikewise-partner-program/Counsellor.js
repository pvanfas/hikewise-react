import React, { useState } from "react";
import style from "./Counsellor.module.scss";

// import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import Navbar from "components/navbar/Navbar";
import Button from "components/shared/Button";
import WithPadding from "components/shared/WithPadding";
import Footer from "components/footer/Footer";
import Clientelle from "components/shared/Clientelle";
import Media from "components/shared/Media";
import WithBanner from "components/shared/WithBanner";
import { isTokenPresent, splitArrChunks } from "utils/helper";

// import GetInTouch from "components/shared/GetInTouch";
// import Testimonials from "components/shared/Testimonials";

// import { IoIosCheckmarkCircle } from "react-icons/io";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0]] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context("assets/images/counsellor", true, /\.(png|jpe?g|svg|webp)$/));

// const WHY_CARDS = [
//   [
//     {
//       caption: "Scale up your practice",
//       title: `Go from local to national leverage a national platform to go big.`,
//       img: IMAGES["why_counsellor_1"],
//       body: [
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//       ],
//     },
//     {
//       caption: "Enhance quality Student experience",
//       title: `Go from local to national leverage a national platform to go big.`,
//       img: IMAGES["why_counsellor_2"],
//       body: [
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//       ],
//     },
//   ],
//   [
//     {
//       caption: "Scale up your practice",
//       title: `Go from local to national leverage a national platform to go big.`,
//       img: IMAGES["why_counsellor_3"],
//       body: [
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//         {
//           point: `Go from local to national leverage a national platform to go big.`,
//           desc: `Lorem Ipsum has been the to lorem ipsum industry s stand  industry's standard dummy text lorem ipsum industry ever since the 1500s.`,
//         },
//       ],
//     },
//   ],
// ];

const WHY = [
  `You get to use India’s most advanced and scientific career assessment 
tool that has been developed specifically for the Indian context after a 
very long and thorough research exercise`,
  `To get a holistic picture of your client’s psychometric profile and take
your career counselling practice to the next level`,
  `For the easiness of administering Hikewise with your clients`,
  `The intuitive dashboard gives you full control on managing your clients 
and tracking their results`,
  `The detailed resources made available on the dashboard help you interpret
the Hikewise report and make inferences`,
  `Test the entire dashboard before you actually start paying for it!`,
  `The availability of Hikewise mechanism in local languages`,
  `For the high quality career related resources that the Hikewise platform
offers`,
  `A very professional team that is always there to help you`,
  `To the start of a long term collaboration of mutual benefit!`,
];

// const PAYMENT_PLANS = [
//   {
//     name: "Agency",
//     price: "18000",
//     assessmentCount: 240,
//     additionalAssessment: true,
//     additionalTeamMemberCount: 5,
//     ownUrl: true,
//     seo: true,
//     preOwnedWeb: true,
//     coBranded: true,
//     whiteLabelled: true,
//   },
//   {
//     name: "Professional",
//     price: "6000",
//     assessmentCount: 240,
//     additionalAssessment: true,
//     additionalTeamMemberCount: 5,
//     ownUrl: true,
//     seo: true,
//     preOwnedWeb: true,
//     coBranded: true,
//     whiteLabelled: true,
//   },
//   {
//     name: "Starter",
//     price: "30000",
//     assessmentCount: 240,
//     additionalAssessment: true,
//     additionalTeamMemberCount: 5,
//     ownUrl: true,
//     seo: false,
//     preOwnedWeb: false,
//     coBranded: true,
//     whiteLabelled: false,
//   },
// ];

// const FEATURE_CARDS = [
//   { name: "Assessments", image: IMAGES["feature_assessments"] },
//   { name: "Career Research Tools", image: IMAGES["feature_research_tools"] },
//   {
//     name: "Career Guidance Automation Tools",
//     image: IMAGES["feature_auto_tools"],
//   },
//   { name: "Customised Website", image: IMAGES["feature_website"] },
//   { name: "Training & Support", image: IMAGES["feature_support"] },
// ];

export default function Counsellor() {
  // const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const navigate = useNavigate();

  function handleClickGetStarted() {
    window.open(" https://forms.gle/LFzjcjfajrFvY9tz5");
    // if (isTokenPresent()) {
    //   window.location.href = "/dashboard";
    // } else {
    //   navigate("/auth/register");
    // }
  }

  // function handleClickFeature(index) {
  //   setActiveFeatureIndex(index);
  // }

  // useEffect(animateFeatureImage, [activeFeatureIndex]);

  // function animateFeatureImage() {
  //   featureImageRef.current.classList.add(style["imageAnimation"]);
  //   window.setTimeout(() => {
  //     featureImageRef.current.classList.remove(style["imageAnimation"]);
  //   }, 700);
  // }

  // const featureImageRef = useRef();

  return (
    <div className={style.wrapper}>
      <Navbar background="white" />
      <WithPadding className={style.hero}>
        <div className={style.absoluteGraphic}>
          <img src={IMAGES["hero_oval"]} alt="" />
        </div>
        <div className={style.text}>
          <div className={style.header}>
            <div>Redefining the Career Development Ecosystem in India</div>
          </div>

          <div className={style.subheader}>
            Get an advanced & systematic technical platform to enhance your career counselling practice
          </div>

          <div className={style.paras}>
            <p>
              The Hikewise Partner Program has been designed to be the perfect companion for career counsellors across
              India for all their counselling practice needs.
            </p>
            <p>
              The intuitive interface for managing the test accounts and the user-friendly student tracking mechanism
              make using the Hikewise Partner Program a seamless process.
            </p>
          </div>

          <div className={style.button}>
            <Button onClick={handleClickGetStarted} options={{ width: "200px" }}>
              {isTokenPresent() ? "Get Started" : "  Register Now"}
            </Button>
          </div>
        </div>
        <div className={style.image}>
          <img src={IMAGES["hero"]} alt="" />
        </div>
      </WithPadding>

      {/* <WithPadding className={style.whySection}>
        <header>
          <p>
            Why become a <span>Hikewise</span> Partner Counsellor
          </p>
        </header>

        <div className={style.cards}>
          <div className={style.path}>
            <img src={IMAGES["why_path"]} alt="" />
          </div>
          {WHY_CARDS.map((cardRow, indexRow) => (
            <section>
              {cardRow.map((card, index) => (
                <article id={style[`why_card_${2 * indexRow + index + 1}`]}>
                  <span className={style.index}>
                    0{2 * indexRow + index + 1}
                  </span>
                  <span className={style.image}>
                    <img src={card.img} alt="" />
                  </span>
                  <div className={style.caption}>{card.caption}</div>
                  <div className={style.title}>{card.title}</div>

                  <div className={style.body}>
                    {card.body.map(({ point, desc }) => (
                      <div className={style.bodyItem}>
                        <div className={style.point}>{point}</div>
                        <div className={style.desc}>{desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className={style.button}>
                    <Button options={{ width: "150px" }}>
                      Download Brochure
                    </Button>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </WithPadding> */}

      <WithPadding className={style.whySection}>
        <header>
          <p>
            Why should you choose <span>Hikewise</span> Partner Program
          </p>
        </header>
        <section>
          {splitArrChunks(WHY, 2).map((row, indOut) => (
            <div className={style.row}>
              {row.map((point, indIn) => (
                <article>
                  <span>
                    <img src={IMAGES[`why${2 * indOut + indIn + 1}`]} alt="" />
                  </span>
                  <div>{point}</div>
                </article>
              ))}
            </div>
          ))}
        </section>
      </WithPadding>

      {/* <WithPadding className={style.features}>
        <header>Features that support your counselling practice</header>

        <section>
          <div className={style.image}>
            <img
              ref={featureImageRef}
              src={FEATURE_CARDS[activeFeatureIndex].image}
              alt=""
            />

            <div className={style.button}>
              <Button options={{ width: "170px" }}>View all feature</Button>
            </div>
          </div>
          <div className={style.cards}>
            {FEATURE_CARDS.map((feat, index) => (
              <article
                className={clsx(activeFeatureIndex === index && style.active)}
                onClick={handleClickFeature.bind(this, index)}
              >
                {feat.name}
              </article>
            ))}
          </div>
        </section>
      </WithPadding> */}

      {/* <WithPadding className={style.paymentPlans}>
        <header>Pricing that suits your needs</header>
        <div className={style.headerButton}>
          <div>Choose Payment Plans</div>
          <Button options={{ width: "100px" }}>Annually</Button>
        </div>

        <div className={clsx(style.plansMobile)}>
          {PAYMENT_PLANS.map((plan, index) => (
            <div className={style.card}>
              <div className={style.header}>
                <div className={style.name}>{plan.name}</div>
                <div className={style.price}>${plan.price}</div>
              </div>

              <div className={style.features}>
                <div className={style.title}>Features</div>

                <div className={style.row}>
                  <div className={style.headerName}>
                    Psychometric Assessments
                  </div>
                  <div className={style.field}>
                    {plan.assessmentCount} Includes Stream, Career or College
                    Assessments
                  </div>
                  <div className={style.field}>
                    Purchase Additional Assessments as per Requirement
                  </div>
                  <div className={style.field}>
                    {plan.additionalTeamMemberCount} Additional Team Members
                  </div>
                </div>

                <div className={style.row}>
                  <div className={style.headerName}>Customized Website</div>
                  {plan.ownUrl && <div className={style.field}>Own URL</div>}
                  {plan.seo && (
                    <div className={style.field}>
                      SEO Keywords and SSL Certificate
                    </div>
                  )}
                  {plan.preOwnedWeb && (
                    <div className={style.field}>
                      Integration in your pre-owned website
                    </div>
                  )}
                  {plan.coBranded && (
                    <div className={style.field}>CO Branded</div>
                  )}
                  {plan.whiteLabelled && (
                    <div className={style.field}>White Labelled</div>
                  )}
                </div>
              </div>

              <Button options={{ width: "100px" }}>Contact Us</Button>
            </div>
          ))}
        </div>

        <div className={style.plans}>
          <article id={style.captions}>
            <div className={style.header}></div>
            <div className={style.psychometric}>
              <div className={style.rowHeader}>Psychometric Assessments</div>
              <div className={clsx(style.cell)}>
                Includes Stream, Career or College Assessments
              </div>
              <div className={clsx(style.cell)}>
                Purchase Additional Assessments as per Requirement
              </div>
              <div className={clsx(style.cell)}>Additional Team Members</div>
            </div>
            <div className={clsx(style.customisedWebsite, style.section)}>
              <div className={style.rowHeader}>Customised Website</div>
              <div className={clsx(style.cell)}>Own URL</div>
              <div className={clsx(style.cell)}>
                SEO Keywords and SSL Certificate
              </div>
              <div className={clsx(style.cell)}>
                Integration in your pre-owned website
              </div>
              <div className={clsx(style.cell)}>CO Branded</div>
              <div className={clsx(style.cell)}>White Labelled</div>
            </div>
          </article>
          {PAYMENT_PLANS.map((plan) => (
            <article>
              <div className={style.header}>
                <div className={style.name}>{plan.name}</div>
                <div className={style.price}>$ {plan.price}</div>
                <div className={style.planType}>Billed Annually</div>
                <div className={style.button}>
                  <button>Contact Us</button>
                </div>
              </div>
              <div className={clsx(style.psychometric, style.section)}>
                <div className={style.rowHeader}></div>
                <div className={clsx(style.assessmentCount, style.cell)}>
                  {plan.assessmentCount}
                </div>
                <div className={clsx(style.cell, style.additionalAssessment)}>
                  {plan.additionalAssessment && (
                    <IoIosCheckmarkCircle size={30} />
                  )}
                </div>
                <div
                  className={clsx(style.additionalTeamMemberCount, style.cell)}
                >
                  {plan.additionalTeamMemberCount}
                </div>
              </div>
              <div className={clsx(style.customisedWebsite, style.section)}>
                <div className={style.rowHeader}></div>
                <div className={clsx(style.ownUrl, style.cell)}>
                  {plan.ownUrl && <IoIosCheckmarkCircle size={30} />}
                </div>
                <div className={clsx(style.seo, style.cell)}>
                  {plan.seo && <IoIosCheckmarkCircle size={30} />}
                </div>
                <div className={clsx(style.preOwnedWeb, style.cell)}>
                  {plan.preOwnedWeb && <IoIosCheckmarkCircle size={30} />}
                </div>
                <div className={clsx(style.coBranded, style.cell)}>
                  {plan.coBranded && <IoIosCheckmarkCircle size={30} />}
                </div>
                <div className={clsx(style.whiteLabelled, style.cell)}>
                  {plan.whiteLabelled && <IoIosCheckmarkCircle size={30} />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </WithPadding> */}

      <WithPadding>
        <Clientelle />
        <div style={{ marginTop: "4em" }}>
          <Media />
        </div>
      </WithPadding>

      <WithBanner className={style.banner}>
        <header>Ready to be a Hikewise Partner Counsellor</header>
        <div>Share your details and we will get in touch with you.</div>
        <div>
          <button onClick={handleClickGetStarted}>Register Now</button>
        </div>
      </WithBanner>

      {/* <WithPadding className={style.testimonials}>
        <Testimonials />
      </WithPadding> */}

      {/* <div className={style.getInTouch}>
        <GetInTouch />
      </div> */}

      <Footer />
    </div>
  );
}
