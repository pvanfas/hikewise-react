import React, { useState, useEffect } from "react";
import style from "./SurveyRespBox.module.scss";

export default function SurveyRespBoxAcademicIssues({ data, title }) {
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      const arr = Object.entries(data).map(([key, value]) => {
        if (key !== "Reasons") return { ques: key, ans: value };
      });

      setDataArr(arr);
    } else {
      setDataArr(data);
    }
  }, [data]);

  return (
    <div className={style.wrapper}>
      <header>{title}</header>

      {data.Reasons && (
        <ul>
          {data.Reasons.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      )}

      {dataArr.map(
        (item) =>
          item && (
            <article key={item.ques}>
              <div className={style.ques}>{item.ques}</div>
              <div className={style.ans}>
                {typeof item.ans === "boolean" ? (item.ans ? "True" : "False") : item.ans}
              </div>
            </article>
          )
      )}
    </div>
  );
}
