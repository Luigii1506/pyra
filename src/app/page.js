/**
 * Dashboard Page
 * Main dashboard page of the application
 * @created 2024-12-19
 */

import React from "react";
import Dashboard from "../components/Dashboard";

export const metadata = {
  title: "Dashboard - Historia Antigua",
  description: "Panel principal con estadísticas y actividad reciente",
};

export default function DashboardPage() {
  return <Dashboard />;
}
