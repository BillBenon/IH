import {
  Divider, Grid, Paper, Typography, useMediaQuery,
  useTheme
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import "./index.css";

const responsive = {
  0: { items: 1 },
  568: { items: 3 },
  900: { items: 3 },
  1024: { items: 3 },
};

let styles = (theme) => {
  return {
    root: {
      padding: "0 8rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0",
        textAlign: "center",
      },
    },
    paperRoot: {
      width: "350px",
      minHeight: "250px",
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      }
    },
    paperContainer: {
      height: "20rem",
      margin: "1rem",
      borderRadius: "10px",
      boxShadow:
        "0px 4px 4px rgb(51 51 51 / 4%), 0px 4px 16px rgb(51 51 51 / 8%)",
      [theme.breakpoints.down("md")]: {
        height: "22rem",
      }
    },
    heading: {
      fontSize: "2.5rem",
    },
    subHeading: {
      margin: "15px 0px",
      marginTop: "0px",
      fontSize: "1.5rem",
      color: "#767676",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1rem",
        fontSize: "18px",
      },
    },
    videoContainer: {
      height: "13rem",
      overflow: "auto",
      padding: "5px 10px"
    },
    paperWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "0.8rem",
    },
    bio: { color: "#969BAB", height: '2rem' }
  };
};

const TilesArray = ({ classes, pageProps }) => {
  return pageProps.data.map((item) => (
    <div className={classes.paperRoot}>
      <Paper elevation={4} className={classes.paperContainer}>
        <div className={classes.paperWrapper}>
          <div className={classes.videoContainer}>
            {!!item.videoUrl ? <iframe
              title="videoFrame"
              src={item.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                overflow: "hidden",
                height: "100%",
              }}
            ></iframe> :
              !!item.review &&
              <span dangerouslySetInnerHTML={{__html: item.review}}></span>
            }
          </div>
          <Divider variant="fullWidth" />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              textAlign: "start",
              padding: "0 1.5rem"
            }}
          >
            <div>
              <img src={item.imgUrl} alt="ima" width="70px" height="70px"></img>
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {item.name}
              </div>
              <div className={classes.bio} dangerouslySetInnerHTML={{ __html: item.bio }}></div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  ));
};

function HappyCustomers({ classes, pageProps }) {
  const isSmallScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  const tiles = useMemo(
    () => TilesArray({ classes, pageProps }),
    [classes, pageProps]
  );

  return (
    <Grid className={clsx(classes.root, "happy-customer")}>
      <Typography variant="h3" className={classes.heading}>
        {pageProps.heading}
      </Typography>
      <AliceCarousel
        mouseTracking
        autoPlay={isSmallScreen}
        items={tiles}
        disableButtonsControls={isSmallScreen}
        disableDotsControls={!isSmallScreen}
        responsive={responsive}
        autoWidth
      />
    </Grid>
  );
}

export default withStyles(styles)(HappyCustomers);
