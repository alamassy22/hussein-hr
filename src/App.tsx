import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { DataPersistenceProvider } from "./contexts/DataPersistenceContext";
import { Toaster } from "./components/ui/toaster";

// Pages
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Employees from "./components/pages/Employees";
import Attendance from "./components/pages/Attendance";
import Leaves from "./components/pages/Leaves";
import Payroll from "./components/pages/Payroll";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";
import SuperAdminDashboard from "./components/pages/SuperAdminDashboard";
import Tasks from "./components/pages/Tasks";
import Maintenance from "./components/pages/Maintenance";
import Vehicles from "./components/pages/Vehicles";
import Resignations from "./components/pages/Resignations";
import Recruitment from "./components/pages/Recruitment";
import Training from "./components/pages/Training";
import OrganizationalStructure from "./components/pages/OrganizationalStructure";
import PlanningAndExecution from "./components/pages/PlanningAndExecution";
import LettersAndNotices from "./components/pages/LettersAndNotices";
import Custody from "./components/pages/Custody";

function App() {
  const AppContent = () => (
    <div className="App" dir="rtl">
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/resignations" element={<Resignations />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/training" element={<Training />} />
        <Route
          path="/organizational-structure"
          element={<OrganizationalStructure />}
        />
        <Route
          path="/planning-and-execution"
          element={<PlanningAndExecution />}
        />
        <Route path="/letters-and-notices" element={<LettersAndNotices />} />
        <Route path="/custody" element={<Custody />} />

        {/* Add this before the catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Toaster />
    </div>
  );

  return (
    <AuthProvider>
      <DataPersistenceProvider>
        <AppContent />
      </DataPersistenceProvider>
    </AuthProvider>
  );
}

export default App;
