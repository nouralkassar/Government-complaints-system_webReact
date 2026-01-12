import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import styles from "./StatsCharts.module.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatsCharts = () => {
  const stats = useSelector((state) => state.stats.data);

  if (!stats) return <p>جارٍ تحميل الإحصائيات...</p>;

  const statusData = stats.byStatus ?? [];
  const typeData = stats.byType ?? [];
  const departmentData = stats.byDepartment ?? [];

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartBox}>
        <h3>عدد الشكاوى حسب الحالة</h3>
        <PieChart width={250} height={250}>
          <Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className={styles.chartBox}>
        <h3>عدد الشكاوى حسب النوع</h3>
        <BarChart width={300} height={250} data={typeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#00C49F" />
        </BarChart>
      </div>

      <div className={styles.chartBox}>
        <h3>عدد الشكاوى حسب الجهة</h3>
        <BarChart width={300} height={250} data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#FFBB28" />
        </BarChart>
      </div>
    </div>
  );
};

export default StatsCharts;
