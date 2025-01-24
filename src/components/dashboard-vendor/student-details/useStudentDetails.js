import { useState, useEffect } from "react";
import { getRequest } from "utils/api";

export default function useStudentDetails() {
  const [students, setStudents] = useState([]);

  function getAllStudents() {
    getRequest(`/vendors/candidates`)
      .then((resp) => {
        setStudents(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllStudents();
  }, []);

  return { students };
}
