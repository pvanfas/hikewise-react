import React, { forwardRef, useEffect, useState } from "react";
import style from "./Student.module.scss";

import { useParams } from "react-router";

import { getRequest } from "utils/api";

import BarGraph from "./BarGraph";
import InlineLoader from "components/shared/InlineLoader";
import PrintReport from "components/dashboard-customer/reports/full-report/PrintReport";

import { Download } from "react-feather";
import { splitArrChunks } from "utils/helper";

const _Colors = {
  career: "#47c788",
  aptitude: "#f48382",
  personality: "#8c9af3",
  wvp: "#6c4d6c",
  eq: "#ffc034",
};

function MyReports(props, ref) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState({});

  const [isActiveFullReport, setIsActiveFullReport] = useState(false);
  const [printRerenderToggle, setPrintRerenderToggle] = useState(true);

  const params = useParams();
  const accessKey = params.accessKey;

  function getReport() {
    setIsLoading(true);
    getRequest(`/vendors/candidates/${accessKey}`)
      .then((resp) => {
        setReport(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleClickReport() {
    setIsActiveFullReport(true);
    setPrintRerenderToggle((prev) => !prev);
  }

  function handleClosePrint() {
    setIsActiveFullReport(false);
  }

  useEffect(() => {
    getReport();
  }, []);

  const [graphsByRow, setGraphsByRow] = useState([]);

  useEffect(() => {
    if (!report || !report.graph_data) return;
    const graphData = report.graph_data;

    const graphs = [
      {
        title: "Personality",
        data: {
          labels: graphData.personality_labels,
          values: graphData.personality_final_list,
        },
        color: _Colors.personality,
        height: 400,
        index: 1,
      },
      {
        title: "Aptitude",
        data: {
          labels: graphData.aptitude_labels,
          values: graphData.aptitude_final_list,
        },
        color: _Colors.aptitude,
        height: 400,
        barHeight: 40,
        index: 2,
      },
      {
        title: "Interests",
        data: {
          labels: graphData.interest_labels,
          values: graphData.interest_final_list,
        },
        color: _Colors.career,
        height: 600,
        index: 5,
      },
      {
        title: "Work Value Preference",
        data: {
          labels: graphData.wvp_labels,
          values: graphData.wvp_final_list,
        },
        color: _Colors.wvp,
        height: 400,
        index: 3,
      },
      {
        title: "Emotional Quotient",
        data: {
          labels: graphData.eq_labels,
          values: graphData.eq_final_list,
        },
        color: _Colors.eq,
        height: 400,
        barHeight: 20,
        index: 4,
      },
    ];

    let graphsForCat = [];
    const dept = report.category;
    if (dept === "RISE") graphsForCat = graphs.slice(0, 3);
    else if (dept === "SAIL") graphsForCat = graphs.slice(0, 4);
    else graphsForCat = graphs.slice(0, 5);

    const graphsSplit = splitArrChunks(graphsForCat, 2);
    console.log(graphsSplit);
    setGraphsByRow(graphsSplit);
  }, [report]);

  return (
    <div ref={ref} {...props} className={style.wrapper}>
      <>
        <div className={style.header}>
          <div className={style.title}> {report.fullname}</div>
          <button onClick={handleClickReport}>
            <Download /> Full Report
          </button>
        </div>

        {isLoading ? (
          <>
            <InlineLoader />
          </>
        ) : (
          <>
            {isActiveFullReport ? (
              <PrintReport
                printRerenderToggle={printRerenderToggle}
                handleClosePrint={handleClosePrint}
                report={report}
                department={report.category}
              />
            ) : (
              <>
                {/* <div className={style.row}>
                  {report.graph_data && (
                    <>
                      <BarGraph
                        title={"Personality "}
                        data={{
                          labels: report.graph_data.personality_labels,
                          values: report.graph_data.personality_final_list,
                        }}
                        color={_Colors.personality}
                      />
                      <BarGraph
                        title={"Aptitude"}
                        data={{
                          labels: report.graph_data.aptitude_labels,
                          values: report.graph_data.aptitude_final_list,
                        }}
                        color={_Colors.aptitude}
                      />
                    </>
                  )}
                </div> */}

                {/* <div className={style.row}>
                  {report.graph_data && (
                    <BarGraph
                      horizontal={true}
                      title={"Dominant Careers"}
                      data={{ labels: report.graph_data.career_labels, values: report.graph_data.career_final_list }}
                      color={_Colors.career}
                    />
                  )}
                </div> */}

                {report.graph_data && (
                  <div className={style.graphs}>
                    {graphsByRow.map((graphRow) => (
                      <div className={style.row}>
                        {graphRow.map((graph) => (
                          <BarGraph
                            title={graph.title}
                            horizontal={true}
                            height={graph.height}
                            data={graph.data}
                            color={graph.color}
                            barHeight={graph.barHeight}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default forwardRef(MyReports);
