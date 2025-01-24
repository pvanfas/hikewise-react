import React, { useEffect } from "react";
import style from "./Surveys.module.scss";

import { useNavigate } from "react-router-dom";
import { CheckCircle } from "react-feather";

import { postRequest } from "utils/api";

export default function Surveys({ surveys }) {
  const navigate = useNavigate();

  function navigateToSurvey(formID, index) {
    navigate(`/assessment/survey/${formID}?id=${index}`);
  }

  function handleSubmit(id) {
    let postData = {};
    postData[`is_survey_${id}_completed`] = true;
    postData[`survey_${id}_response_id`] = null;

    postRequest(`/counselling/survey/update`, postData)
      .then(() => {
        navigate("/dashboard/candidate/sessions");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Survey not completed</div>
      <div>
        {" "}
        Oops, you have not completed the surveys. Please complete the surveys to
        book counselling
      </div>

      <div className={style.surveys}>
        {surveys.map((survey, index) => (
          <div className={style.survey} key={survey.id}>
            <div className={style.name}> {survey.name}</div>
            <div className={style.button}>
              {survey.isDone ? (
                <>
                  <CheckCircle />

                  {!survey.responseId && (
                    <span className={style.skippedText}>(skipped)</span>
                  )}
                </>
              ) : (
                <button
                  onClick={navigateToSurvey.bind(
                    this,
                    survey.survey,
                    index + 1
                  )}
                >
                  Complete Survey
                </button>
              )}

              {survey.id === "3" && !survey.isDone && (
                <button onClick={handleSubmit.bind(this, survey.id)}>
                  Skip Survey
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
