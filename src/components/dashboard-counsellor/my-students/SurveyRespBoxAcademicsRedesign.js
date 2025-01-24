import React, { useState } from "react";
import { useEffect } from "react";
import style from "./SurveyRespBox.module.scss";

export default function SurveyRespBoxAcademicsRedesign({ data, title }) {
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      const arr = Object.entries(data).map(([key, value]) => {
        if (key !== "Educational Institutions")
          return { ques: key, ans: value };
      });

      setDataArr(arr);
    } else {
      setDataArr(data);
    }
  }, [data]);

  return (
    <div className={style.wrapper}>
      <header>{title}</header>

      {dataArr.map(
        (item) =>
          item && (
            <article>
              <div className={style.ques}>{item.ques}</div>
              <div className={style.ans}>
                {typeof item.ans === "boolean"
                  ? item.ans
                    ? "True"
                    : "False"
                  : item.ans}
              </div>
            </article>
          )
      )}

      <table>
        <thead>
          <tr>
            <th>Name of School</th>
            <th>Overall CGPA</th>
            <th>Educational Board</th>
            <th>Year of Completion</th>
          </tr>
        </thead>

        <tbody>
          {data["Educational Institutions"].map((item) => (
            <tr>
              <td>{item["Name of School"]}</td>
              <td>{item["Overall CGPA"]}</td>
              <td>{item["Educational Board"]}</td>
              <td>{item["Year of Completion"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
