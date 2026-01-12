import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { AUTH_ENDPOINTS } from "../../api/endpoints";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axiosClient.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, code }, thunkAPI) => {
    try {
      const response = await axiosClient.post(AUTH_ENDPOINTS.VERIFY_OTP, {
        email,
        code,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  otpAwaiting: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // -----------------------
    // loginUser
    // -----------------------
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpAwaiting = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpAwaiting = true; // ننتقل لمرحلة OTP

        // backend response: data = { email, purpose, message }
        state.user = action.payload.data || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Login failed";
      });

    // -----------------------
    // verifyOtp
    // -----------------------
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;

        const token = action.payload?.data?.token;

        // حفظ التوكن
        if (token) {
          state.token = token;
          localStorage.setItem("token", token);
        }

        // حفظ بيانات المستخدم إذا موجودة
        state.user = action.payload?.data || state.user;

        state.otpAwaiting = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "OTP verification failed";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
