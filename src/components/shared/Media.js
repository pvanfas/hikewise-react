import React, { useState } from "react";
import style from "./Media.module.scss";

import TheHinduImg from "assets/images/landing/the_hindu.png";
import YourStoryImg from "assets/images/landing/your_story.svg";
import IndianExpressImg from "assets/images/landing/indian_express.png";
import DeccanChronicleImg from "assets/images/landing/deccan chronicles.png";
import WithPadding from "components/shared/WithPadding";
import clsx from "clsx";

export default function Media() {
  const [tabs, setTabs] = useState([
    {
      name: "TheHindu",
      image: TheHinduImg,
      isActive: true,
      content:
        "Hikewise combine the power of machine learning and AI with the competence of highly-skilled and well-trained individuals, eliminating human biases and prejudices that impact career decisions.",
    },
    {
      name: "YourStory",
      image: YourStoryImg,
      isActive: false,
      content:
        "This startup from IIT Kharagpur is building an algorithm that can find the perfect job for you. The test explores the various dimensions of a person's psychometric profile like personality, aptitude, interests, work value preferences. On the basis of this, it recommends the ideal career",
    },
    {
      name: "IndianExpress",
      image: IndianExpressImg,
      isActive: false,
      content:
        "Hikewise was developed after extensive research. It uses the most advanced scientific tools like machine learning and artificial intelligence. Generally, career guidance or counselling facilities available in the coutry today are expensive. But 'vLEAD', an Edtech startup, has come up with a perfect solution",
    },
    {
      name: "DeccanChronicle",
      image: DeccanChronicleImg,
      isActive: false,
      content:
        "It is often a difficult proposition for both students and parents to decide on the right subjects, course and college for higher education. Each student needs personalized recommendation based on several factors, including behaviour, abilities, motivations and interests.",
    },
  ]);

  function handleClickTab(tabName) {
    let toUpdate = tabs.map((tab) => ({ ...tab, isActive: tab.name === tabName ? true : false }));
    setTabs(toUpdate);
  }

  const activeTab = tabs.filter((f) => f.isActive);

  return (
    <WithPadding className={style.wrapper}>
      <h4>In the media</h4>

      <div className={style.tabs}>
        {tabs.map((tab) => (
          <article onClick={handleClickTab.bind(this, tab.name)} className={clsx(tab.isActive && style.active)}>
            <img src={tab.image} alt="" />
          </article>
        ))}
      </div>

      <div className={style.content}>
        <p>{activeTab[0].content}</p>
      </div>
    </WithPadding>
  );
}
