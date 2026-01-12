import React from "react";
import styles from "./ExportReports.module.css";

const ExportReports = () => {
  const handleExportCSV = () => {
    alert("سيتم تصدير CSV بعد استلام بيانات الباك");
  };

  const handleExportPDF = () => {
    alert("سيتم تصدير PDF بعد استلام بيانات الباك");
  };

  return (
    <div className={styles.exportButtons}>
      <button onClick={handleExportCSV}>تصدير CSV</button>
      <button onClick={handleExportPDF}>تصدير PDF</button>
    </div>
  );
};

export default ExportReports;
