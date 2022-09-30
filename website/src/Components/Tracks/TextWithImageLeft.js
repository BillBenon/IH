import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

let styles = (theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "space-between",
      gap: "8rem",
      padding: "0 8rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0",
        textAlign: "center",
        "& .heroImage": {
          display: "none",
        },
      },
    },
    rightContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    heading: {
      fontSize: "2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
    },
    subHeading: {
      marginTop: "1rem",
      marginBottom: "3rem",
      fontSize: "1.5rem",
      color: "#767676",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1.5rem",
        marginTop: "0.5rem",
        fontSize: "18px",
      },
    },
    detail: {
      textAlign: "justify",
      fontSize: "1.1rem",
      color: "#18191F",
      marginTop: "2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.85rem",
      },
    },
  };
};

function TextWithImageLeft({ classes, pageProps }) {
  return (
    <Grid className={classes.root}>
      <img
        src={pageProps.imgSrc}
        alt="hero"
        loading="lazy"
        width="100%"
        height="100%"
        className="heroImage"
      />
      <div className={classes.rightContainer}>
        <Typography variant="h3" className={classes.heading}>
          {pageProps.heading}
        </Typography>
        <Typography paragraph variant="body2" className={classes.detail} dangerouslySetInnerHTML={{ __html: pageProps.subHeading }}>
        </Typography>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(TextWithImageLeft);
