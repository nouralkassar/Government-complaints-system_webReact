import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>منصة إدارة الشكاوى الحكومية</h1>
      <div className={styles.actions}>
        <div className={styles.iconBtn}>🔔</div>
        <div className={styles.iconBtn}>👤</div>
      </div>
    </header>
  );
};

export default Header;
