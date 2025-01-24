import React from "react";
import style from "./TypeForm.module.scss";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Widget } from "react-typeform-embed";

import Navbar from "components/navbar/Navbar";
import WithPadding from "components/shared/WithPadding";
import { postRequest } from "utils/api";

export default function TypeForm() {
  const params = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams({});
  const id = searchParams.get("id");

  function handleSubmit(e) {
    let postData = {};
    postData[`is_survey_${id}_completed`] = true;
    postData[`survey_${id}_response_id`] = e.response_id;

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
      <Navbar background="white" />

      <WithPadding>
        <div className={style.title}>
          Answer the following questions to complete the survey
        </div>
        <Widget id={params.formId} height={"600"} onSubmit={handleSubmit} />
      </WithPadding>
    </div>
  );
}
