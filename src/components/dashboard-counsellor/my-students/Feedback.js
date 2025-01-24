import React, { useEffect, useState } from "react";
import style from "./Feedback.module.scss";

import { useParams } from "react-router-dom";

import { getRequest } from "utils/api";
import SurveyRespBox from "./SurveyRespBox";

export default function Feedback() {
  const params = useParams();
  const studentId = params.id;

  const [feedback, setFeedback] = useState({});

  function getFeedback() {
    getRequest(`/cde/survey/feedback/${studentId}`)
      .then((resp) => {
        setFeedback(
          resp.data.map((item) => ({ ques: item.title, ans: item.answer }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getFeedback, []);

  return (
    <div className={style.wrapper}>
      <SurveyRespBox title="Feedback" data={feedback} />
    </div>
  );
}
