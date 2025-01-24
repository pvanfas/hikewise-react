import React, { forwardRef, useEffect, useState } from "react";
import style from "./Student.module.scss";

import { format } from "date-fns";
import { Download } from "react-feather";
import { VscFeedback } from "react-icons/vsc";
import { useParams } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import BarGraph from "./BarGraph";
import InlineLoader from "components/shared/InlineLoader";
import PrintReport from "components/dashboard-customer/reports/full-report/PrintReport";

import { getRequest } from "utils/api";
import { sortArrOfObjects, splitArrChunks } from "utils/helper";

import Feedback from "./Feedback";
import SurveyRespCard from "./SurveyRespCard";

function extractAnswer(answer) {
  switch (answer.type) {
    case "text":
      return answer.text;
    case "choice":
      return answer.choice.label;
    case "number":
      return answer.number;
    case "boolean":
      return answer.boolean;
    case "choices":
      return answer.choices.labels?.join(", ") || "-";
    case "date":
      return format(new Date(answer.date), "yyyy-MM-dd");
    default:
      return "--";
  }
}

const _Colors = {
  career: "#47c788",
  aptitude: "#f48382",
  personality: "#8c9af3",
  wvp: "#6c4d6c",
  eq: "#ffc034",
};

const themePurple = "#9456c8";

const radioSize = "18px";
const CustomRadio = withStyles({
  root: {
    color: themePurple,
    "&$checked": {
      color: themePurple,
    },
    "& svg": {
      width: radioSize,
      height: radioSize,
    },
    "&$disabled": {
      color: "#DCDCDC",
    },
  },
  checked: {},
  disabled: {},
})((props) => <Radio {...props} />);

function MyReports(props, ref) {
  const params = useParams();
  const studentId = params.id;

  const [report, setReport] = useState({});
  const [graphsByRow, setGraphsByRow] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isActiveFeedback, setIsActiveFeedback] = useState(false);
  const [isActiveFullReport, setIsActiveFullReport] = useState(false);

  const [checkStatus, setCheckStatus] = useState({
    Academics: true,
    "Personal & Social": true,
    "Future Plan": true,
    SWOT: true,
  });

  const [printRerenderToggle, setPrintRerenderToggle] = useState(true);
  const [newSurveyResponse, setNewSurveyResponse] = useState({});

  // const [isMobile, setIsMobile] = useState(false);

  function formatSurvey() {
    setIsLoading(true);
    getRequest(`/cde/survey/categories?candidate=${studentId}`, { removeTrailingSlash: true })
      .then((respForm) => {
        const answerByRef = {};
        getRequest(`/cde/typeform/responses/${studentId}`).then((respResp) => {
          respResp.data.forEach((ans) => {
            answerByRef[ans.field.ref] = extractAnswer(ans);
          });

          const surveyByGroup = {};
          respForm.data.forEach((group) => {
            surveyByGroup[group.group] = [];
          });

          respForm.data.forEach((group) => {
            surveyByGroup[group.group].push({
              category: group.category,
              questions: group.questions.map((ques) => ({
                ...ques,
                answer: answerByRef[ques.reference_id],
              })),
            });
          });

          setNewSurveyResponse(surveyByGroup);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChangeFormCheckBoxes(e) {
    const { name } = e.target;

    const currValue = checkStatus[name];
    setCheckStatus((prev) => ({ ...prev, [name]: !currValue }));
  }

  function getReport() {
    getRequest(`/cde/candidates/${studentId}`)
      .then((resp) => {
        setReport(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClickReport() {
    setIsActiveFullReport(true);
    setPrintRerenderToggle((prev) => !prev);
  }

  function handleClosePrint() {
    setIsActiveFullReport(false);
  }

  function handleClickFeedback() {
    if (isActiveFeedback) setIsActiveFeedback(false);
    else setIsActiveFeedback(true);
  }

  // function handleResize() {
  //   if (window.innerWidth < 850) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }

  useEffect(() => {
    formatSurvey();
    getReport();

    // handleResize();
    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const sorted = sortArrOfObjects(graphsForCat, "index", "asc");
    const graphsSplit = splitArrChunks(graphsForCat, 2);
    setGraphsByRow(graphsSplit);
  }, [report]);

  return (
    <div ref={ref} {...props} className={style.wrapper}>
      <div className={style.header}>
        <div className={style.title}> {report.fullname}</div>
        <div className={style.buttons}>
          <button onClick={handleClickFeedback}>
            <VscFeedback size={20} /> {isActiveFeedback ? "View Survey Responses" : "View Candidate Feedback"}
          </button>
          <button onClick={handleClickReport}>
            <Download /> Full Report
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className={style.loaderWrapper}>
          <InlineLoader />
        </div>
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
              {isActiveFeedback ? (
                <Feedback />
              ) : (
                <>
                  {isLoading ? (
                    <InlineLoader />
                  ) : (
                    <>
                      <form onChange={handleChangeFormCheckBoxes}>
                        <RadioGroup className={style.checkBoxes}>
                          {Object.entries(checkStatus).map(([key, value]) => (
                            <div className={style.check} key={key}>
                              <span className={style.checkbox}>
                                <CustomRadio
                                  name={key}
                                  onClick={handleChangeFormCheckBoxes}
                                  checked={checkStatus[key]}
                                />
                              </span>
                              <span className={style.name}>{key}</span>
                            </div>
                          ))}
                        </RadioGroup>
                      </form>

                      {true && (
                        <>
                          <div className={style.secTitle}>Basic Details</div>
                          <div className={style.surveyColumns}>
                            {newSurveyResponse["GENERAL"]?.map((cat) => (
                              <SurveyRespCard className={style.surveyCard} title={cat.category} data={cat.questions} />
                            ))}
                          </div>
                        </>
                      )}

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

                      {checkStatus["Academics"] && (
                        <>
                          <div className={style.secTitle}>Academics</div>
                          <div className={style.surveyColumns}>
                            {newSurveyResponse["ACADEMICS"]?.map((cat) => (
                              <SurveyRespCard className={style.surveyCard} title={cat.category} data={cat.questions} />
                            ))}
                          </div>
                        </>
                      )}

                      {checkStatus["Personal & Social"] && (
                        <>
                          <div className={style.secTitle}>Personal and Social</div>
                          <div className={style.surveyColumns}>
                            {newSurveyResponse["PERSONAL_AND_SOCIAL"]?.map((cat) => (
                              <SurveyRespCard className={style.surveyCard} title={cat.category} data={cat.questions} />
                            ))}
                          </div>
                        </>
                      )}

                      {checkStatus["Future Plan"] && (
                        <>
                          <div className={style.secTitle}>Future Plan</div>
                          <div className={style.surveyColumns}>
                            {newSurveyResponse["FUTURE_PLAN"]?.map((cat) => (
                              <SurveyRespCard className={style.surveyCard} title={cat.category} data={cat.questions} />
                            ))}
                          </div>
                        </>
                      )}

                      {checkStatus["SWOT"] && (
                        <>
                          <div className={style.secTitle}>SWOT</div>
                          <div className={style.surveyColumns}>
                            {newSurveyResponse["SWOT"]?.map((cat) => (
                              <SurveyRespCard className={style.surveyCard} title={cat.category} data={cat.questions} />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default forwardRef(MyReports);
