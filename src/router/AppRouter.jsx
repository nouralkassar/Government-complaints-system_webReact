// src/router/AppRouter.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate ,useNavigate} from "react-router-dom";

import Login from "../pages/Login/Login";
import Otp from "../pages/Login/Otp";
import Dashboard from "../pages/Dashboard/dashboard";
import ComplaintsTable from "../components/dashboard/ComplaintsTable/ComplaintsTable";
import ComplaintDetails from "../pages/ComplaintDetails/ComplaintDetails";
import EmployeesList from "../components/dashboard/Employees/EmployeesList";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  // const navigate = useNavigate();
  // const [checkingToken, setCheckingToken] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     // إذا موجود، وجّهه للداشبورد
  //     navigate("/dashboard", { replace: true });
  //   }

  //   setCheckingToken(false);
  // }, [navigate]);

  // if (checkingToken) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "50px" }}>
  //       جارٍ التحقق...
  //     </div>
  //   );
  // }

  return (
    <Routes>
=      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

     

      <Route
        path="/complaints"
        element={
          <PrivateRoute>
            <ComplaintsTable />
          </PrivateRoute>
        }
      />

      <Route
        path="/complaints/:id"
        element={
          <PrivateRoute>
            <ComplaintDetails />
          </PrivateRoute>
        }
      />

       <Route
        path="/employees"
        element={
          <PrivateRoute>
            <EmployeesList />
          </PrivateRoute>
        }
      />
    </Routes>
    
  );
};

export default AppRouter;
