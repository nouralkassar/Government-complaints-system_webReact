import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { NOTIFICATIONS_ENDPOINTS } from "../../api/endpoints";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get(NOTIFICATIONS_ENDPOINTS.LIST);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (id, thunkAPI) => {
    try {
      await axiosClient.post(NOTIFICATIONS_ENDPOINTS.MARK_READ(id));
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true; })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "فشل تحميل الإشعارات";
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.data.find(n => n.id === id);
        if (notif) notif.read = true;
      });
  },
});

export default notificationsSlice.reducer;
