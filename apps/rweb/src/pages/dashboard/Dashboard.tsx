import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminStore } from "../../stores/adminStore";

const Dashboard = () => {
  const isAuth = useAdminStore((state) => state.isAuth);
  if (!isAuth) {
    return <Navigate to="/dashboard/login" />;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
