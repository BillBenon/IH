import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import PriceBackground from "../../assets/tracks/price.svg";

let styles = (theme) => {
  return {
    root: {
      padding: "0 8rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0",
        height: "auto",
      },
    },
    paperRoot: {
      padding: "2rem 1rem",
      height: "37rem",
      minHeight: 400,
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      fontSize: "16px",
      justifyContent: "space-between",
      filter:
        "drop-shadow(0px 4px 4px rgba(51, 51, 51, 0.04)) drop-shadow(0px 4px 24px rgba(51, 51, 51, 0.1))",
      "& .btn-wrapper ": {
        // marginTop: "auto",
      },
      "& button": {
        color: "#315CD5",
        border: "1px solid #315CD5",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "306px",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "13.2px",
        gap: "2rem",
        filter:
          "drop-shadow(0px 3.29922px 3.29922px rgba(51, 51, 51, 0.04)) drop-shadow(0px 3.29922px 19.7953px rgba(51, 51, 51, 0.1))",
        borderRadius: "8.24806px",
      },
    },

    tileHeading: {
      fontSize: "22px",
      fontWeight: 600,
      textTransform: "uppercase",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
      },
    },
    text: {
      paddingTop: 20,
    },
    subtext: {
      paddingTop: 10,
    },

    heading: {
      padding: "0",
      fontSize: "3rem",
      textAlign: "center",
      textTransform: "capitalize",
      marginBottom: "1.2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
    },
    subHeader: {
      color: "#767676",
      fontSize: "24px",
      margin: "15px 0px",
      marginBottom: "3rem",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "3.5rem",
        marginTop: "0.5rem",
        fontSize: "18px",
      },
    },
    paperWithBackground: {
      backgroundImage: `url(${PriceBackground})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      color: "white",
      "& h5": {
        color: "white",
      },
      "& button": {
        backgroundColor: "white",
        border: "none",
      },
    },
    mainTile: {
      display: "flex",
      flexWrap: "nowrap",
      gap: "1rem",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
    button: {
      width: "226px",
      height: "52px",
      flex: 1,
      fontSize: "16px",
      textTransform: "capitalize",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13.2px",
      },
      '&:hover': {
        backgroundColor: "#f7f7f9"
      },
    },
    suffix: { fontSize: "0.75rem", fontWeight: 700 },
    listItem: {
      fontSize: "15px"
    },
    listWrapper: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      height: "28rem",
    },
    listStyle: {
      overflow: "hidden",
      height: "22rem",
      [theme.breakpoints.down("md")]: {
        height: "20rem"
      }
    },
    priceContainer: {
      display: "flex",
      paddingLeft: "20px",
      marginTop: "auto",
      fontFamily: "'Gilroy-Bold'"
    }
  };
};
const Tile = ({ classes, heading, listItems, price, withBackground, btnText, onClickCTA }) => (
  <Paper
    elevation={0}
    className={clsx(
      classes.paperRoot,
      withBackground ? classes.paperWithBackground : ""
    )}
  >
    <div className={classes.listWrapper}>
      <Typography variant="h5" className={classes.tileHeading}>
        {heading}
      </Typography>
      <ul className={classes.listStyle}>
        {listItems.slice(0, 5).map((listItem) => (
          <li key={listItem}>
            <p className={classes.listItem}>{listItem}</p>
          </li>
        ))}
      </ul>
      <div className={classes.priceContainer}
        style={{
          visibility: price ? "visible" : "hidden",
        }}
      >
        <div style={{ fontSize: "45px", fontWeight: 900 }}>{price ?? "_"}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "22px" }}>$</div>
          <div className={classes.suffix}>Per Month</div>
        </div>
      </div>
    </div>
    <div
      className="btn-wrapper"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Button variant="outlined" className={classes.button} onClick={onClickCTA}>
        {btnText}
      </Button>
    </div>
  </Paper>
);

function Plans({ classes, pageProps }) {

  return (
    <Grid className={clsx(classes.root, "plans")}>
      <Typography variant="h3" className={classes.heading}>
        {pageProps.heading}
      </Typography>
      <div className={classes.mainTile}>
        {pageProps.data.map((item, i) => (
          <Fragment key={i}>
            <Tile
              classes={classes}
              withBackground={i === 1 ? true : false}
              {...item}
            />
          </Fragment>
        ))}
      </div>
    </Grid>
  );
}

export default withStyles(styles)(Plans);
