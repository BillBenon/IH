import { Badge, Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

const arrow = {
  content: '""',
  border: "1px dashed",
  position: "absolute",
  width: "230px",
  height: "100px",
  borderColor: "transparent transparent #707070 transparent",
};

let styles = (theme) => {
  return {
    root: {
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      marginTop: "1rem",
      [theme.breakpoints.down("sm")]: {
        padding: "0",
      }
    },
    mainTile: {
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        textAlign: "center",
      },
    },
    containerDiv: {
      background: "#315CD5",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      color: "white",
      position: "relative",

      [theme.breakpoints.down("sm")]: {
        margin: "auto",
        textAlign: "center",
      },
    },
    heading: {
      fontSize: "3rem",
      padding: "0",
      [theme.breakpoints.up("md")]: {
        marginBottom: "1.2rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
        textAlign: "center",
      },
    },

    subHeading: {
      fontSize: "1.5rem",
      color: "#767676",
      [theme.breakpoints.down("sm")]: {
        marginBottom: 0,
        fontSize: "18px",
      },
    },
    cardWrapper: {
      height: "15rem",
      width: "15rem",
      margin: "1rem",
      [theme.breakpoints.down("sm")]: {
        width: '100%',
        height: 'auto',
        margin: '1.1rem 0.5rem',
      },
    },
    card: {
      height: "15rem",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
        height: 'auto',
      },
    },
    cardAction: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    cardContent: {
      height: "100%",
      width: "100%"
    },
    stepName: {
      marginBottom: "0.35em",
      fontFamily: "Gilroy-Regular,ui-sans-serif",
      color: "#000",
      textAlign: "center",
      fontSize: "1.25rem",
      letterSpacing: ".01em",
      fontWeight: "700",
    },
    stepDetail: {
      fontFamily: '"Gilroy-Regular",sans-serif',
      fontWeight: '400',
      textAlign: 'center',
      wordSpacing: '2px',
      color: '#6f6f6f !important',
      fontSize: '1rem',
      lineHeight: '1.6',
    }
  };
};

function HowThisWorks({ classes, pageProps }) {
  return (
    <Grid container className={classes.root}>
      <Typography variant="h3" className={classes.heading}>
        {pageProps.heading}
      </Typography>
      <Grid
        container
        justify="center"
        className={classes.mainTile}
      >
        {pageProps.data.map((step, i) => (
          <div className={classes.cardWrapper}>
            <Badge badgeContent={step.circleText} color="primary" anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
              <Card className={ classes.card}>
                <CardActionArea className={classes.cardAction}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="div" className={classes.stepName}>
                      {step.stepName}
                    </Typography>
                    <Typography variant="body2" className={classes.stepDetail}>
                      {step.stepDetail}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Badge>
          </div>
        ))}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(HowThisWorks);
