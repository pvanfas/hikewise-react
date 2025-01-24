import React from "react";
import style from "./CareerOptions.module.scss";

import { useNavigate } from "react-router-dom";

import Button from "components/shared/Button";
import ButtonLight from "components/shared/ButtonLight";

const _ArrCards = [
  {
    name: "Doctor",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do, ",
  },
  {
    name: "Therapist",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do, ",
  },
  {
    name: "Developer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do, ",
  },
];

export default function CareerOptions() {
  const navigate = useNavigate();

  function navigateToSessions() {
    navigate("/dashboard/candidate/essions");
  }

  return (
    <div className={style.wrapper}>
      <button className={style.skipBtn}>Close</button>
      <div className={style.title}>Our Career Counsellors</div>

      <div className={style.cards}>
        {_ArrCards.map((card) => (
          <div className={style.card} key={card.name}>
            <div className={style.image}></div>
            <div className={style.name}>{card.name}</div>
            <div className={style.body}>{card.desc}</div>

            <button>Know More</button>
          </div>
        ))}
      </div>
      <div className={style.buttons}>
        <Button options={{ width: "130px", height: "35px", radius: "5px" }}>Download</Button>
        <ButtonLight onClick={navigateToSessions} options={{ width: "130px", height: "35px", radius: "5px" }}>
          Book Counselling
        </ButtonLight>
      </div>
    </div>
  );
}
