import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationRead } from "../../../redux/slices/notificationsSlice";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.notifications);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  const unreadCount = data.filter(n => !n.read).length;

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={() => setOpen(!open)}>
        🔔 {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </div>

      {open && (
        <div className={styles.dropdown}>
          {loading ? <p>جارٍ التحميل...</p> :
            data.length === 0 ? <p>لا توجد إشعارات</p> :
            data.map((n) => (
              <div
                key={n.id}
                className={`${styles.notification} ${n.read ? styles.read : styles.unread}`}
                onClick={() => handleMarkRead(n.id)}
              >
                <p>{n.message}</p>
                <span>{n.date?.split("T")[0]}</span>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Notifications;
