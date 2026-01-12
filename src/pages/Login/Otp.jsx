import React, { useState, useRef, useEffect } from "react";
import { Box, Button, CircularProgress, Alert, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Otp.module.css";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((state) => state.auth);

  const emailFromState = location.state?.email || "";
  const [email] = useState(emailFromState);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // الانتقال للمربع التالي
    if (value && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }

    // إذا اكتملت الـ 6 أرقام، حاول التحقق مباشرة
    if (newOtp.every((digit) => digit !== "")) {
      handleSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (code) => {
    // إذا استدعيت من الزر Submit، نقوم بجمع الكود
    if (!code) code = otp.join("");

    if (!email) {
      alert("لا يوجد بريد إلكتروني. عُد لصفحة تسجيل الدخول وأعد المحاولة.");
      return;
    }

    const result = await dispatch(verifyOtp({ email, code }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard"); // الانتقال للداشبورد
    }
  };

  return (
    <Box className={styles.otpContainer}>
      <Typography variant="h5" className={styles.title}>
        رمز التحقق (OTP)
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <Box className={styles.otpInputs}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className={styles.otpBox}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? <CircularProgress size={20} /> : "تأكيد الرمز"}
        </Button>
      </form>
    </Box>
  );
};

export default Otp;
