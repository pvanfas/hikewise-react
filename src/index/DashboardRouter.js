import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardContainer from "components/dashboard-customer/Container";
import DashboardContainerCounseller from "components/dashboard-counsellor/Container";
import DashboardContainerVendor from "components/dashboard-vendor/Container";

export default function DashboardRouter() {
  return (
    <Routes>
      <Route path="counsellor/*" element={<DashboardContainerCounseller />} />
      <Route path="vendor/*" element={<DashboardContainerVendor />} />
      <Route path="candidate/*" element={<DashboardContainer />} />
    </Routes>
  );
}
