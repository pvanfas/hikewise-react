import React from "react";
import style from "./Iccc.module.scss";

import { useNavigate } from "react-router-dom";
// import clsx from "clsx";

import Navbar from "components/navbar/Navbar";
import Button from "components/shared/Button";
import WithPadding from "components/shared/WithPadding";
import Footer from "components/footer/Footer";

import HeroImg from "assets/images/iccc/hero.webp";
// import GetInTouch from "components/shared/GetInTouch";
// import Testimonials from "components/shared/Testimonials";

// import { getRequest } from "utils/api";
import { isTokenPresent } from "utils/helper";
import CLientelleOld from "components/shared/ClientelleOld";
import Media from "components/shared/Media";
import WithBanner from "components/shared/WithBanner";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "").split(".")[0]] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context("assets/images/iccc", true, /\.(png|jpe?g|svg|webp)$/));

const WHY_CARDS = [
  {
    title: `Learn from experts & gain mastery through practice`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
  {
    title: `Build a career in career coaching & Be a part of this recession proof industry`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
  {
    title: `Enhance your profile & Strengthen your professional network`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
  {
    title: `Be the go-to person within family, friends & community`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
  {
    title: `Start your career counselling practice with Hikewise`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
  {
    title: `Create a holistic career development ecosystem in your institution`,
    body: `Career guidance programs to provide end-to-end career guidance, catering to the needs of everyone involved in the career decision-making
`,
  },
];

const WHO_CARDS = [
  [
    {
      title: "School Heads, Teachers and Educators",
      points: [
        "Learn the latest career counselling tools & techniques",
        "Strengthen your expertise with systematic & structured training",
        "Diversify your career in the education industry",
        "Earn credibility",
        "Start your independent Counselling Practice",
      ],
      img: IMAGES["who_1"],
    },
    {
      title: "Counsellors, Psychologists and Special Educators",
      points: [
        "Earn credibility",
        "Diversify your career in the education industry",
        "Garner skills that help you better relate school subjects and future careers to guide students in your classrooms",
        "Take up the additional role of a career counsellor in your school",
        "Strengthen your professional profile",
      ],
      img: IMAGES["who_2"],
    },
  ],
  [
    {
      title: "HR Professionals, Life-skills and Soft-skills trainers",
      points: [
        "Gain expertise that enables you to practice Career Counselling in addition to your regular therapy practice",
        "Diversify your career & build a larger clientele",
        "Start your independent Career Counselling Practice",
        "Expand your services by offering comprehensive career guidance solutions",
        "Earn credibility",
      ],
      img: IMAGES["who_3"],
    },
    {
      title: "Engineers, Homemakers and Administrators",
      points: [
        "Enter the Career Coaching industry with a strong foundation",
        "Strengthen your expertise with systematic & structured training",
        "Build on your industry experience to establish your reputation in the field of Career Counselling",
        "Earn credibility",
        "Start a career as a Career Coach",
      ],
      img: IMAGES["who_4"],
    },
  ],
  [
    {
      title: "Housemakers & Retired Personnel",
      points: [
        "Restart your Career",
        "Embark on a career option that provides the ease of working as a freelancer and working at your own spaces",
        "Learn the latest career counselling tools & techniques",
        "Strengthen your expertise with systematic & structured training",
        "Empower yourself with the knowledge to guide children in your society, locality, community, etc",
      ],
      img: IMAGES["who_5"],
    },
    {
      title: "Engineers & College Students",
      points: [
        "Get a well-rounded kickstart to enter a career in the education industry",
        "Learn the latest career counselling tools & techniques",
        "Strengthen your expertise with systematic & structured training",
        "Earn credibility",
        "Build your career as a Career Coach",
      ],
      img: IMAGES["who_6"],
    },
  ],
];

export default function Iccc() {
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleClickGetStarted() {
    // if (isTokenPresent()) window.location.href = "/dashboard";
    // else navigate("/auth/register");
    window.open("https://forms.gle/mc6DvLo1dAex6FHR7");
  }

  // const [trainersAll, setTrainersAll] = useState([]);
  // const [trainersFiltered, setTrainersFiltered] = useState([]);

  // const [searchString, setSearchString] = useState("");
  // const [activeTrainerId, setActiveTrainerId] = useState(null);
  // const [trainersSplit4, setTrainersSplit4] = useState([]);

  // function handleChangeSearch(e) {
  //   const { value } = e.target;
  //   setSearchString(value);
  // }

  // function handleClickTrainer(id) {
  //   setActiveTrainerId(id);
  //   if (id === activeTrainerId) setActiveTrainerId(null);
  // }

  // function filterExperts() {
  //   if (!searchString) return setTrainersFiltered(trainersAll);

  //   let filterThem = trainersAll.filter((expert) =>
  //     expert.name.toLowerCase().includes(searchString.toLowerCase().trim())
  //   );
  //   setTrainersFiltered(filterThem);
  // }

  // function getTrainers() {
  //   setIsLoading(true);
  //   getRequest(`/web/master_trainers`, { noAuth: true })
  //     .then((resp) => {
  //       setTrainersAll(resp.data);
  //       setTrainersFiltered(resp.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  // setTrainersSplit4(splitArrChunks(trainersFiltered, 4));
  // }, [filterExperts]);

  // useEffect(filterExperts, [searchString]);
  // useEffect(getTrainers, []);

  // const isMobile = window.innerWidth < 1000;

  return (
    <div className={style.wrapper}>
      <Navbar background={"white"} />

      <WithPadding className={style.hero}>
        <div className={style.text}>
          <div className={style.absoluteGraphic}>
            <img src={IMAGES["hero_oval"]} alt="" />
          </div>
          <div className={style.header}>
            <div>Certified Career Development</div>
            <div>Executive (CCDE)</div>
          </div>
          <div className={style.subheader}>India’s Most Advanced Career Counselling Certification Program</div>
          <div className={style.para}>
            An expert-led certification program that emphasizes on best practices in the field of career counselling,
            experiential learning, and cutting-edge career development tools. The CCDE program is aimed at helping
            professionals build an exciting career in the career guidance space.
          </div>
          <div className={style.button}>
            <Button onClick={handleClickGetStarted} options={{ width: "200px" }}>
              {isTokenPresent() ? "Get Started" : "  Enroll Now"}
            </Button>
          </div>
        </div>
        <div className={style.image}>
          <img src={HeroImg} alt="" />
        </div>
      </WithPadding>

      <WithPadding className={style.whySection}>
        <div className={style.info}>
          <header>Why Enroll in CCDE</header>
          <div className={style.subheader}>Career coaching is going through a “great awakening”</div>
          <p>
            With the introduction of NEP 2020, a paradigm shift is occurring in India with Governments, Universities,
            Educational Boards and Schools beginning to understand the significance of career assessment and
            counselling. The demand for Career Counselors is a pan-Indian one; students across the country are in need
            of career guidance to make informed decisions. India needs about 1.5 million counselors for its 3.5 crore
            student population. The best positioned to fill this shortage of competent career counselling practitioners
            will be skilled and certified career development executives.
          </p>
          <Button onClick={handleClickGetStarted} options={{ width: "200px" }}>
            {isTokenPresent() ? "Get Started" : "  Register Now"}
          </Button>
        </div>
        <div className={style.cards}>
          {WHY_CARDS.map((card, index) => (
            <article id={style[`card_${index + 1}`]}>
              <div className={style.image}>
                <img src={IMAGES[`why${index + 1}`]} alt="" />
              </div>
              <div className={style.title}>{card.title}</div>
            </article>
          ))}
        </div>
      </WithPadding>

      {/* <WithPadding className={style.trainers}>
        <header>Master Trainers Anchoring the Program</header>
        <div className={style.searchBar}>
          <form onChange={handleChangeSearch}>
            <div>
              <input type="text" name="searchBar" placeholder="Search name" />
            </div>
          </form>
        </div>

        <div className={style.trainers}>
          {trainersSplit4.map((trainersRow) => (
            <section>
              {trainersRow.map((trainer) => (
                <article
                  onClick={handleClickTrainer.bind(this, trainer.id)}
                  className={clsx(
                    isMobile
                      ? style.active
                      : trainer.id === activeTrainerId && style.active
                  )}
                >
                  <div className={style.nonActive}>
                    <div className={style.image}>
                      <img src={trainer.photo} alt="" />
                    </div>
                    <div className={style.name}>{trainer.name}</div>
                  </div>

                  <div className={style.activePart}>
                    <div className={style.image}>
                      <img src={trainer.photo} alt="" />
                    </div>
                    <div className={style.info}>
                      <div className={style.name}>{trainer.name}</div>
                      <div className={style.designation}>
                        {trainer.designation}
                      </div>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Fugit nihil blanditiis ipsam quibusdam, eum sequi
                        sed harum perspiciatis similique, assumenda nesciunt
                        fugiat cupiditate placeat aliquid odit voluptatum at
                        accusamus voluptates!
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
      </WithPadding> */}

      <WithPadding className={style.whoSection}>
        {/* <div className={style.absolute}>
          <img src={IMAGES["who_path"]} alt="" />
        </div> */}
        <header>Who can Enroll?</header>
        {/* <div className={style.para}>
          <p>
            Selected from a pool of highly talented applicants, over 27,000
            educators and professionals from diverse backgrounds have earned the
            ICCC certification since the program's inception in 2018
          </p>
        </div> */}

        <div className={style.cards}>
          {WHO_CARDS.map((cardRow, indexRow) => (
            <section className={style.row}>
              {cardRow.map((card, index) => (
                <article id={style[`who_card_${2 * indexRow + index + 1}`]}>
                  <div className={style.top}>
                    <span className={style.index}>0{2 * indexRow + index + 1}</span>
                    <span className={style.image}>
                      <img src={card.img} alt="" />
                      <span className={style.line}></span>
                    </span>
                  </div>
                  <div className={style.title}>{card.title}</div>
                  <div className={style.points}>
                    {card.points.map((point) => (
                      <div>
                        <span></span>
                        {point}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>

        {/* <div className={style.button}>
          <Button options={{ width: "200px" }}>Download Brochure</Button>
        </div> */}
      </WithPadding>

      <WithBanner className={style.banner}>
        <header>Become a Certified Career Development Executive (CCDE) with Hikewise</header>
        <div className={style.text}>Join India’s Most Advanced Career Counselling Certification Program</div>
        <div>
          <button onClick={handleClickGetStarted}>Register Now</button>
        </div>
      </WithBanner>

      {/* <div className={style.getInTouch}>
        <GetInTouch />
      </div> */}

      <WithPadding className={style.testimonials}>
        <CLientelleOld />
        <div style={{ marginTop: "3em" }}>
          <Media />
        </div>
      </WithPadding>

      <Footer />
    </div>
  );
}
