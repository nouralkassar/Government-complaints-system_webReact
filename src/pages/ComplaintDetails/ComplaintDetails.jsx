import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComplaintById,
  lockComplaint,
  unlockComplaint,
  updateComplaintStatus,
  addComplaintNote,
  clearComplaintDetails
} from "../../redux/slices/complaintDetailsSlice";
import styles from "./ComplaintDetails.module.css";

const ComplaintDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error, lockInfo, updating, addNoteLoading } = useSelector((s) => s.complaintDetails);
  const currentUserName = useSelector((s) => s.auth.user?.name); 

  const [noteText, setNoteText] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchComplaintById(id));
    dispatch(lockComplaint(id));

    return () => {
      dispatch(unlockComplaint(id));
      dispatch(clearComplaintDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (data) setStatus(data.status ?? "");
  }, [data]);

  const handleUpdateStatus = async () => {
    if (!data) return;
    await dispatch(updateComplaintStatus({ id, status }));
    dispatch(fetchComplaintById(id));
  };

  const handleAddNote = async () => {
    if (!noteText.trim() || !data) return;
    await dispatch(addComplaintNote({ id, note: noteText }));
    setNoteText("");
    dispatch(fetchComplaintById(id));
  };

  if (loading) return <div className={styles.container}>جارٍ التحميل...</div>;
  if (error) return <div className={styles.container}>خطأ: {error}</div>;
  if (!data) return <div className={styles.container}>لا توجد بيانات للشكاية.</div>;

  const attachments = data.attachments ?? [];
  const isLockedByOther = lockInfo?.lockedBy && lockInfo.lockedBy !== currentUserName;

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <h1>تفاصيل الشكوى #{data.reference || data.id}</h1>
        {lockInfo?.lockedBy && (
          <div className={`${styles.lock} ${isLockedByOther ? styles.lockedByOther : ""}`}>
            {isLockedByOther
              ? `محجوزة حالياً بواسطة: ${lockInfo.lockedBy}`
              : `تم قفل الشكوى لك`}
          </div>
        )}
      </div>

      <section className={styles.section}>
        <h3>معلومات أساسية</h3>
        <p><strong>النوع:</strong> {data.type || data.category}</p>
        <p><strong>المواطن:</strong> {data.submittedBy || data.userName}</p>
        <p><strong>الجهة:</strong> {data.complaintTo || data.department}</p>
        <p><strong>الوصف:</strong> {data.description || data.body}</p>
      </section>

      <section className={styles.section}>
        <h3>المرفقات</h3>
        <div className={styles.attachments}>
          {attachments.length === 0 ? <p>لا توجد مرفقات.</p> :
            attachments.map((att, idx) => (
              <a key={idx} href={att.url || att} target="_blank" rel="noreferrer" className={styles.attachment}>
                فتح المرفق {idx + 1}
              </a>
            ))
          }
        </div>
      </section>

      <section className={styles.section}>
        <h3>تعديل الحالة</h3>
        <div className={styles.controls}>
          <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={isLockedByOther}>
            <option value="">اختر الحالة</option>
            <option value="new">جديدة</option>
            <option value="processing">قيد المعالجة</option>
            <option value="done">منجزة</option>
            <option value="rejected">مرفوضة</option>
          </select>
          <button
            disabled={updating || isLockedByOther}
            onClick={handleUpdateStatus}
            className={styles.primaryBtn}
          >
            {updating ? "جاري التحديث..." : "حفظ التغيير"}
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h3>الملاحظات</h3>
        <div className={styles.addNote}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="أدخل ملاحظة..."
            disabled={isLockedByOther}
          />
          <button
            disabled={addNoteLoading || isLockedByOther}
            onClick={handleAddNote}
            className={styles.secondaryBtn}
          >
            {addNoteLoading ? "جارٍ الإضافة..." : "إضافة ملاحظة"}
          </button>
        </div>

        <div className={styles.notesList}>
          <h4>سجل الملاحظات</h4>
          {data.notes?.length === 0 ? <p>لا توجد ملاحظات.</p> :
            data.notes.map((n, i) => (
              <div key={i} className={styles.noteItem}>
                <div className={styles.noteMeta}>
                  <span>{n.authorName || n.author}</span>
                  <span>{n.created_at?.split("T")[0] || n.date}</span>
                </div>
                <div className={styles.noteBody}>{n.body || n.note}</div>
              </div>
            ))
          }
        </div>
      </section>

      <div className={styles.actions}>
        <button onClick={() => navigate(-1)} className={styles.ghostBtn}>رجوع</button>
      </div>
    </div>
  );
};

export default ComplaintDetails;
