import clsx from "clsx";
import React, { useState } from "react";
import { useEffect } from "react";
import style from "./SurveyRespBox.module.scss";

export default function SurveyRespBox({ data, title }) {
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      const arr = Object.entries(data).map(([key, value]) => ({
        ques: key,
        ans: value,
      }));
      setDataArr(arr);
    } else {
      setDataArr(data);
    }
  }, [data]);

  return (
    <div
      className={clsx(style.wrapper, title === "Feedback" && style.feedback)}
    >
      <header>{title}</header>
      {dataArr.map((item) =>
        item.ques ? (
          <article key={item.ques}>
            <div className={style.ques}>{item.ques}</div>
            <div className={style.ans}>
              {typeof item.ans === "boolean"
                ? item.ans
                  ? "True"
                  : "False"
                : item.ans}
            </div>
          </article>
        ) : (
          <article key={item}>{item}</article>
        )
      )}
    </div>
  );
}
