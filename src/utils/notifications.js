import { toast } from "react-toastify";

export const notifySuccess = (msg) => {
  toast.success(msg, { position: "top-center" });
};

export const notifyError = (msg) => {
  toast.error(msg, { position: "top-center" });
};
