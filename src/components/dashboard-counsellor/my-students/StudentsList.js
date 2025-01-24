import React from "react";
import style from "./StudentsList.module.scss";

import InlineLoader from "components/shared/InlineLoader";

import { useNavigate } from "react-router";

import useStudentDetails from "./useStudentDetails";

export default function StudentDetails() {
  const { students, isLoading } = useStudentDetails();

  const navigate = useNavigate();

  function getDeptWord(word) {
    return word
      .split("_")
      .map((item) => capitalise(item))
      .join(" ");
  }

  function capitalise(word) {
    if (!word) return "";
    let newWord = "";
    newWord += word.charAt(0).toUpperCase();
    for (let i = 1; i < word.length; i++) {
      newWord += word.charAt(i).toLowerCase();
    }

    return newWord;
  }

  function handleClickStudent(id) {
    navigate(`/dashboard/counsellor/student/${id}`);
  }

  function getLanguage(lang) {
    const foundLang = _ArrLangs.find((f) => f.value === lang);
    return foundLang.label;
  }

  const _ArrLangs = [
    { label: "English", value: "EN" },
    { label: "Hindi", value: "HI" },
    { label: "Malayalam", value: "ML" },
    { label: "Tamil", value: "TA" },
    { label: "Kannada", value: "KN" },
    { label: "Telugu", value: "TE" },
    { label: "Marathi", value: "MR" },
    { label: "Bengali", value: "BN" },
    { label: "Gujarati", value: "GU" },
    { label: "Punjabi", value: "PA" },
    { label: "Odia", value: "OD" },
    { label: "Assamese", value: "AS" },
    { label: "Urdu", value: "UR" },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Student Details</div>

      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader />
        </div>
      ) : (
        <div className={style.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Name of Student</th>
                <th>Department</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} onClick={handleClickStudent.bind(this, student.id)}>
                  <td>{student.fullname}</td>
                  <td>{getDeptWord(student.department)}</td>
                  <td>{getLanguage(student.pref_language)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
