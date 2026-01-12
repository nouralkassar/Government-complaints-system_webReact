import React from "react";
import Sidebar from "../../components/dashboard/Sidebar/sidebar";
import Header from "../../components/dashboard/Header/Header";
import StatsCards from "../../components/dashboard/StatsCards/StatsCards";
import styles from "./dashboard.module.css";
import StatsCharts from "../../components/dashboard/StatsCharts/StatsCharts";
import ComplaintsTable from "../../components/dashboard/ComplaintsTable/ComplaintsTable";
const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
            <Sidebar />

      <main className={styles.mainContent}>
        <Header />
        <StatsCards />

        <h2 className={styles.tableTitle}>جدول الشكاوى</h2>
        <ComplaintsTable />
      </main>
    </div>
  );
};

export default Dashboard;
