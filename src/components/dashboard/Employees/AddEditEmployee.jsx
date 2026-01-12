import React, { useState, useEffect } from "react";
import styles from "./AddEditEmployee.module.css";

const AddEditEmployee = ({ employee, onClose }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("employee"); // default

  useEffect(() => {
    if (employee) {
      setFirstname(employee.firstname);
      setLastname(employee.lastname);
      setEmail(employee.email);
      setPhoneNumber(employee.phoneNumber);
      setRole(employee.role);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // لاحقًا: dispatch API create/update
    console.log({ firstname, lastname, email, phoneNumber, role });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{employee ? "تعديل الموظف" : "إضافة موظف جديد"}</h3>
        <form onSubmit={handleSubmit}>
          <input placeholder="الاسم الأول" value={firstname} onChange={e => setFirstname(e.target.value)} required />
          <input placeholder="الاسم الأخير" value={lastname} onChange={e => setLastname(e.target.value)} required />
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="رقم الهاتف" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="admin">مشرف عام</option>
            <option value="employee">موظف جهة حكومية</option>
          </select>
          <div className={styles.actions}>
            <button type="submit">{employee ? "حفظ التعديلات" : "إضافة"}</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditEmployee;
