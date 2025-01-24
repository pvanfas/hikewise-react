import React from "react";
import style from "./PlanCard.module.scss";

import clsx from "clsx";
import parse from "html-react-parser";
import { CheckCircle } from "react-feather";
import Button from "components/shared/Button";

export default function PlanCard({ plan, handleClickContinue, className }) {
  function getReportUrl(dept) {
    switch (dept) {
      case "REDESIGN_PLUS":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/redesign_plus.pdf";
      case "REDESIGN":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/redesign.pdf";
      case "RISE":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/rise.pdf";
      case "SAIL":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/sample_report/sail.pdf";
      default:
        return "";
    }
  }

  function getReportPlan(dept) {
    switch (dept) {
      case "REDESIGN_PLUS":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/action_plan/redesign_plus.pdf";
      case "REDESIGN":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/action_plan/redesign.pdf";
      case "RISE":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/action_plan/rise.pdf";
      case "SAIL":
        return "https://hikewise.sgp1.digitaloceanspaces.com/hikewise/docs/action_plan/sail.pdf";
      default:
        return "";
    }
  }

  function handleClickSampleReport(type) {
    window.open(getReportUrl(type));
  }

  function handleClickSamplePlan(type) {
    window.open(getReportPlan(type));
  }

  // console.log(plan);

  return (
    <div className={clsx(style.wrapper, className)} key={plan.title}>
      <div className={style.title}>{parse(plan.title)}</div>
      <div className={style.pricing}>
        <span className={style.currency}>&#8377;</span>
        <span className={style.price}>{plan.amount}</span>
      </div>

      <ul className={style.features}>
        {plan.description.map((desc, index) => (
          <li key={index} className={clsx(index === plan.description.length - 1 && style.last)}>
            <CheckCircle /> {desc}
          </li>
        ))}

        {!plan.is_booster && (
          <>
            {plan.has_assessment && (
              <li className={style.link} onClick={handleClickSampleReport.bind(this, plan.department)}>
                <span></span>
                Sample Report
              </li>
            )}

            {plan.has_counselling && (
              <li className={style.link} onClick={handleClickSamplePlan.bind(this, plan.department)}>
                <span></span>
                Sample Action Plan
              </li>
            )}
          </>
        )}
      </ul>

      {/* <div className={style.footer}>
        <span onClick={handleClickSamplePlan.bind(this, plan.department)}>Sample Action Plan</span>
        <span onClick={handleClickSampleReport.bind(this, plan.department)}>Sample Report</span>
      </div> */}

      <Button options={{ width: "100px" }} onClick={handleClickContinue.bind(this, plan)}>
        Continue
      </Button>
    </div>
  );
}
