import React, { forwardRef, useEffect, useState } from "react";
import style from "./MyReports.module.scss";

import { useNavigate } from "react-router";
import { Download } from "react-feather";

import { getRequest } from "utils/api";

import { useUserContext } from "contexts/AllContexts";

import PrintReport from "./full-report/PrintReport";
import BarGraph from "./BarGraph";
import InlineLoader from "components/shared/InlineLoader";

import { _Colors } from "./full-report/common/helper";
import clsx from "clsx";

function MyReports(props, ref) {
  const [isActiveFullReport, setIsActiveFullReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);

  const { state } = useUserContext();
  const [report, setReport] = useState({});

  const navigate = useNavigate();

  function navigateToAssessment() {
    navigate("/assessment/live");
  }

  function getReport() {
    setIsLoading(true);

    getRequest(`/assessment/status/update`)
      .then((resp) => {
        if (resp.data.is_finished) {
          getRequest(`/assessment/report`)
            .then((resp) => {
              setReport(resp.data);
              setIsAssessmentCompleted(true);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          setIsAssessmentCompleted(false);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickReport() {
    setIsActiveFullReport(true);
  }

  function handleClosePrint() {
    setIsActiveFullReport(false);
  }

  useEffect(() => {
    getReport();
  }, []);

  // console.log({ state });

  return (
    <div ref={ref} {...props} className={style.wrapper}>
      {isActiveFullReport ? (
        <PrintReport handleClosePrint={handleClosePrint} report={report} department={state.profile.department} />
      ) : (
        <>
          <div className={style.header}>
            <div className={style.title}>Assessment Report</div>
            {isAssessmentCompleted && !isLoading && (
              <button onClick={handleClickReport}>
                <Download /> Full Report
              </button>
            )}
          </div>

          {isLoading ? (
            <div className={style.loaderWrapper}>
              <InlineLoader size={90} />
            </div>
          ) : (
            <>
              {isAssessmentCompleted && (
                <>
                  <div className={style.row}>
                    <div className={clsx(style.graph, style.aptitude)}>
                      {report.graph_data && (
                        <BarGraph
                          height={300}
                          horizontal={true}
                          title={"Aptitude"}
                          data={{
                            labels: report.graph_data.aptitude_labels,
                            values: report.graph_data.aptitude_final_list,
                          }}
                          color={_Colors.aptitude}
                        />
                      )}
                    </div>
                  </div>

                  <div className={style.row}>
                    {report.graph_data && (
                      <>
                        <div className={clsx(style.graph, style.personality)}>
                          <BarGraph
                            height={400}
                            horizontal={true}
                            title={"Personality"}
                            data={{
                              labels: report.graph_data.personality_labels,
                              values: report.graph_data.personality_final_list,
                            }}
                            color={_Colors.personality}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className={style.row}>
                    <div className={clsx(style.graph, style.career)}>
                      {report.graph_data && (
                        <BarGraph
                          height={450}
                          horizontal={true}
                          title={"Interests"}
                          data={{
                            labels: report.graph_data.interest_labels,
                            values: report.graph_data.interest_final_list,
                          }}
                          color={_Colors.career}
                        />
                      )}
                    </div>
                  </div>

                  {(state.profile.department === "REDESIGN_PLUS" || state.profile.department === "REDESIGN") && (
                    <>
                      <div className={style.row}>
                        <div className={clsx(style.graph, style.career)}>
                          {report.graph_data && (
                            <BarGraph
                              height={300}
                              horizontal={true}
                              title={"Work Value Preference"}
                              data={{
                                labels: report.graph_data.wvp_labels,
                                values: report.graph_data.wvp_final_list,
                              }}
                              color={_Colors.wvp}
                            />
                          )}
                        </div>
                      </div>

                      <div className={style.row}>
                        <div className={clsx(style.graph, style.career)}>
                          {report.graph_data && (
                            <BarGraph
                              height={250}
                              horizontal={true}
                              title={"Emotional Quotient"}
                              data={{
                                labels: report.graph_data.eq_labels,
                                values: report.graph_data.eq_final_list,
                              }}
                              color={_Colors.eq}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {!isAssessmentCompleted && (
                <div className={style.notCompleteWrapper}>
                  <div className={style.title}>Assessment Incomplete: Awaiting Completion!</div>
                  <div>Oops, you have not completed the assessment. Please take the assessment to view report</div>
                  <button onClick={navigateToAssessment}>Take Assessment</button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default forwardRef(MyReports);
