import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#315CD5",
    },
    secondary: {
      main: "#fff",
    },
    subheading: {
      main: "#818182",
    },
  },
  typography: {
    fontFamily: ["Gilroy-Regular", "sans-serif"].join(","),
  },
  overrides: {
    MuiButton: {
      contained: {
        color: "#fff",
        backgroundColor: "#315CD5",
        borderRadius: 10,
        textTransform: "none",
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "2em",
        color: "rgba(0, 0, 0, 0.23)",
        backgroundColor: "#FFF",
        border: "1px solid rgba(0, 0, 0, 0.23)",
      },
    },
    MuiTypography: {
      root: {
        fontFamily: "'Gilroy-Regular', sans-serif",
        letterSpacing: "0px",
      },
      h1: {
        fontSize: 40,
        fontWeight: 500,
        color: "#FFF",
      },
      h2: {
        fontSize: 28,
        fontWeight: 500,
        color: "#545454",
      },
      h3: {
        fontWeight: 600,
        // fontFamily: "Poppins Bold",
      },
      h5: {
        fontSize: 20,
        fontWeight: 500,
        color: "#545454",
      },
      body1: {
        color: "#7E7E7E",
        fontSize: 15,
      },
    },
  },
});

export default theme;
