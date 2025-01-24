import React from "react";
import style from "./Institute.module.scss";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import Media from "components/shared/Media";
import Button from "components/shared/Button";
import Footer from "components/footer/Footer";
import Clientelle from "components/shared/Clientelle";
import WithPadding from "components/shared/WithPadding";
// import ClientelleOld from "components/shared/ClientelleOld";
import NavbarInstitutions from "components/navbar-institutions/NavbarInstitutions";

import { isTokenPresent } from "utils/helper";
import SectionTitle from "components/shared/SectionTitle";
function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0]] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context("assets/images/institute", true, /\.(png|jpe?g|svg|webp)$/));

const WHY_ARR = [
  {
    title: "India’s most comprehensive multi-dimensional career assessment",
    points: [
      {
        point: "State of the art technology",
      },
      {
        point: "Multiple trait Stream/Career Assessment",
      },
      {
        point: "Intuitive user interface",
      },
      {
        point: "Available in multiple languages",
      },
    ],
  },
  {
    title: "Exhaustive assessment report",
    points: [
      {
        point: "Critical analysis of the score in each trait",
      },
      {
        point: "Improvement strategies",
      },
      {
        point: "Best fit streams based on psychometric profile",
      },
      {
        point: "Comprehensive information on career opportunities",
      },
    ],
  },
  {
    title: "Scientifically curated post assessment counselling mechanism",
    points: [
      {
        point: "Counselling session with dedicated career experts",
      },
      {
        point: "Easily accessible to anyone from any part of the country",
      },
      {
        point: "Vital importance to parent’s perspective",
      },
      {
        point: "Holistic action plan",
      },
    ],
  },
  {
    title: "Continuous mentoring and exhaustive pool of career resources",
    points: [
      {
        point: "Continuous mentoring",
      },
      {
        point: "Chat support for all career related queries",
      },
      {
        point: "Exhaustive set of resources on the hikewise website",
      },
    ],
  },
];

export default function Iccc() {
  function handleClickGetStarted() {
    window.open("https://forms.gle/sro7ZTRdFdovogC76");
  }

  return (
    <div className={style.wrapper} id="schools">
      <NavbarInstitutions background={"white"} />

      <WithPadding className={style.hero}>
        <div className={style.absoluteGraphic}>
          <img src={IMAGES["hero_oval"]} alt="" />
        </div>
        <div className={style.text}>
          <div className={style.header}>
            <div>Career Development & Planning Mechanism for Institutions</div>
          </div>

          <div className={style.para}>
            Career Assessment and Counselling at an institutional level has the potential to make a profound societal
            impact owing to the data-driven insights it can provide. Institutional level hikewise solutions are designed
            to cater to any organization associated with the field of education like schools, colleges, social
            enterprises, NGOs and government bodies.
          </div>
          <div className={style.button}>
            <Button onClick={handleClickGetStarted} options={{ width: "200px" }}>
              {isTokenPresent() ? "Get Started" : "  Register Now"}
            </Button>
          </div>
        </div>
        <div className={style.images}>
          <div className={style.col1}>
            <div className={style.image}>
              <img alt="" src={IMAGES["colleges"]} />
              <div>Colleges</div>
            </div>
          </div>
          <div className={style.col2}>
            <div className={style.image}>
              <img alt="" src={IMAGES["schools"]} />
              <div>Schools</div>
            </div>

            <div className={style.image}>
              <img alt="" src={IMAGES["organizations"]} />
              <div>Organizations</div>
            </div>
          </div>
        </div>
      </WithPadding>

      <WithPadding id="problem" className={clsx(style.infographic, style.infographic1)}>
        <div className={style.title}>Tackling the problem of ineffective career planning and development</div>
        <div className={style.img}>
          <img alt="" src={IMAGES["infographic1"]} />
        </div>
      </WithPadding>

      <WithPadding className={clsx(style.infographic, style.infographic2)}>
        <div className={style.title}>
          Combining technology and human expertise to provide personalized and actionable solutions
        </div>
        <div className={style.img}>
          <img alt="" src={IMAGES["infographic2"]} />
        </div>
      </WithPadding>

      <div className={style.clientelle}>
        {/* <div className={style.top}>
          <div className={style.absolute}>50000</div>

          <div className={style.title}>Loved By</div>
          <div className={style.numbers}>
            <span className={style.bold}>50,000+</span>
            <span className={style.black}>
              Students/Professionals From Institutions Across India
            </span>
          </div>
        </div> */}

        {/* <Clientelle /> */}
      </div>

      <WithPadding id="why_hikewise" className={style.why}>
        <div className={style.left}>
          <div className={style.title}>
            Why <span>Hikewise</span>
          </div>
          <div className={style.image}>
            <img src={IMAGES["why"]} alt="" />
          </div>
          <div className={style.button}>
            <Button onClick={handleClickGetStarted} options={{ width: "180px" }}>
              Register Now
            </Button>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.row}>
            {WHY_ARR.slice(0, 2).map((why, indOut) => (
              <article>
                <div className={style.title}>{why.title}</div>
                <div className={style.points}>
                  {why.points.map((point, indIn) => (
                    <div className={style.point}>
                      <span>
                        <img src={IMAGES[`why${indOut + 1}_${indIn + 1}`]} alt="" />
                      </span>
                      <span>{point.point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className={style.row}>
            {WHY_ARR.slice(2, 4).map((why, indOut) => (
              <article>
                <div className={style.title}>{why.title}</div>
                <div className={style.points}>
                  {why.points.map((point, indIn) => (
                    <div className={style.point}>
                      <span>
                        <img src={IMAGES[`why${indOut + 1}_${indIn + 1}`]} alt="" />
                      </span>
                      <span>{point.point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </WithPadding>

      <WithPadding className={style.howSection} id="how_it_works">
        <SectionTitle className={style.secTitle}>
          How IT <span> WORKS</span>
        </SectionTitle>
        <img src={IMAGES["how_it_works"]} alt="how infographic" />
      </WithPadding>

      <WithPadding style={{ marginTop: "3em" }}>
        <Clientelle />
      </WithPadding>

      <WithPadding style={{ marginTop: "50px" }}>
        <Media />
      </WithPadding>

      <Footer />
    </div>
  );
}
