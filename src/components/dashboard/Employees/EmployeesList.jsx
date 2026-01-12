import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../../redux/slices/employeesSlice"; // لاحقًا نربط مع API
import styles from "./EmployeesList.module.css";
import AddEditEmployee from "./AddEditEmployee";

const EmployeesList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditEmployee(null);
    setShowModal(true);
  };

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>خطأ: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>إدارة الموظفين</h2>
      <button onClick={handleAdd} className={styles.primaryBtn}>إضافة موظف جديد</button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الهاتف</th>
            <th>النوع</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
       <tbody>
  {data?.length === 0 ? (
    <tr><td colSpan="5">لا يوجد موظفين لعرضهم</td></tr>
  ) : (
    data.map(emp => (
      <tr key={emp.id}>
        <td>{emp.name}</td>
        <td>{emp.email}</td>
        <td>{emp.department || "لا يوجد"}</td>
        <td>{emp.role}</td>
        <td>
          <button onClick={() => handleEdit(emp)}>تعديل</button>
          <button className={styles.dangerBtn}>حذف</button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

      {showModal && <AddEditEmployee employee={editEmployee} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EmployeesList;
