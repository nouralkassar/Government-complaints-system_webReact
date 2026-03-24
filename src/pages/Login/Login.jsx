
import React from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Alert,
  Box,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import { MailOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import useLogin from "../../hooks/useLogin";
import styles from "./Login.module.css";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
    loading,
    error
  } = useLogin();

  return (
    <Box className={styles.loginContainer}>
      <Typography variant="h4" className={styles.title}>
        تسجيل الدخول
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          label="البريد الإلكتروني"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MailOutline />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="كلمة المرور"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button type="submit" fullWidth disabled={loading} className={styles.loginButton}>
          {loading ? <CircularProgress size={24} style={{ color: "#fff" }} /> : "تسجيل الدخول"}
        </Button>
      </form>
    </Box>
  );
}
