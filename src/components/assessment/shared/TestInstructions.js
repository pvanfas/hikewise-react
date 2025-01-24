import React from "react";
import style from "./TestInstructions.module.scss";

import { useNavigate } from "react-router-dom";

import ButtonLight from "components/shared/ButtonLight";
import Button from "components/shared/Button";

export default function TestInstructions({ handleClickNext }) {
  const navigate = useNavigate();
  function navigateToHome() {
    navigate("/dashboard/candidate/home");
  }

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <span>Test Instructions</span>
        <span>language</span>
      </div>
      <div className={style.body}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      </div>

      <div className={style.footer}>
        <span>Number of Questions: 10</span>
        <ButtonLight
          onClick={() => {
            navigateToHome();
          }}
          className={style.light}
          options={{ radius: "5px" }}
        >
          Skip
        </ButtonLight>
        <Button onClick={handleClickNext} options={{ radius: "5px" }}>
          Next
        </Button>
      </div>
    </div>
  );
}
