import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import { EMPLOYEES_ENDPOINTS } from "../../api/endpoints";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const response = await axiosClient.get(EMPLOYEES_ENDPOINTS.LIST);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "خطأ أثناء جلب الموظفين");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;
