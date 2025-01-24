import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useUserContext } from "contexts/AllContexts";

import InlineLoader from "components/shared/InlineLoader";
import Page404 from "components/page404/Page404";
import ContactUs from "components/hikewise-contact-us/ContactUs";

import ReactGA from "react-ga";
import config from "config/config";

// import PrintReport from "components/print-report/PrintReport";

const DashboardRouter = lazy(() => import("./DashboardRouter"));
const AuthRouter = lazy(() => import("components/auth/AuthRouter"));
const AssessmentRouter = lazy(() => import("components/assessment/AssessmentRouter"));
const LandingContainer = lazy(() => import("components/landing/Container"));

const Departments = lazy(() => import("components/hikewise-department/HikewiseDept"));
const HikewiseAssessment = lazy(() => import("components/hikewise-assessment/Assessment"));
const HikewiseCounselling = lazy(() => import("components/hikewise-counselling/Counselling"));
const HikewiseAbout = lazy(() => import("components/hikewise-about/Page5"));

const Iccc = lazy(() => import("components/hikewise-iccc/Iccc"));
const Institute = lazy(() => import("components/hikewise-institutions/Institute"));
const Counsellor = lazy(() => import("components/hikewise-partner-program/Counsellor"));
const WorkingProfessionals = lazy(() => import("components/hikewise-working-professionals/WorkingProfessionals"));

const TermsAndConditions = lazy(() => import("components/terms-conditions/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("components/privacy-policy/PrivacyPolicy"));
const Disclaimer = lazy(() => import("components/disclaimer/Disclaimer"));

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

function isLoggedIn() {
  if (isTokenPresent()) return true;
  else return false;
}

ReactGA.initialize(config.gaTrackingId);

export default function AppRouter() {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    if (!userContext) return;
    if (!userContext.state) return;
    if (!userContext.state.profile) return;

    setIsLoading(false);

    const isNewUser = userContext.state.profile.is_generated;

    const pathSplit = location.pathname.split("/");

    const elem = document.getElementsByTagName("jdiv");
    if (pathSplit.includes("assessment") || pathSplit.includes("sessions")) {
      if (elem[0]) {
        elem[0].style.display = "none";
      }
    } else {
      if (elem[0]) {
        elem[0].style.display = "block";
      }
    }

    if (isNewUser) navigate("/auth/new-user");
    else {
      if (pathSplit.find((f) => f === "dashboard")) {
        let strPath = "";

        if (pathSplit.includes("vendor")) {
          for (let i = pathSplit.length; i--; i >= 0) {
            if (pathSplit[i] !== "vendor" && pathSplit[i] !== "counsellor" && pathSplit[i] !== "dashboard") {
              strPath = `/${pathSplit[i]}${strPath}`;
            } else {
              break;
            }
          }
        } else {
          for (let i = pathSplit.length; i--; i >= 0) {
            if (
              pathSplit[i] !== "vendor" &&
              pathSplit[i] !== "counsellor" &&
              pathSplit[i] !== "candidate" &&
              pathSplit[i] !== "dashboard"
            ) {
              strPath = `/${pathSplit[i]}${strPath}`;
            } else {
              break;
            }
          }
        }

        strPath += location.search;

        const { user_type } = userContext.state.profile;

        if (user_type) {
          if (user_type === "VENDOR") navigate(`/dashboard/vendor${strPath}`);
          else if (user_type === "CDE") navigate(`/dashboard/counsellor${strPath}`);
          else navigate(`/dashboard/candidate${strPath}`);
        }
      }
    }
  }, [userContext, location.pathname]);

  useEffect(() => {
    window.setTimeout(() => {
      const pathSplit = location.pathname.split("/");
      const elem = document.getElementsByTagName("jdiv");
      if (
        pathSplit.includes("assessment") ||
        pathSplit.includes("sessions") ||
        (pathSplit.includes("candidate") && pathSplit.includes("reports"))
      ) {
        if (elem[0]) elem[0].style.display = "none";
      } else {
        if (elem[0]) elem[0].style.display = "block";
      }
    }, 3000);
  }, []);

  const loaderStyle = {
    display: "flex",
    width: "100%",
    height: "500px",
    justifyContent: "center",
    alignItems: "center",
  };

  return isLoading ? (
    <div style={loaderStyle}>
      <InlineLoader size={90} />
    </div>
  ) : (
    <Suspense
      fallback={
        <div style={loaderStyle}>
          <InlineLoader size={90} />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<Page404 />} />

        <Route path="/" element={<LandingContainer />} />
        <Route path="auth/*" element={<AuthRouter />} />
        <Route path="assessment/*" element={isLoggedIn() ? <AssessmentRouter /> : <Navigate to="/auth/login" />} />
        <Route path="dashboard/*" element={isLoggedIn() ? <DashboardRouter /> : <Navigate to="/auth/login" />} />

        <Route path="/about" element={<HikewiseAbout />} />

        <Route path="/assessment" element={<HikewiseAssessment />} />
        <Route path="/post-assessment" element={<HikewiseCounselling />} />

        <Route path="/rise" element={<Departments type="8-9" />} />
        <Route path="/sail" element={<Departments type="10-12" />} />
        <Route path="/redesign" element={<Departments type="collg" />} />

        <Route path="/ccde" element={<Iccc />} />
        <Route path="/institutions" element={<Institute />} />
        <Route path="/partner-program" element={<Counsellor />} />
        <Route path="/working-professionals" element={<WorkingProfessionals />} />

        <Route path="/t&c" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Suspense>
  );
}
