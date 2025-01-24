import React from "react";
import style from "./StudentDetails.module.scss";

import { useNavigate } from "react-router";

import useStudentDetails from "./useStudentDetails";

export default function StudentDetails() {
  const { students } = useStudentDetails();

  const navigate = useNavigate();

  function handleClickStudent(id) {
    // navigate(`/dashboard/vendor/student/${id}`);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Student Details</div>

      <div className={style.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Name of Student</th>
              <th>Department</th>
              <th>Pref. Language</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} onClick={handleClickStudent.bind(this, student.id)}>
                <td>{student.fullname}</td>
                <td>{student.department}</td>
                <td>{student.pref_language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
