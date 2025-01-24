import React from "react";
import style from "./Footer.module.scss";

import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import Button from "components/shared/Button";
import WithPadding from "components/shared/WithPadding";

import LogoImg from "assets/images/logo.svg";

// import FacebookImg from "assets/images/landing/facebook.png";
// import TwitterImg from "assets/images/landing/twitter.png";
// import YoutubeImg from "assets/images/landing/youtube.png";
// import InstaImg from "assets/images/landing/instagram.png";

import { BsTelephoneFill } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";

const images = [
  {
    img: <FaInstagramSquare size={34} style={{ marginTop: "-2px" }} />,
    link: "https://www.instagram.com/hikewise_official/",
  },
  {
    img: <BsLinkedin size={30} />,
    link: "https://in.linkedin.com/company/vlead-eduventures",
  },
];

const Links1 = [
  { name: "Class 8-9 Students", link: "/rise" },
  { name: "Class 10-11-12 Students", link: "/sail" },
  { name: "College Student/Graduates", link: "/redesign" },
  { name: "Working Professionals", link: "/working-professionals" },
  { name: "Certified Career Development Executive", link: "/ccde" },
  { name: "Hikewise Partner Program", link: "/partner-program" },
];

const Links2 = [
  { name: "Hikewise for Institutions", link: "/institutions" },
  { name: "About Us", link: "/about" },
  { name: "Terms & Conditions", link: "/t&c" },
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Disclaimer", link: "/disclaimer" },
  { name: "Contact Us", link: "/contact-us" },
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className={style.wrapper}>
      <WithPadding className={style.header}>
        <div className={style.left}>
          <div className={style.text}>
            <div>Got career-related doubts?</div>
            <div>Talk to our experts!</div>
          </div>
          <Button
            options={{ width: "160px", height: "40px" }}
            onClick={() => {
              navigate("/assessment/demo");
            }}
          >
            Take Free Demo
          </Button>
        </div>

        <div>
          <div className={clsx(style.text, style.textGray)}>
            <div>Call Us</div>
            <div>Feel free to reach out to us with anything you need</div>
          </div>
          <div className={clsx(style.socialHandles, style.buttons)}>
            <a href="tel:7593929394">
              <button class={style.btnTele}>
                <BsTelephoneFill size={15} />
                +91 7593929394
              </button>
            </a>

            <a href="https://wa.me/+7593929394" target="_blank" rel="noreferrer">
              <button className={style.btnWhatsapp}>
                <RiWhatsappFill size={18} />
                +91 7593929394
              </button>
            </a>
          </div>
        </div>

        <div className={style.right}>
          <div className={clsx(style.text, style.textGray)}>
            <div>Stay Connected</div>
            <div>Stay updated with latest career trends and insights.</div>
          </div>
          <div className={style.socialHandles}>
            {images.map((image) => (
              <span
                onClick={() => {
                  window.open(image.link);
                }}
              >
                {image.img}
              </span>
            ))}
          </div>
        </div>
      </WithPadding>

      <WithPadding className={style.main}>
        <div className={clsx(style.logo, style.col)}>
          <div className={style.image}>
            <img src={LogoImg} alt="" />
          </div>
          <div>© 2023 Hikewise | vLEAD </div>
          <div>Management</div>
          <div>Consultancy Private Limited</div>
        </div>

        <div className={style.linksWrapper}>
          <div className={clsx(style.linksOne, style.col, style.links)}>
            {Links1.map(({ name, link }) => (
              <Link className={style.link} to={link}>
                {name}
              </Link>
            ))}
          </div>
          <div className={clsx(style.linksTwo, style.col, style.links)}>
            {Links2.map(({ name, link }) => (
              <Link className={style.link} to={link}>
                {name}
              </Link>
            ))}
          </div>
          <div className={clsx(style.linksThree, style.col, style.address)}>
            <div className={style.line}>Empora Views, Malaparamba Jn,</div>
            <div className={style.line}>Kozhikode, Kerala - 673009</div>
            <div className={style.line}>hello@hikewise.com</div>
            <div className={style.line}>+91 7593929394</div>
          </div>
        </div>
      </WithPadding>

      <div className={style.hr}></div>

      <WithPadding>
        <footer>
          <section>
            <div className={style.title}>About Hikewise</div>
            <p>
              The formulation of Hikewise was done on the basis of a bottom-up approach by thoroughly analysing and
              evaluating the exact needs and requirements of the various stakeholders in the career guidance and career
              counselling process like the students, parents, and other facilitators like teachers. The development
              phase of the test saw a team of highly qualified researchers with an academic background from world class
              universities like IIT Kharagpur, IIT Madras, Eindhoven University of Technology Netherlands, National
              University of Singapore, University of Hyderabad, Delhi University and NIT Calicut spending more than
              18000 quality man hours under the guidance of experienced psychometricians from around the world.
            </p>
          </section>

          <section>
            <div className={style.title}>What is Hikewise's Career Assessment Test</div>
            <p>
              Hikewise is a state of the Art Analytics Driven Career Assessment Tool. Hikewise's career assessment test
              is based on an extensive scientific framework that has been formulated after closely observing the various
              advancements in the field of psychometrics. The Hikewise Report which is generated on the successful
              completion of the career assessment test provides detailed information and analysis on five key
              psychometric dimensions: Interest, Personality, Aptitude, Work Value Preferences and EQ along with career
              fields that are best fit for an individual. The assessment test employs highly advanced scientific methods
              like Artificial Intelligence and Machine Learning, and sophisticated statistical tools like Factor
              Analysis and Analytical Hierarchy Process
            </p>
          </section>

          <section>
            <div className={style.title}>
              What is Hikewise's online career counselling and career guidance mechanism
            </div>
            <p>
              We at Hikewise beleives that career counselling and career guidance is meant to make more enriched careers
              and personal lives, not for just a single career decision. Hikewise's online career counselling and career
              guidance mechanism hasn’t been designed to definitively impose a single career decision on a person by
              algorithmically matching their personal characteristics with occupational demands. Rather it is a more
              result oriented continuous mentoring process that stimulates and encourages the person to take on an
              exploratory learning curve that makes them future ready. This is made possible by a combination of the
              highly advanced career assessment and an equally structured and scientifically curated post assessment
              career counselling and career guidance mechanism that effectively blends the potentials of technology and
              the power of human intelligence.
            </p>
          </section>
        </footer>
      </WithPadding>
    </div>
  );
}
