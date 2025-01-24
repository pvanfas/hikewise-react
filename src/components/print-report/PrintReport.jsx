import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
// import { getRequest } from "utils/api";

import ReportRise from "components/dashboard-customer/reports/full-report/rise/ReportRise";

import config from "config/config";

// const config = {
//   apiBaseUrl: "https://console.hikewise.in/api",
// };

export default function PrintReport() {
  const { token } = useParams();

  const [report, setReport] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  function getReport() {
    axios
      .get(`${config.apiBaseUrl}/assessment/report/`, { headers })
      .then((resp) => {
        setReport(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getReport, []);

  return report && <ReportRise report={report} />;
}
