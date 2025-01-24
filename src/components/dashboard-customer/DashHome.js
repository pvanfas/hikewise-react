import React, { useEffect, useState } from "react";
import style from "./DashHome.module.scss";

import { useNavigate } from "react-router-dom";
import { Lock } from "react-feather";
import clsx from "clsx";

import { getRequest } from "utils/api";

import LiveImg from "assets/images/dashboard/home/live_assessment.svg";
import CustomImg from "assets/images/dashboard/home/custom.svg";
import MentorImg from "assets/images/dashboard/home/mentor.svg";
import PlansImg from "assets/images/dashboard/home/plans.svg";
import SelfImg from "assets/images/dashboard/home/self.svg";
import DemoImg from "assets/images/dashboard/home/demo.svg";

import InlineLoader from "components/shared/InlineLoader";

const _ArrLinks = [
  { title: "Take a Free Demo", img: DemoImg, link: "/assessment/demo" },
  { title: "Pick a Plan", img: PlansImg, link: "/dashboard/candidate/plans" },
  { title: "Live Assessment", img: LiveImg, isLock: true, link: "/assessment/live" },
  { title: "Know Yourself", img: SelfImg, isLock: true },
  { title: "Get Mentored", img: MentorImg, isLock: true },
  { title: "Customised Action Plan", img: CustomImg, isLock: true },
];

export default function DashHome() {
  const navigate = useNavigate();

  const [state, setState] = useState(_ArrLinks.map((item) => ({ ...item, isHover: false })));
  const [isLoading, setIsLoading] = useState(false);

  function handleMouseEnter(id) {
    setState((prev) => {
      let toUpdate = [...prev];
      toUpdate[id].isHover = true;
      return toUpdate;
    });
  }

  function handleMouseLeave(id) {
    setState((prev) => {
      let toUpdate = [...prev];
      toUpdate[id].isHover = false;
      return toUpdate;
    });
  }

  function handleClickCard(link, isLock) {
    if (isLock) return navigate("/dashboard/candidate/plans");
    else return navigate(link);
  }

  function getCounsellingStatus() {
    setIsLoading(true);
    getRequest(`/counselling/status`)
      .then((resp) => {
        let stateToUpdate = [...state];
        stateToUpdate[2].isLock = false;
        setState(stateToUpdate);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCounsellingStatus();
  }, []);

  return (
    <div className={style.wrapper}>
      {isLoading && (
        <div className={style.loaderWrapper}>
          <InlineLoader size={50} />
        </div>
      )}

      {!isLoading &&
        state.map((item, index) => (
          <div
            key={item.title}
            className={clsx(style.box, item.isHover && item.isLock && style.lockHover, item.isLock && style.boxLocked)}
            onClick={handleClickCard.bind(this, item.link, item.isLock)}
            onMouseEnter={handleMouseEnter.bind(this, index)}
            onMouseLeave={handleMouseLeave.bind(this, index)}
          >
            {item.isLock && item.isHover && (
              <div className={style.lockOverlay}>
                <Lock size={30} />
              </div>
            )}
            <div className={style.image}>
              <img src={item.img} alt="" />
              <div>{item.title}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
