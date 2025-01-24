import React, { useState, useEffect } from "react";
import style from "./Page5.module.scss";

import Select from "react-select";
import clsx from "clsx";
import Navbar from "components/navbar/Navbar";
import { MdCheckCircle } from "react-icons/md";

import HeroLeftGraphic from "assets/images/PAGE5/hero_left.svg";
import HeroRightGraphic from "assets/images/PAGE5/hero_right.svg";

import { getRequest } from "utils/api";
import { splitArrChunks } from "utils/helper";

import Content1 from "assets/images/PAGE5/content_1.svg";
import Content2 from "assets/images/PAGE5/content_2.svg";
import Content3 from "assets/images/PAGE5/content_3.svg";
import Content4 from "assets/images/PAGE5/content_4.svg";
import Content5 from "assets/images/PAGE5/content_5.svg";
import Content6 from "assets/images/PAGE5/content_6.svg";
import Footer from "components/footer/Footer";
import PreFooterBanner from "components/shared/PreFooterBanner";
import WithPadding from "components/shared/WithPadding";
import ContentModal from "./ContentModal";
import Button from "components/shared/Button";

const _ABOUT_POINTS = [
  {
    title: `Career decisions should be based on scientific assessments and an equallstructured and scientifically 
curated post-assessment counselling mechanism.`,
  },
  {
    title: `Suitability of a particular career might also depend on aspects like socio-economic scenario, cultural and faith related factors, 
inherent talents etc., rather than just a person’s psychometric make-up.`,
  },
  {
    title: `In career assessment and planning process, a blend of both quantitative and qualitative methods should be used.`,
  },
  {
    title: `Participant-driven learning and decision making: Importance is given to strengthening the career selector’s abilities 
and skills to take responsibility for career development.`,
  },
  {
    title: `The role of the career guidance practitioner is to guide and create an environment for career discovery.`,
  },
  {
    title: `Comprehensive resources and advanced tools for career planning and development: An exhaustive career library 
framework and various other tools that make the process easier, effortless and also accessible to larger sections of society.`,
  },
];

const _CONTENT = [
  {
    img: Content1,
    title: "Personalized and holistic career guidance",
    text: "Every individual is unique and hence they should be handled differently. Learn why Hikewise’s personalized and holistic career guidance approach is path breaking in this field.",
    points: [
      "In our country, we don’t have a culture of systematic career guidance and hence most students are not receiving any career planning related help at all. And even for the small section of students who are fortunate enough to receive a little, they do get it from incompetent sources or through group sessions where there is no scope to afford any importance to the specific problems that each student faces.",
      `We believe that our country deserves much better in a very important field like career guidance which has a direct impact on how its future generations would shape up. And this belief is what has motivated us to create the highly scientific Hikewise mechanism which is designed to work at a personalised level for each individual and successfully provides a proper solution to their problems and requirements that are completely unique.`,
      `What makes our mechanism work is its holistic approach which is not just limited to psychometric traits but takes into consideration multiple other factors that are important in an individual’s career development process. These factors include their socio-economic background, past academic performance, leadership and other organisational skills, talents in specific fields, religious and cultural background and also the parent’s perspective about the individual.`,
    ],
  },
  {
    img: Content2,
    title: "Perfect combination of technology and human intelligence",
    text: "Learn more about how Hikewise eliminates the influence of human biases in the career development process by combining the power of machine learning and AI with the competence of highly skilled and well trained individuals.",
    points: [
      `From the very start, we knew that if we were to build a career development mechanism that yields good results, it would be a one where structured application of human intelligence is supported by a scientific and objective approach that comes without the baggage of biases and prejudices. And standing today, we are indeed proud of what we have achieved.`,
      `Our advanced mechanism borne out of extensive research successfully eliminates the influence of human biases using state of the art techniques like machine learning and artificial intelligence. And through our career development executive (CDE) training program, we have been able to produce highly skilled individuals who are well trained and equipped to effectively use such a mechanism.`,
      `Adding a further note, we see this CDE training program as our humble answer to the country’s acute shortage of able career development professionals. Statistics say that we are at least half a million short. Through our training program executed by eminent psychologists and industry experts through both online and offline channels, we intend to develop properly trained career development facilitators who can go on to serve our country’s growing needs.`,
      `Now, we have a built a unique mechanism but what purpose does it serve if it is not easily accessible to everyone who is in need of it..! Fortunately the advancements in technology and connectivity has helped us to solve this last piece of the puzzle as well. Our entire mechanism is offered through a robust dashboard that works on low-bandwidth internet connections as well, making it easily available even in the most rural parts of our country.`,
      `But all of this doesn’t make us complacent as we continuously strive to innovate wherever possible by adapting to the opportunities provided by newer and newer technological advancements as they come.`,
    ],
  },
  {
    img: Content3,
    title: "Resources",
    text: "In the sea of content that the internet represents, people find it very challenging to obtain quality information about something as dynamic as career fields. Lean how Hikewise decodes this challenge.",
    points: [
      `In the sea of content that the internet represents, people find it very challenging to obtain quality information about something as dynamic as career fields. Many a time, filtering out what is exactly needed becomes impossible as the information available is either below par in terms of quality or is completely spread and unorganised.`,
      `Having sensed the immense amount of value it can provide to young students if such quality information is made available to them at the right time, we took it upon us to make clear provisions in our mechanism that cater to this very important problem. Through our mechanism, each individual is offered a well defined set of resources that is not just limited to quality career information but is a multidimensional mix of various online and offline solutions that help them with their unique aspirations and requirements.`,
      `But seeing the bigger picture, we have decided to offer a general version of this set of comprehensive career related resources which will be accessible to everyone through our website. We do this through multiples channels like the Hikewise blog, guides and an upcoming career library that can very well be called India’s best.`,
    ],
  },
  {
    img: Content4,
    title: "Institutional level career guidance",
    text: "Learn more about how Hikewise is planning to create a long lasting change through intelligent associations with other stakeholders in the domain.",
    points: [
      `In our country, 85% of its students are deeply concerned about their options for higher education but an abysmal proportion of 92% don't get even the tiniest form of career related guidance from their schools. The country is surely in need of a pathbreaking intervention. But in a place as vast and diverse as India, bringing about a change of the stature that we are intending to make is by no means a simple task.`,
      `We understand that any far-reaching and long lasting change can only be made through intelligent associations with other stakeholders in the domain. And in this regard, we work along with schools and colleges around the country and help them inculcate a consistent career planning culture by setting up initiatives like career development cells in each institution.`,
      `We also provide an analytics driven platform to these institutions which aids them in making effective organisational decisions by taking meaningful insights about the what exactly their students are in need of.`,
    ],
  },
  {
    img: Content5,
    title: "A team that is defined by innovation and passion",
    text: "A dream of a bright future where everyone is able to achieve their full potential breaking through all societal barriers is what unites us. Learn more about the Hikewise team.",
    points: [
      `The beginnings of our firm root back to one of the most premier institutions in the country, IIT Kharagpur. The place, where some of the best brains of the country are indulged in many exciting discussions about the most path-breaking ideas, offered the perfect backdrop for a bunch of like-minded and passionate individuals to bond over a shared dream. We had gone on to work together and involve in various social causes aimed at alleviating the disparities in the economic strata of the communities around the campus.`,
      `These enlightening experiences helped us realize that the root cause of all the pervasive socio-economic variance in India is the lack of a professionally structured and effective education methodology that is inclusive of everyone. And the dream was born, the dream of a bright future where everyone is able to achieve their full potential breaking through all societal barriers and other impediments.`,
      `And after some years, armed with the experiences and insights gained from working in multifarious domains and the most advanced research facilities across the world, we brought about a team of quality educators, industry experts and talented technologists under the brand of Hikewise and started to work towards achieving this challenging yet exciting dream.`,
    ],
  },
  {
    img: Content6,
    title: "A reinvented educational ecosystem where access to education is unhindered",
    text: "We believe that every individual independent of their financial or social condition should have access to education of the highest quality. Learn more about Hikewise’s initiatives.",
    points: [
      `Our vision is a reinvented educational ecosystem where no reason, financial or social, hinders a person from their access to educational resources of the highest quality. We believe that the first and foremost step in turning this vision into action is bringing about proper awareness at the grassroot level on the importance of making wise choices in education and how not to lose track. We are conducting multiple activities, classes and webinars that work towards bringing this very important aim to fruition.`,
      `And to make our unique Hikewise mechanism available to people who might not have access to such systems due to different reasons, we have been associating with multiple NGOs around the country. We are looking forward to associating with more like minded NGOs, community based organisations and government bodies in the future so that we together can bring about a revolutionary change in our nation's career development ecosystem.`,
      `To stay true to our vision, we also offer an Hikewise Payment Waiver Program through which anyone from any part of the country can make use of our mechanism completely free of cost if they are unable to afford it.`,
    ],
  },
];

const colourStyles = {
  container: (styles, { isFocused }) => ({
    ...styles,
    borderColor: "transparent !important",
    marginRight: "1em",
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    boxShadow: "unset !important",
    borderColor: "#e6e6e6 !important",
    fontSize: "14px",
    backgroundColor: "white",
    borderRadius: "5px",
    width: "150px",
    minHeight: "0px",
    height: "32px",
    cursor: "pointer",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? "#9558C8" : "white",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#bfa0d9",
      },
    };
  },
  input: (styles) => ({ ...styles, color: "transparent" }),
};

const languages = {
  AS: "Assamese",
  BN: "Bengali",
  EN: "English",
  GU: "Gujarati",
  HI: "Hindi",
  KN: "Kannada",
  ML: "Malayalam",
  MR: "Marathi",
  OD: "Odia",
  PA: "Punjabi",
  TA: "Tamil",
  TE: "Telugu",
  UR: "Urdu",
};

const OPT_CATEGORY = [
  { label: "Rise", value: "RISE" },
  { label: "Sail", value: "SAIL" },
  { label: "Redesign", value: "REDESIGN" },
  { label: "Redesign Plus", value: "REDESIGN_PLUS" },
];

const OPT_LANGUAGES = [];
Object.entries(languages).forEach(([key, value]) => {
  OPT_LANGUAGES.push({ label: value, value: key });
});

export default function Page5() {
  const [experts, setExperts] = useState([]);

  const [filteredExperts, setFilteredExperts] = useState([]);

  const [searchString, setSearchString] = useState("");
  const [activeExpertId, setActiveExpertId] = useState(null);
  const [expertsSplit4, setExpertsSplit4] = useState([]);

  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(0);

  const [isOpenModalCounsellorContent, setIsOpenModalCounsellorContent] = useState(false);
  const [activeCounsellorContent, setActiveCounsellorContent] = useState("");

  function handleClickClearFilter() {
    setSearchString("");
    setFilteredExperts(experts);
    setSelectedDept(null);
    setSelectedLang(null);
  }

  function handleChangeFilterLang(lang) {
    const filtered = filteredExperts.filter((f) => f.cde_languages.includes(lang.value));
    setSelectedLang(lang);
    setFilteredExperts(filtered);
  }

  function handleChangeFilterCat(cat) {
    const filtered = filteredExperts.filter((f) => f.cde_departments.includes(cat.value));
    setFilteredExperts(filtered);
    setSelectedDept(cat);
  }

  function handleChangeSearch(e) {
    const { value } = e.target;
    setSearchString(value);
  }

  function handleClickExpert(id) {
    setActiveExpertId(id);
    if (id === activeExpertId) setActiveExpertId(null);
  }

  useEffect(() => {
    setExpertsSplit4(splitArrChunks(filteredExperts, 4));
  }, [filteredExperts]);

  const STR_LEN = 280;
  function getTruncatedBio(bio) {
    return bio.substring(0, STR_LEN);
  }

  function getExperts() {
    getRequest(`/counselling/career_experts`, { noAuth: true })
      .then((resp) => {
        // resp.data[0].cde_languages = ["EN"];
        // resp.data[1].cde_languages = ["HI"];
        // resp.data[1].cde_departments = ["RISE"];
        // resp.data[0].cde_departments = ["SAIL"];

        const withTruncBio = resp.data.map((item) => ({ ...item, bioTrunc: item.bio.substring(0, STR_LEN) }));
        setFilteredExperts(withTruncBio);
        setExperts(withTruncBio);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleModal(index) {
    if (index !== null && index !== undefined) setActiveModalIndex(index);

    setIsOpenModal((prev) => !prev);
  }

  function toggleModalCounsellorContent(index) {
    setIsOpenModalCounsellorContent((prev) => !prev);
  }

  function filterExperts() {
    let filterThem = experts.filter((expert) =>
      expert.fullname.toLowerCase().includes(searchString.toLowerCase().trim())
    );
    setFilteredExperts(filterThem);
  }

  useEffect(() => {
    getExperts();
  }, []);

  useEffect(() => {
    filterExperts();
  }, [searchString]);

  const isMobile = window.innerWidth < 1000;

  return (
    <>
      <Navbar background="white" />
      <div className={style.wrapper}>
        <div className={style.heroSection}>
          <div className={style.sectionHeader}>
            OUR <span>MISSION</span>
          </div>

          <div className={clsx(style.caption, style.hPadding)}>
            <h1>Inspire and Empower every Individual to Achieve their Career & Life Goals</h1>
          </div>

          <div className={clsx(style.graphic, style.heroLeft)}>
            <img src={HeroLeftGraphic} alt="" />
          </div>

          <div className={clsx(style.graphic, style.heroRight)}>
            <img src={HeroRightGraphic} alt="" />
          </div>
        </div>

        <div className={clsx(style.aboutSection, style.hPadding)}>
          <div className={style.sectionHeader}>
            ABOUT <span>HIKEWISE</span>
          </div>

          <div className={style.contentText}>
            <p>
              We are driven by our mission to help individuals discover a greater clarity of purpose and a flourishing
              drive of passion on whatever they go on to do with their lives. From increasing access to effective career
              development solutions for those who don’t have it, to guiding and developing those who do, we inspire the
              future workforce. Through the products, services and insights we deliver as an organization, we are
              helping individuals to become the best version of themselves.
            </p>
          </div>

          <div className={style.textBlack}>Our Approach to Career Development</div>

          <div className={style.list}>
            <ul>
              {_ABOUT_POINTS.map((item) => (
                <li>
                  <span>
                    <MdCheckCircle size={20} />
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={clsx(style.rowContents)}>
          {_CONTENT.map((item, index) => (
            <div className={clsx(style.row, style[`row${index}`], index % 2 && style.alt)}>
              <div className={style.image}>
                <img src={item.img} alt="" />
              </div>
              <div className={style.content}>
                <div className={style.title}>{item.title}</div>
                <div className={style.text}>
                  <div>{item.text}</div>
                  <Button options={{ width: "150px" }} onClick={toggleModal.bind(this, index)}>
                    View More
                  </Button>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>

        <WithPadding className={clsx(style.hPadding, style.expertsSection)}>
          <div className={style.header}>
            <div className={style.top}>
              <div className={style.sectionHeader}>
                OUR CAREER <span>EXPERTS</span>
              </div>

              <div className={clsx(style.filters)}>
                <Select
                  options={OPT_LANGUAGES}
                  styles={colourStyles}
                  placeholder="Select Language"
                  onChange={handleChangeFilterLang}
                  value={selectedLang}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                />

                <Select
                  options={OPT_CATEGORY}
                  styles={colourStyles}
                  placeholder="Select Category"
                  onChange={handleChangeFilterCat}
                  value={selectedDept}
                  components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                  }}
                />

                {(selectedDept !== null || selectedLang !== null) && (
                  <span onClick={handleClickClearFilter}>
                    <span>&times;</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={style.searchBar}>
            <form onChange={handleChangeSearch}>
              <div>
                <input value={searchString} type="text" name="searchBar" placeholder="Search name" />
              </div>
            </form>
          </div>

          <div className={style.experts}>
            <section>
              {expertsSplit4.map((expertRow) =>
                expertRow.map((expert) => (
                  <div
                    onClick={handleClickExpert.bind(this, expert.id)}
                    className={clsx(
                      style.expert,
                      isMobile ? style.active : expert.id === activeExpertId && style.active
                    )}
                    c
                  >
                    <div className={style.nonActive}>
                      <div className={style.image}>
                        <img src={expert.photo} alt="" />
                      </div>
                      <div className={style.name}>{expert.fullname}</div>
                    </div>

                    <div className={style.activePart}>
                      <div className={style.image}>
                        <img src={expert.photo} alt="" />
                      </div>
                      <div className={style.info}>
                        <div className={style.name}>{expert.fullname}</div>
                        <div className={style.tags}>
                          {expert.cde_departments.map((dept) => (
                            <span className={style.dept}>{dept}</span>
                          ))}
                          {expert.cde_languages.map((lang) => (
                            <span className={style.lang}>{languages[lang]}</span>
                          ))}
                        </div>
                        <p>
                          {expert.bioTrunc}
                          {expert.bio.length >= STR_LEN && (
                            <span
                              onClick={() => {
                                setIsOpenModalCounsellorContent(true);
                                setActiveCounsellorContent(
                                  { title: expert.fullname, points: [expert.bio] }
                                );
                              }}
                              className={style.readMore}
                            >
                              {" "}
                              Read More...
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </section>
          </div>
        </WithPadding>

        <ContentModal
          isOpen={isOpenModal}
          content={_CONTENT[activeModalIndex]}
          onClose={toggleModal.bind(this, null)}
        />

        {isOpenModalCounsellorContent && (
          <ContentModal
            isOpen={isOpenModalCounsellorContent}
            content={activeCounsellorContent}
            onClose={toggleModalCounsellorContent}
          />
        )}

        <PreFooterBanner />
        <Footer />
      </div>
    </>
  );
}
