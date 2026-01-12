import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { STATS_ENDPOINTS } from "../../api/endpoints";


export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, thunkAPI) => {
    try {
      const [totalRes, newRes, procRes] = await Promise.all([
        axiosClient.get(STATS_ENDPOINTS.TOTAL_COMPLAINTS),     
        axiosClient.get(STATS_ENDPOINTS.NEW_COMPLAINTS),       
        axiosClient.get(STATS_ENDPOINTS.IN_PROGRESS),           
      ]);

    return {
  total: totalRes.data?.totalComplaints ?? 0, 
  new: newRes.data?.new_complaints ?? 0,       
  processing: procRes.data?.pending_complaints ?? 0, 
};

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStatsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "فشل تحميل الإحصائيات";
      });
  },
});

export const { clearStatsError } = statsSlice.actions;
export default statsSlice.reducer;
