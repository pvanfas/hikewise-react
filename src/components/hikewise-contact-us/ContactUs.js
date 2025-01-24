import React from "react";
import style from "./ContactUs.module.scss";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

import Navbar from "components/navbar/Navbar";
import WithPadding from "components/shared/WithPadding";
import GetInTouch from "components/shared/GetInTouch";
import Footer from "components/footer/Footer";

const Buttons = [
  { caption: "Send Whatsapp Message", link: "https://wa.me/+7593929394" },
  {
    caption: "Career Assessment & Counselling",
    link: "/post-assessment",
  },

  {
    caption: "Certified Career Development Executive (CCDE)",
    link: "/ccde",
  },

  { caption: "Schools | Colleges | Organizations", link: "/institutions" },

  {
    caption: "Hikewise Partner Program",
    link: "/partner-program",
  },
];

export default function ContactUs() {
  function onClick(link) {
    window.open(link);
  }

  return (
    <div className={style.wrapper}>
      <Navbar background={"white"} />

      <header className={style.header}>Contact Us</header>

      <WithPadding className={style.main}>
        <div className={style.left}>
          <div className={style.info}>
            <article>
              <div className={style.icon}>
                <FaMapMarkerAlt size={25} />
              </div>
              <div>
                <div>2nd Floor, Empora Views, Malaparamaba</div>
                <div>Jn, Kozhikode, Kerala - 673009</div>
              </div>
            </article>
            <article>
              <div className={style.icon}>
                <MdEmail size={25} />
              </div>
              <div>hello@hikewise.com</div>
            </article>
            <article>
              <div className={style.icon}>
                <MdPhone size={25} />
              </div>
              <div>+91 7593 929 394</div>
            </article>
          </div>
          <div style={{ width: "100%" }}>
            <div className={style.title}>Ask Us Anything</div>
            <div className={style.buttons}>
              {Buttons.map(({ caption, link }) => (
                <button onClick={onClick.bind(this, link)}>{caption}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={style.right}>
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.659061282696!2d75.79850795042502!3d11.28645339193727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65ea4014a1baf%3A0x1c626366e6b8600!2sEmpora%20View%2C%20Kozhikode-Mysore-Kollegal%20Hwy%2C%20Parammal%2C%20Kozhikode%2C%20Kerala%20673017!5e0!3m2!1sen!2sin!4v1669669135747!5m2!1sen!2sin"
            width="100%"
            height="500px"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </WithPadding>

      <div className={style.getInTouch}>
        <GetInTouch />
      </div>

      <Footer />
    </div>
  );
}
