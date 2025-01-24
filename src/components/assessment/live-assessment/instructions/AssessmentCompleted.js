import React from "react";
import style from "./AssessmentCompleted.module.scss";

import { useNavigate } from "react-router";
import { Check } from "react-feather";

export default function ContinueInstructions({ handleClickNext }) {
  const navigate = useNavigate();

  function navigateToReports() {
    navigate("/dashboard/candidate/reports");
  }

  return (
    <div className={style.wrapper}>
      <div className={style.icon}>
        <Check />
      </div>
      <div className={style.title}>You have completed your assessment</div>

      <div>
        Congratulations on completing the online career assessment test with hikewise! 
        Our platform is designed to provide you with the most comprehensive and scientific 
        analysis of your various psychometric dimensions.
      </div>
      <div className={style.footer}>
        <button onClick={navigateToReports}>View Report</button>
      </div>
    </div>
  );
}
