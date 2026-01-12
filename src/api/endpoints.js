export const BASE_URL = "http://127.0.0.1:8000/";

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}api/admin_login`,
    // LOGIN: `${BASE_URL}api/employee_login`,

  VERIFY_OTP: `${BASE_URL}api/verifyOtp`,
  LOGOUT: `${BASE_URL}api/user/user_logout`,
  // PROFILE: `${BASE_URL}auth/profile`,
};

// Complaints Endpoints
export const COMPLAINTS_ENDPOINTS = {
  LIST: `${BASE_URL}api/showAllComplaints`,
    // LIST: `${BASE_URL}api/complaintsForDepartment`,

  SHOW: (id) => `${BASE_URL}api/updateComplaint/${id}`,
  UPDATE_STATUS: (id) => `${BASE_URL}api/complaints/${id}`,
  ADD_NOTE: (id) => `${BASE_URL}api/complaints/${id}/notes`,
  ATTACHMENTS: (id) => `${BASE_URL}api/complaints/${id}/attachments`,
};

// Locking
export const LOCKING_ENDPOINTS = {
  LOCK: (id) => `${BASE_URL}api/complaints/${id}/lock`,
  UNLOCK: (id) => `${BASE_URL}api/complaints/${id}/unlock`,
};

// Dashboard Statistics
export const STATS_ENDPOINTS = {
 TOTAL_COMPLAINTS: `${BASE_URL}api/countAllComplaints`,   // مجموع الشكاوى
  NEW_COMPLAINTS: `${BASE_URL}api/countNewComplaints`,     // الشكاوى الجديدة
  IN_PROGRESS: `${BASE_URL}api/countPendingComplaints`, // الشكاوى قيد المعالجة
};

// Users / Employees (Admin Only)
export const EMPLOYEES_ENDPOINTS = {
  LIST: `${BASE_URL}api/showUsers`,
  CREATE: `${BASE_URL}api/employees/create`,
  DELETE: (id) => `${BASE_URL}api/employees/${id}`,
};

// Notifications
export const NOTIFICATIONS_ENDPOINTS = {
  LIST: `${BASE_URL}api/notifications`,
  MARK_READ: (id) => `${BASE_URL}api/notifications/${id}/read`,
};
