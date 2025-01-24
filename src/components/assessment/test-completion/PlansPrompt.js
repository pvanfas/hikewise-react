import React from "react";
import style from "./PlansPrompt.module.scss";

import { useNavigate } from "react-router-dom";

import Button from "components/shared/Button";

import { useAppContext } from "contexts/AllContexts";

export default function CareerOptions() {
  const navigate = useNavigate();
  const AppContext = useAppContext();

  function redirectToPlans() {
    AppContext.dispatch({
      type: "SET_IS_COMPLETE_MODAL",
      payload: { isOpen: false },
    });
    navigate("/assessment/candidate/plans");
  }

  return (
    <div className={style.wrapper}>
      <button className={style.skipBtn}>Skip</button>
      <div className={style.title}>Buy A Plan</div>
      Please buy a plan to book a counselling session . Lorem ipsum dolor sit,
      amet consectetur adipisicing elit. Minus, vel asperiores? Omnis magnam, in
      fugit reprehenderit ipsa consequuntur ea aliquid facilis porro repellat
      deserunt dicta minima aut consequatur quia quisquam?
      <div className={style.buttons}>
        <Button
          onClick={redirectToPlans}
          options={{ width: "130px", height: "35px", radius: "5px" }}
        >
          Buy A Plan
        </Button>
      </div>
    </div>
  );
}
