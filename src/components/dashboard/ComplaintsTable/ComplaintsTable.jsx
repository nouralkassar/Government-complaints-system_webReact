import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchComplaints, changeComplaintStatus } from "../../../redux/slices/complaintsSlice";
import { COMPLAINT_STATUS, statusToArabic } from "../../../constants/complaintStatus";
import styles from "./ComplaintsTable.module.css";
import { notifySuccess, notifyError } from "../../../utils/notifications";

const ComplaintsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector(state => state.complaints);
const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

 const handleStatusChange = (id, status) => {
  setUpdatingStatusId(id);

  dispatch(changeComplaintStatus({ id, status }))
    .unwrap()
    .then(() => {
      notifySuccess("تم تحديث حالة الشكوى بنجاح");
      setEditingId(null);
    })
    .catch(() => {
      notifyError("حدث خطأ أثناء تحديث الحالة");
    })
    .finally(() => {
      setUpdatingStatusId(null);
    });
};

  const filteredItems = (data ?? []).filter(item => {
    const matchesSearch =
      item.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? item.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => { 
    if (page >= 1 && page <= totalPages) setCurrentPage(page); 
  };

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>خطأ: {error}</p>;

  return (
    <div className={styles.container}>
      
      {/* البحث والفلترة */}
      <div className={styles.controls}>
        <input 
          type="text" 
          placeholder="بحث بالشكاوى..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
        />

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">كل الحالات</option>
          {COMPLAINT_STATUS.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* الجدول */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>الرقم المرجعي</th>
            <th>نوع الشكوى</th>
            <th>الوصف</th>
            <th>الحالة</th>
            <th>الملاحظات</th>
            <th>المرفقات</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.length === 0 ? (
            <tr><td colSpan="6">لا توجد شكاوى لعرضها.</td></tr>
          ) : (
            currentItems.map(item => (
              <tr 
                key={item.id} 
                onClick={() => navigate(`/complaints/${item.id}`)}
                className={styles.rowClickable}
              >
                <td>{item.referenceNumber}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>

                {/* الحالة */}
                <td onClick={e => e.stopPropagation()}>
                  {editingId === item.id ? (
                    <select
                      value={selectedStatus}
                      onChange={e => handleStatusChange(item.id, e.target.value)}
                      className={styles.dropdown}
                    >
                      {COMPLAINT_STATUS.map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  ) : (
                    <span
                            className={`${styles.statusWrapper} ${styles[`status-${item.status}`]}`}
                            onClick={() => {
                              setEditingId(item.id);
                              setSelectedStatus(item.status);
                            }}
                          >
                            {updatingStatusId === item.id ? (
                              <span className={styles.loadingSpinner}></span>
                            ) : (
                              statusToArabic[item.status] ?? item.status
                            )}
                          </span>

                  )}
                </td>

                <td>
                  {Array.isArray(item.notesForEmployee) && item.notesForEmployee.length > 0
                    ? item.notesForEmployee.join(", ")
                    : "-"}
                </td>

                <td>{item.file ? 1 : "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          السابق
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ""}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default ComplaintsTable;
