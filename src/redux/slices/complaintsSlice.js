


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { COMPLAINTS_ENDPOINTS } from "../../api/endpoints";
import { updateComplaintStatus } from "../../services/complaintsService"; // ← تمت إضافتها

export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(COMPLAINTS_ENDPOINTS.LIST);

      console.log("URL used:", axiosClient.defaults.baseURL + COMPLAINTS_ENDPOINTS.LIST);
      console.log("Fetched complaints:", response.data);

      return response.data.data;
    } catch (error) {
      console.log("Error fetching complaints:", error);
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const changeComplaintStatus = createAsyncThunk(
  "complaints/changeStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      await updateComplaintStatus(id, status);

      return { id, status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);


const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "فشل تحميل الشكاوى";
      })

      .addCase(changeComplaintStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const found = state.data.find((c) => c.id === id);
        if (found) {
          found.status = status;
        }
      })
      .addCase(changeComplaintStatus.rejected, (state, action) => {
        state.error = action.payload?.message || "فشل تعديل حالة الشكوى";
      });
  },
});

export default complaintsSlice.reducer;
