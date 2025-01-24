import { useState, useEffect } from "react";
import { getRequest } from "utils/api";

export default function useStudentDetails() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getAllStudents() {
    setIsLoading(true);
    getRequest(`/cde/candidates`)
      .then((resp) => {
        setStudents(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllStudents();
  }, []);

  return { students, isLoading };
}
