import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutService } from"../../../services/authService";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    const result = await logoutService();

    if (result) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
          <h3 style={{fontSize:20}}>المنصة الحكومية</h3>
        </div>

  <nav className={styles.nav}>
  <NavLink to="/dashboard" end>
    <span>لوحة التحكم</span>
  </NavLink>

  <NavLink to="/Complaints">
    <span>الشكاوى الواردة</span>
  </NavLink>

  <NavLink to="/employees">
    <span>إدارة الموظفين</span>
  </NavLink>

  <NavLink to="/reports">
    <span>التقارير والإحصاءات</span>
  </NavLink>

  <NavLink to="/digital">
    <span>السجل الرقمي</span>
  </NavLink>

  <NavLink to="/notifications">
    <span>الإشعارات</span>
  </NavLink>

  {/* مسافة طبيعية قبل الخط والفصل */}
  <div className={styles.logoutSection}>
    <div className={styles.separator}></div>

    <button
      className={styles.logoutBtn}
      onClick={() => setShowLogoutModal(true)}
    >
      تسجيل الخروج
    </button>
  </div>
</nav>



      </aside>

      {/* Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>تأكيد تسجيل الخروج</h3>
            <p>هل تريد تسجيل الخروج؟</p>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                إلغاء
              </button>

              <button
                className={styles.confirmBtn}
                onClick={handleConfirmLogout}
              >
                نعم، تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
