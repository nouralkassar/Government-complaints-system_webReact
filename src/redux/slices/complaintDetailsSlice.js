import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { COMPLAINTS_ENDPOINTS, LOCKING_ENDPOINTS } from "../../api/endpoints";

export const fetchComplaintById = createAsyncThunk(
  "complaintDetails/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosClient.get(COMPLAINTS_ENDPOINTS.SHOW(id));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const updateComplaintStatus = createAsyncThunk(
  "complaintDetails/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await axiosClient.put(COMPLAINTS_ENDPOINTS.UPDATE_STATUS(id), { status });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const addComplaintNote = createAsyncThunk(
  "complaintDetails/addNote",
  async ({ id, note }, thunkAPI) => {
    try {
      const res = await axiosClient.post(COMPLAINTS_ENDPOINTS.ADD_NOTE(id), { note });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const lockComplaint = createAsyncThunk(
  "complaintDetails/lock",
  async (id, thunkAPI) => {
    try {
      const res = await axiosClient.post(LOCKING_ENDPOINTS.LOCK(id));
      return res.data; // نتوقع { lockedBy: "اسم الموظف" }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const unlockComplaint = createAsyncThunk(
  "complaintDetails/unlock",
  async (id, thunkAPI) => {
    try {
      const res = await axiosClient.post(LOCKING_ENDPOINTS.UNLOCK(id));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const complaintDetailsSlice = createSlice({
  name: "complaintDetails",
  initialState: {
    data: null,
    loading: false,
    error: null,
    lockInfo: null,
    updating: false,
    addNoteLoading: false,
  },
  reducers: {
    clearComplaintDetails(state) {
      state.data = null;
      state.lockInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaintById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchComplaintById.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchComplaintById.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message; });

    builder
      .addCase(updateComplaintStatus.pending, (state) => { state.updating = true; })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => { state.updating = false; state.data = action.payload; })
      .addCase(updateComplaintStatus.rejected, (state, action) => { state.updating = false; state.error = action.payload?.message; });

    builder
      .addCase(addComplaintNote.pending, (state) => { state.addNoteLoading = true; })
      .addCase(addComplaintNote.fulfilled, (state, action) => { state.addNoteLoading = false; state.data = action.payload; })
      .addCase(addComplaintNote.rejected, (state, action) => { state.addNoteLoading = false; state.error = action.payload?.message; });

    builder
      .addCase(lockComplaint.fulfilled, (state, action) => { state.lockInfo = action.payload; })
      .addCase(unlockComplaint.fulfilled, (state) => { state.lockInfo = null; });
  }
});

export const { clearComplaintDetails } = complaintDetailsSlice.actions;
export default complaintDetailsSlice.reducer;
