import React from "react";

import style from "./SurveyRespBox.module.scss";

export default function SurveyRespBoxWorkExpRedesign({ data, title }) {
  return (
    <div className={style.wrapper}>
      <header>{title}</header>

      <table>
        <thead>
          <tr>
            <th>Designation</th>
            <th>Company</th>
            <th>Still working there?</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item["Designation"]}</td>
              <td>{item["Company"]}</td>
              <td>{item["Still working there?"] ? "True" : "False"}</td>
              <td>{item["From"]}</td>
              <td>{item["To"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
