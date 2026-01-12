import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import statsReducer from "./slices/statsSlice";
import complaintsReducer from "./slices/complaintsSlice";
import complaintDetailsReducer from "./slices/complaintDetailsSlice";
import employeesReducer from "./slices/employeesSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    stats: statsReducer,
    complaints: complaintsReducer,
    complaintDetails: complaintDetailsReducer,
        employees: employeesReducer,

  },
});

export default store;
