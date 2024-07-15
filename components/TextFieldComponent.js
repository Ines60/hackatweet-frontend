import { TextField } from "@mui/material";

export default function TextFieldComponent({
  id,
  label,
  valueGetter,
  valueSetter,
  size,
}) {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      onChange={(e) => valueSetter(e.target.value)}
      value={typeof valueGetter === "string" ? valueGetter : ""}
      size={size}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#fcfcff",
          },
          "&:hover fieldset": {
            borderColor: "#fcfcff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#fcfcff",
          },
        },
        "& .MuiInputLabel-outlined": {
          color: "#fcfcff",
        },
        "&:hover .MuiInputLabel-outlined": {
          color: "#fcfcff",
        },
        "&.Mui-focused .MuiInputLabel-outlined": {
          color: "#fcfcff",
        },
        "& .MuiOutlinedInput-input": {
          color: "#fcfcff",
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "#fcfcff",
        },
        "&.Mui-focused .MuiOutlinedInput-input": {
          color: "#fcfcff",
        },
      }}
    />
  );
}
