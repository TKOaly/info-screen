import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#303030",
      paper: "#303030"
    }
  },
  typography: {
    fontSize: 24
  }
});

export default theme;
