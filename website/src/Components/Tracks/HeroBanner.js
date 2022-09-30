import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect } from "react";
import DotsImage from "../../assets/tracks/dots.svg";
import Background from "../../assets/tracks/heroBackground.png";
import PeopleImage from "../../assets/tracks/people.svg";
import BannerEmail from "./BannerEmail";

let styles = (theme) => {
  return {
    root: {
      overflow: "hidden",
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        marginTop: "5rem",
        height: "auto",
        backgroundImage: "none",
        marginBottom: "5.5rem",
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "0rem",
      },
      [theme.breakpoints.up("md")]: {},
      [theme.breakpoints.up("md")]: {
        position: "relative",
        justifyContent: "space-between",
        textAlign: "center",
        height: "30rem",
      },
    },
    bgImage: {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      height: "100%",
      width: "100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    leftSection: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "0px",
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "#18191F",
        position: "absolute",
        width: "50%",
        zIndex: "2",
        textTransform: "capitalize",
        textAlign: "left",
        padding: "3rem",
        height: "100%",
      },
    },
    heading: {
      fontSize: "3rem",
      textTransform: "capitalize",
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
        fontWeight: 800,
      },
    },
    subHeading: {
      marginTop: "1rem",
      fontSize: "3rem",
      color: "#315cd5",
      fontFamily: 'Gilroy-Bold',
      lineHeight: '3rem',
      [theme.breakpoints.down("sm")]: {
        marginTop: "1.4rem",
        marginBottom: "2.6rem",
        fontSize: "14px",
      },
    },
    buttonContainer: {
      marginTop: "2rem",
      position: "relative",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        marginTop: "4rem",
        display: "flex",
        flexWrap: "wrap",
      },
    }
  };
};

function Dots({ style }) {
  return (
    <div
      style={{
        // backgroundImage: `url(${DotsImage})`,
        position: "absolute",
        width: "68px",
        height: "68px",
        overflow: "hidden",
        ...style,
      }}
    >
      <img src={DotsImage} alt="dots" width="68px" height="68px" />
    </div>
  );
}

function HeroBanner({ classes, pageProps }) {

  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("sm"));
 

  const handleScroll = () => {
    var header = document.getElementById("stickyEmail");
    var container = document.getElementById("stickyContainer");
    var sticky = container.offsetTop + container.offsetHeight;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  } 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })


  return (
    <Grid className={classes.root}>
      {!isSmallScreen && <div className={classes.bgImage}></div>}
      <div className={clsx(classes.leftSection)} id="stickyContainer">
        {isSmallScreen && (
          <>
            <Dots style={{ right: "0px", width: "50px", top: "140px" }} />
            <Dots style={{ left: "0px", top: "470px" }} />
          </>
        )}

        <Typography variant="h3" className={classes.heading}>
          {pageProps.heading}
        </Typography>
        {!!pageProps.subHeading && <Typography paragraph className={classes.subHeading} dangerouslySetInnerHTML={{ __html: pageProps.subHeading }}>
        </Typography>}
        {isSmallScreen && (
          <img
            src={PeopleImage}
            alt="people banner"
            width="246px"
            height="104px"
            style={{ alignSelf: "center" }}
          />
        )}

        <div className={classes.buttonContainer}>
          <BannerEmail pageProps={pageProps} />
        </div>
      </div>
    </Grid>
  );
}

export default withStyles(styles)(HeroBanner);
