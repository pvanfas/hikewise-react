import React from "react";
import style from "./SurveyResponses.module.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRequest } from "utils/api";
import clsx from "clsx";

const surveyMapping = {
  survey_1: "Academics",
  survey_2: "Personal and Social",
  survey_3: "Future Plan",
  survey_4: "SWOT",
};

export default function SurveyResponses() {
  const [responses, setResponses] = useState({});
  const [tabs] = useState(Object.entries(surveyMapping).map((item) => item[1]));

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function changeActTabIndex(index) {
    setActiveTabIndex(index);
  }

  const params = useParams();

  function getSurveyResponse() {
    getRequest(`/cde/survey/responses/${params.user}`)
      .then((resp) => {
        let obj = {};
        for (const key in resp.data) {
          obj[surveyMapping[key]] = resp.data[key];
        }

        // console.log(obj);
        setResponses(obj);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  const activeResponse = responses[tabs[activeTabIndex]];

  useEffect(getSurveyResponse, []);

  return (
    <div className={style.wrapper}>
      <h3>Survey Responses</h3>

      <div className={style.tabs}>
        {tabs.map((tab, index) => (
          <article
            onClick={changeActTabIndex.bind(this, index)}
            key={tab}
            className={clsx(activeTabIndex === index && style.active)}
          >
            {tab}
          </article>
        ))}
      </div>

      {activeResponse?.items?.answers ? (
        <div className={style.responses}>
          {activeResponse.items[0].answers.map((ans) => (
            <article>
              <span className={style.ques}> {ans.field.ref}</span>
              <span className={style.ans}>
                {ans.type === "text" && ans.text}
                {ans.type === "choices" &&
                  ans.choices.labels.map((choice, index) => (
                    <span>
                      {choice} {index <= ans.choices.labels.length - 2 && ","}
                    </span>
                  ))}
                {ans.type === "choice" && ans.choice.label}
                {ans.type === "number" && ans.number}

                {ans.type === "boolean" && (ans.boolean ? "True" : "False")}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className={style.noResp}>No response yet</div>
      )}
    </div>
  );
}
