import React, { useState, useEffect } from "react";
import style from "./MyTest.module.scss";

import { useNavigate } from "react-router-dom";

import { getRequest } from "utils/api";
import { getTabsForTest } from "components/assessment/live-assessment/engine/helper";
import InlineLoader from "components/shared/InlineLoader";

import { useUserContext } from "contexts/UserContext";

const _Colors = {
  personality: "#6b7ff2",
  aptitude: "#f38585",
  interest: "#54c184",
  wvp: "#d24cde",
  eq: "#d24cde",
};

export default function MyTest() {
  const [quesCount, setQuesCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssessmentOver, setIsAssessmentOver] = useState(false);

  const navigate = useNavigate();

  const { state } = useUserContext();

  function navigateToAssessment() {
    navigate("/assessment/live");
  }

  function navigateToReport() {
    navigate("/dashboard/candidate/reports");
  }

  function getAssessmentData() {
    setIsLoading(true);

    getRequest("/assessment/status/update")
      .then((resp) => {
        if (resp.data.is_finished) {
          setIsAssessmentOver(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getRequest(`/assessment/status`)
      .then((resp) => {
        const tabs = getTabsForTest(state.profile.department);

        setQuesCount(
          tabs.map((tab) => {
            const keyCountQues = `${tab.key}_question_count`;
            let keyCountAttempt = `${tab.key}_question_attempted_count`;

            if (keyCountAttempt && keyCountQues) {
              return {
                name: tab.name,
                key: tab.key,
                count: resp.data[keyCountAttempt],
                total: resp.data[keyCountQues],
                style: {
                  backgroundColor: _Colors[tab.key],
                  width: `${
                    (resp.data[keyCountAttempt] / resp.data[keyCountQues]) * 100
                  }%`,
                },
              };
            } else {
              return { name: tab.name, count: 0 };
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (state && state.profile) getAssessmentData();
  }, [state.profile]);

  return (
    <div className={style.wrapper}>
      <div className={style.pageTitle}>My Assessment </div>

      <div className={style.card}>
        <div className={style.header}>
          <div className={style.title}>
            <span>Assessment Progress </span>
          </div>
        </div>

        {isLoading && (
          <div className={style.loaderWrapper}>
            <InlineLoader size={80} />
          </div>
        )}

        {!isLoading && (
          <>
            <div className={style.bars}>
              {quesCount.map((item) => (
                <div className={style.barWrapper} key={item.name}>
                  <div className={style.caption}>
                    {item.name}
                    <span>{((item.count / item.total) * 100).toFixed(2)}%</span>
                  </div>
                  <div className={style.bar}>
                    <div className={style.progress} style={item.style}></div>
                  </div>
                  <div className={style.count}></div>
                </div>
              ))}
            </div>

            {isAssessmentOver && (
              <div className={style.button}>
                <button onClick={navigateToReport}>View Report</button>
              </div>
            )}

            {!isAssessmentOver && (
              <div className={style.button}>
                <button onClick={navigateToAssessment}>Assessment</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
