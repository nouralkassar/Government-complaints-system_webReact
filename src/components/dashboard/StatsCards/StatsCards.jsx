

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../../redux/slices/statsSlice";
import styles from "./StatsCards.module.css";

const StatsCards = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <div className={styles.stats}><div className={styles.card}>جارٍ التحميل...</div></div>;
  if (error) return <div className={styles.stats}><div className={styles.card}>خطأ: {error}</div></div>;

  // بيانات افتراضية إن كانت null
  const total = data?.totalComplaints ?? data?.total ?? 0;
  const neu = data?.newComplaints ?? data?.new ?? 0;
const proc = data?.processing ?? 0;

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <h3>مجموع الشكاوى</h3>
        <h2>{total}</h2>
      </div>
      <div className={styles.card}>
        <h3>الشكاوى الجديدة</h3>
        <h2>{neu}</h2>
      </div>
      <div className={styles.card}>
        <h3>الشكاوى المعلقة</h3>
        <h2>{proc}</h2>
      </div>
    </div>
  );
};

export default StatsCards;
