import React, { useState } from "react";
import { useEffect } from "react";
import style from "./SurveyRespBox.module.scss";

export default function SurveyRespBoxAcademics({ data, title }) {
  const [dataArr, setDataArr] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      const arr = Object.entries(data).map(([key, value]) => {
        if (key !== "Marks") return { ques: key, ans: value };
      });
      setDataArr(arr);
    } else {
      setDataArr(data);
    }
  }, [data]);

  useEffect(() => {
    let arr = Object.entries(data.Marks).map((key, value) => ({ name: key[0], value: key[1] }));
    setMarks(arr);
  }, [data]);

  return (
    <div className={style.wrapper}>
      <header>{title}</header>

      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {dataArr.map(
        (item) =>
          item && (
            <article>
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
