import React from "react";
import style from "./PrintReport.module.scss";

import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";

import InlineLoader from "components/shared/InlineLoader";

import ReportSail from "./sail/ReportSail";
import ReportRise from "./rise/ReportRise";
import ReportRedesign from "./redesign/ReportRedesign";
import ReportRedesignPlus from "./redesign-plus/ReportRedesignPlus";

export default function Print({ report, department, handleClosePrint, printRerenderToggle }) {
  const componentRef = React.useRef(null);
  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(true);
  const [text, setText] = React.useState("");

  function renderReport() {
    switch (department) {
      case "REDESIGN_PLUS":
        return <ReportRedesignPlus report={report} />;
      case "REDESIGN":
        return <ReportRedesign report={report} />;
      case "RISE":
        return <ReportRise report={report} />;
      case "SAIL":
        return <ReportSail report={report} />;
      default:
        return null;
    }
  }

  const handleAfterPrint = React.useCallback(() => {}, []);
  const handleBeforePrint = React.useCallback(() => {
    if (window.innerWidth < 450) {
      handleClosePrint();
    }
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: `Report_${format(new Date(), "dd-MM-yyyy_hhmmss")}`,
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: false,
  });

  React.useEffect(() => {
    if (text === "New, Updated Text!" && typeof onBeforeGetContentResolve.current === "function")
      onBeforeGetContentResolve.current();
  }, [onBeforeGetContentResolve.current, text]);

  React.useEffect(() => {
    handlePrint();
    setLoading(false);
  }, [printRerenderToggle]);

  return (
    <div className={style.wrapper}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "500px",
          }}
        >
          <InlineLoader size={90} />
        </div>
      ) : (
        <div ref={componentRef} className={style.refContainer}>
          {renderReport()}
        </div>
      )}
    </div>
  );
}
