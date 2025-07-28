import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/ARRequestor/Dashboard";
import JDStatusPage from "../pages/ARRequestor/JDStatusPage";
import AdminConsole from "../pages/Recruiter/AdminConsole";
import JDSearch from "../pages/Recruiter/JDSearch";
import ReportGenerator from "../pages/Recruiter/ReportGenerator";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/jd-status/:jdId" element={<JDStatusPage />} />
    <Route path="/recruiter/admin" element={<AdminConsole />} />
    <Route path="/recruiter/jd-search" element={<JDSearch />} />
    <Route path="/recruiter/report-generator" element={<ReportGenerator />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
