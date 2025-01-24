import React from "react";
import style from "./Program2.module.scss";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "components/shared/Button";
import WithPadding from "components/shared/WithPadding";
import SectionTitle from "./SectionTitle";

import feature1 from "../../assets/images/landing/feature_1.svg";
import feature2 from "../../assets/images/landing/feature_2.svg";
import feature3 from "../../assets/images/landing/feature_3.svg";
import feature4 from "../../assets/images/landing/feature_4.svg";
import Modal from "components/shared/Modal";
import GetInTouch from "components/shared/GetInTouch";

const _ArrFeatures = [
  {
    title: "Hikewise Rise (Class 8-9)",
    body: `Discover how a budding student can make their perfect stream choice with the help of Hikewise Rise`,
    image: feature1,
    link: `/rise`,
  },
  {
    title: "Hikewise Redesign (College & Graduate)",
    body: `Discover how a college/graduate student can reinvent their career path with the help of Hikewise Redesign`,
    image: feature3,
    link: `/redesign`,
  },
  {
    title: "Hikewise Sail (Class 10,11,12)",
    body: `Discover how a senior school student can choose their right career path with the help of Hikewise Sail`,
    image: feature2,
    link: `/sail`,
  },
  {
    title: "Hikewise Redesign Plus (Working Professionals)",
    body: `Discover how a working professional can get a career clarity & create a solid career plan with the help of Hikewise Redesign Plus`,
    image: feature4,
    link: `/working-professionals`,
  },
];

export default function Program2() {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClickBtn() {
    window.open("https://jivo.chat/e8yuMmV12o");
  }

  return (
    <WithPadding className={style.wrapper}>
      <Modal onClose={handleClickBtn} isOpen={isOpenModal}>
        <div className={style.modalWrapper}>
          <GetInTouch onClose={handleClickBtn} />
        </div>
      </Modal>

      <div className={style.left}>
        <div className={style.content}>
          <SectionTitle>
            <span>Our</span> <span>Programs</span>
          </SectionTitle>

          <div className={style.text}>A personalised online career guidance platform that works for everyone</div>

          <div className={style.btnContainer}>
            <Button options={{ width: "150px", height: "35px" }} onClick={handleClickBtn}>
              Schedule a callback
            </Button>
          </div>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.cards}>
          <div className={style.col}>
            {[_ArrFeatures[0], _ArrFeatures[1]].map((feature, index) => (
              <div key={feature.title} className={style.featureCard} id={`featureCard_${index + 1}`}>
                <div className={style.image}>
                  <img src={feature.image} alt="feature" />
                </div>
                <div className={style.body}>
                  <div className={style.title}>{feature.title}</div>
                  <div className={style.text}>{feature.body}</div>
                  <div className={style.button}>
                    <button onClick={() => navigate(feature.link)}>Know More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={style.col}>
            {[_ArrFeatures[2], _ArrFeatures[3]].map((feature, index) => (
              <div key={feature.title} className={style.featureCard} id={style[`featureCard_${2 + (index + 1)}`]}>
                <div className={style.image}>
                  <img src={feature.image} alt="feature" />
                </div>
                <div className={style.body}>
                  <div className={style.title}>{feature.title}</div>
                  <div className={style.text}>{feature.body}</div>
                  <div className={style.button}>
                    <button onClick={() => navigate(feature.link)}>Know More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WithPadding>
  );
}
