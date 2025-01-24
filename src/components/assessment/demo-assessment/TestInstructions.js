import React from "react";
import style from "./TestInstructions.module.scss";

import { useNavigate } from "react-router-dom";

import ButtonLight from "components/shared/ButtonLight";
import Button from "components/shared/Button";
import { useEngine } from "./engine/EngineProvider";

export default function TestInstructions() {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/dashboard/candidate/home");
  }

  const { startTest } = useEngine();

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <span>Demo Test Instructions</span>
        {/* <span>language</span> */}
      </div>
      <div className={style.body}>
        <p>
          The following provides just a glimpse into India's most advanced and analytics-driven career assessment
          mechanism. Kindly understand that the demo test does not fully represent the complete test or it's
          comprehensiveness. The purpose of the demo test is just to familiarize you with the technical interface and
          flow of the process.
        </p>

        <p>
          Hikewise career assessment comes in four categories that cater to different populations - Rise, Sail, Redesign
          & Redesign Plus. According to the category, the assessment and psychometric dimensions that will be assessed
          will differ significantly.
        </p>
        <p>
          There are five common parameters that appear in all categories - Personality, Interest, Aptitude, Work-Value
          Preferences, & Emotional Quotient. What the demo test offers is a sneak peek into what the test experience
          looks like for the assessment of the first three parameters - Personality, Insterest, & Aptitude.
        </p>

        <p>
          Additionally, although Hikewise is available in 13 Indian languages, the demo test only provides an overview
          in the English mode. Only when you take the actual test will you be able to chose the language of your
          preference. Even if you choose to give the test in an Indian local language of your choice, you will also be
          given it's corresponding version in English side-by-side.
        </p>

        <p>
          Please note again that the demo test is just like a teaser. You will not receive any reports or analytics
          based on the demo test. And also, that you will not be able to view the assessment of Work-Value Preferences
          and Emotional Quotient in the demo test due to the nature of the items.
        </p>

        <p>
          Kindly treat the demo test as a teaser! Although the demo can be completed in a short span of time, the actual
          test is one that you will have you dedicate some time to. On an average the entire process and career
          assessment may take 2 to 2.5 hours to complete.
        </p>
      </div>

      <div className={style.footer}>
        {/* <span>Number of Questions: 10</span> */}
        <ButtonLight
          onClick={() => {
            navigateToHome();
          }}
          className={style.light}
          options={{ radius: "5px" }}
        >
          Skip
        </ButtonLight>
        <Button onClick={startTest} options={{ radius: "5px" }}>
          Start
        </Button>
      </div>
    </div>
  );
}
