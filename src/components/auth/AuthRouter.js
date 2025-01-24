import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Navbar from "components/navbar/Navbar";
import NewCandidate from "./NewCandidate";
import { getRequest } from "utils/api";
import InlineLoader from "components/shared/InlineLoader";

function isTokenPresent() {
  return "accessToken" in localStorage || "accessToken" in sessionStorage;
}

export default function Router() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRequest(`/accounts/profile`)
      .then((resp) => {
        if (!resp.data.is_generated) {
          window.location.href = "/dashboard";
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "500px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InlineLoader size={90} />
        </div>
      ) : (
        <>
          <Navbar background="white" />
          <Routes>
            <Route
              path="login"
              element={
                isTokenPresent() ? <Navigate to="/dashboard" /> : <Login />
              }
            />

            <Route
              path="register"
              element={
                isTokenPresent() ? <Navigate to="/dashboard" /> : <Register />
              }
            />

            <Route path="new-user" element={<NewCandidate />} />
          </Routes>
        </>
      )}
    </>
  );
}
