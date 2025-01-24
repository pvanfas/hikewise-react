import clsx from "clsx";
import style from "./SurveyRespCard.module.scss";
import { useEffect, useState } from "react";

export default function SurveyRespCard({ title, data, className }) {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data)) {
      let arr = Object.entries(data.Marks).map((key, value) => ({ name: key[0], value: key[1] }));
      setMarks(arr);
    }
  }, [data]);

  // console.log({ data });

  return (
    !!data.length && (
      <div className={clsx(style.wrapper, className)}>
        <header className={style.title}>{title}</header>

        {Array.isArray(data) ? (
          <>
            {data?.map((item) => (
              <article>
                <span className={style.ques}>{item.question}</span>
                <span className={style.ans}>
                  {typeof item.answer === "boolean" ? <>{item.answer ? "True" : "False"}</> : item.answer}
                </span>
              </article>
            ))}
          </>
        ) : (
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
        )}
      </div>
    )
  );
}
