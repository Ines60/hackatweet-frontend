import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordComponent({
  id,
  label,
  valueGette,
  valueSette,
  size,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    return hasUpperCase && hasSpecialChar && hasMinLength;
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    valueSette(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  return (
    <FormControl variant="outlined" size={size}>
      <InputLabel
        sx={{ color: "#fcfcff" }}
        htmlFor="outlined-adornment-password"
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? "text" : "password"}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff",
          },
          "& .MuiInputLabel-outlined": {
            color: "#fcfcff",
          },
          "& .MuiOutlinedInput-input": {
            color: "#fcfcff",
          },
          "& .MuiInputAdornment-root .MuiIconButton-root": {
            color: "#fcfcff",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((show) => !show)}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              edge="end"
              sx={{
                color: "#fcfcff",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        onChange={handleChange}
        value={typeof valueGette === "string" ? valueGette : ""}
      />
      {!isPasswordValid && (
        <FormHelperText error>
          Must contain 8 characters, including an uppercase letter and a
          character special.
        </FormHelperText>
      )}
    </FormControl>
  );
}
