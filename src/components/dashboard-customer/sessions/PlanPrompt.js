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
      <div className={style.title}>No Plan Active</div>
      Oops, you do not have a valid counselling plan. Please buy a plan to book a counselling session.
      <div className={style.buttons}>
        <Button onClick={redirectToPlans} options={{ width: "130px", height: "35px", radius: "5px" }}>
          Buy A Plan
        </Button>
      </div>
    </div>
  );
}
