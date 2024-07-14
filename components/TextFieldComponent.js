import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
      contrastText: "#fff",
    },
  },
});

export default function TextFieldComponent({
  id,
  label,
  valueGetter,
  valueSetter,
  size,
}) {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        onChange={(e) => valueSetter(e.target.value)}
        value={typeof valueGetter === "string" ? valueGetter : ""}
        size={size}
      />
    </ThemeProvider>
  );
}
