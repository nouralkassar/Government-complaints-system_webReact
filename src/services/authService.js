import { AUTH_ENDPOINTS } from "../api/endpoints";
import axiosClient from "../api/axiosClient";
export const logoutService = async () => {
  try {
    await axiosClient.post(AUTH_ENDPOINTS.LOGOUT);

    localStorage.removeItem("token");

    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
};


export const loginService = (data) => {
  return axiosClient.post(AUTH_ENDPOINTS.LOGIN, data);
};

export const verifyOtpService = (data) => {
  return axiosClient.post(AUTH_ENDPOINTS.VERIFY_OTP, data);
};

