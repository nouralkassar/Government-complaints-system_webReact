import axiosClient from "../api/axiosClient";
import { COMPLAINTS_ENDPOINTS } from "../api/endpoints";

export const updateComplaintStatus = async (id, status) => {
  try {
    const response = await axiosClient.post(COMPLAINTS_ENDPOINTS.SHOW(id), { status });
    return response.data;
  } catch (err) {
    throw err; 
  }
};
