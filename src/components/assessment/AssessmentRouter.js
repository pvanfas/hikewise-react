import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import TypeForm from "./typeform/TypeForm";

import DemoAssessment from "./demo-assessment/Container";
import LiveAssessment from "./live-assessment/Container";
import TestCompletion from "./test-completion/TestCompletion";

import Plans from "./Plans";
import PlanPrompt from "./PlanPrompt";

import { getRequest } from "utils/api";
import { useAppContext } from "contexts/AllContexts";
import InlineLoader from "components/shared/InlineLoader";

export default function Router() {
  const AppContext = useAppContext();
  const { isOpenCompletionModal } = AppContext.state;

  const [isLoading, setIsLoading] = useState(false);
  const [isPlanActive, setIsPlanActive] = useState(false);

  function getCounsellingStatus() {
    setIsLoading(true);
    getRequest(`/counselling/status`)
      .then((resp) => {
        setIsLoading(false);

        if (!resp.data.is_assessment_consumed) {
          setIsPlanActive(true);
        } else {
          setIsPlanActive(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCounsellingStatus();
  }, []);

  return (
    <>
      {isOpenCompletionModal && <TestCompletion />}

      {isLoading ? (
        <div
          style={{ width: "100%", height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <InlineLoader size={90} />
        </div>
      ) : (
        <Routes>
          <Route path="demo" element={<DemoAssessment />} />
          <Route path="live" element={isPlanActive ? <LiveAssessment type={"REDESIGN"} /> : <PlanPrompt />} />
          <Route path="plans" element={<Plans />} />

          <Route path="survey/:formId" element={<TypeForm />} />
        </Routes>
      )}
    </>
  );
}
