import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
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
            borderColor: "#ffffff", // Bordure blanche
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Bordure blanche au survol
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Bordure blanche en focus
          },
          "& .MuiInputLabel-outlined": {
            color: "#fcfcff", // Couleur du label en blanc
          },
          "& .MuiOutlinedInput-input": {
            color: "#fcfcff", // Couleur du texte en blanc
          },
          "& .MuiInputAdornment-root .MuiIconButton-root": {
            color: "#fcfcff", // Couleur de l'IconButton en blanc
            "&:hover": {
              backgroundColor: "transparent", // Fond transparent au survol
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
                color: "#fcfcff", // Couleur de l'IconButton
                "&:hover": {
                  backgroundColor: "transparent", // Fond transparent au survol
                },
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        onChange={(e) => valueSette(e.target.value)}
        value={typeof valueGette === "string" ? valueGette : ""}
      />
    </FormControl>
  );
}
