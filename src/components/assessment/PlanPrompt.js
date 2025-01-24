import React from "react";
import style from "./PlanPrompt.module.scss";

import { useNavigate } from "react-router-dom";

import Button from "components/shared/Button";

import { useAppContext } from "contexts/AllContexts";

export default function CareerOptions() {
  const navigate = useNavigate();
  const AppContext = useAppContext();

  function redirectToPlans() {
    AppContext.dispatch({ type: "SET_IS_COMPLETE_MODAL", payload: { isOpen: false } });
    navigate("/dashboard/candidate/plans");
  }

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.title}>No Plan Active</div>
        <div className={style.text}>
          Oops, you do not have a valid plan. Please buy a plan to attempt the assessment.
        </div>
        <div className={style.buttons}>
          <Button onClick={redirectToPlans} options={{ width: "130px", height: "35px", radius: "5px" }}>
            Buy A Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
