import React from "react";
import style from "./PlanPrompt.module.scss";

import { useNavigate } from "react-router-dom";

import Button from "components/shared/Button";
// import ButtonLight from "components/shared/ButtonLight";

// import { useAppContext } from "contexts/AllContexts";

export default function CareerOptions() {
  const navigate = useNavigate();
  // const AppContext = useAppContext();

  function redirectToPlans() {
    navigate("/assessment/live");
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Assessment not completed</div>
      Oops, you have not complete the assessment. Please complete the assessment to book a counselling session.
      <div className={style.buttons}>
        <Button onClick={redirectToPlans} options={{ width: "210px", height: "35px", radius: "5px" }}>
          Assessment
        </Button>
      </div>
    </div>
  );
}
