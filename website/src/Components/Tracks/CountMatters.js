import React, { Fragment } from "react";
import {
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import Background from "../../assets/tracks/count_back.svg";

let styles = (theme) => {
  return {
    root: {
      display: "flex",
      padding: "3.5rem",
      flexDirection: "column",
      alignItems: "center",
      margin: "0 8rem",
      [theme.breakpoints.down("sm")]: {
        margin: "0",
        background: "none",
        color: "#18191F",
        textAlign: "center",
        padding: 0,
      },
    },
    colored: {
      background: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      borderRadius: "16px",
      color: "white",
      "& > .customTitle": {
        color: "white !important",
      },
    },
    heading: {
      fontSize: "3rem",
      fontFamily: "'Gilroy-Bold', sans-serif",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
    },
    subHeading: {
      // marginTop: "1rem",
      marginBottom: "2rem",
      fontSize: "1rem",
      color: "#767676",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1.5rem",
        marginTop: "0.5rem",
        fontSize: "18px",
      },
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "space-between",
      },
    },

    nodeContainer: {
      padding: "10px 2.5rem",
      textAlign: "center",
      position: "relative",
      fontSize: "1rem",
      // "&:not(:last-child)::after": {
      //   content: '""',
      //   right: 0,
      //   bottom: 0,
      //   borderRight: "1px solid rgba(255, 255, 255, 0.4)",
      //   position: "absolute",
      //   height: "85px",
      // },
      [theme.breakpoints.down("xs")]: {
        marginTop: "1.5rem",
        width: "50%",
        padding: "10px 2rem",
        textAlign: "left",
        "&::before": {
          content: '""',
          left: "0.3rem",
          bottom: 0,
          height: "66px",
          borderRight: "1px solid #315CD5",
          position: "absolute",
        },
        "&:not(:last-child)::after": {
          content: "none",
        },
      },
    },
    nodeLabel: {
      fontSize: "3rem",
      fontFamily: "'Gilroy-Bold', sans-serif",
      fontWeight: 800,
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
    },
    divider: {
      width: "1px",
      height: "100px",
      background: "rgba(255, 255, 255, 0.4)",
    },
  };
};

function CountMatters({ classes, pageProps }) {
  const isSmallDevice = useMediaQuery(useTheme().breakpoints.down("sm"));

  return (
    <Grid
      className={clsx(
        classes.root,
        pageProps.withBackground && !isSmallDevice ? classes.colored : ""
      )}
    >
      <Typography variant="h3" className={classes.heading}>
        {pageProps.heading}
      </Typography>
      <Typography
        variant="subtitle1"
        className={clsx(classes.subHeading, "customTitle")}
      >
        {pageProps.subHeading}
      </Typography>
      <div className={classes.container}>
        {pageProps.data.map((node, i) => {
          return (
            <Fragment key={i}>
              <div key={i} className={classes.nodeContainer}>
                <div className={classes.nodeLabel}>{node.label}</div>
                <div>{node.detail}</div>
              </div>
              {!(pageProps.data.length - 1 === i) && !isSmallDevice && (
                <Divider
                  orientation="vertical"
                  variant="fullWidth"
                  className={classes.divider}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </Grid>
  );
}

export default withStyles(styles)(CountMatters);
