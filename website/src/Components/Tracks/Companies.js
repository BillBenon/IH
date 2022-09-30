import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

let styles = (theme) => {
  return {
    root: {
      padding: "0 8rem",
      display: "grid",
      marginBottom: "1rem",
      gridTemplateColumns: "1fr 3fr",
      gridTemplateRows: "auto",
      // gridTemplateAreas: "text logos",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
        justifyContent: "space-between",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px !important",
        marginTop: "1rem",
        gridTemplateColumns: "1fr",
        textAlign: "center",
      },
    },
    rightContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "0.5rem",
    },
    leftContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end",
      [theme.breakpoints.up("sm")]: {
        justifyContent: "space-between",
        width: "730px"
      },
      [theme.breakpoints.down("md")]: {
        justifyContent: "flex-start",
      },
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-evenly",
      },
    },
    brandContainer: {
      width: "160px",
      height: "90px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "150px",
        justifyContent: "center",
      },
    },
    heading: {
      fontSize: "3rem",
      fontWeight: 800,
      fontFamily: '"Gilroy-Bold", sans-serif',
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
        fontWeight: 600,
      },
    },
    subHeading: {
      fontSize: "1.1rem",
      color: "#18191F",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "2rem",
        fontSize: "18px",
        color: "#767676",
      },
    },
  };
};

function Companies({ classes, pageProps }) {
  return (
    <Grid className={classes.root} id="container">
      <div className={classes.rightContainer}>
        <Typography variant="h3" className={classes.heading}>
          {pageProps.heading}
        </Typography>
        <Typography variant="subtitle1" className={classes.subHeading}>
          {pageProps.subHeading}
        </Typography>
      </div>
      <div className={classes.leftContainer}>
        {pageProps.data.map((brand, index) => (
          <div key={index} className={classes.brandContainer}>
            <img alt="" src={brand}></img>
          </div>
        ))}
      </div>
    </Grid>
  );
}

export default withStyles(styles)(Companies);
