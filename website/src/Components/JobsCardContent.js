import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  trackTitle: {
    fontWeight: "bold",
    fontSize: "16px"
  },
  end: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  trackContainer: {
    overflow: "hidden",
    height: "160px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      height: "auto",
    },
  },
  trackInfoTitle: {
    marginBottom:'10px'
  },
}));

const JobsCardContent = ({ item,  onApplyNowClick }) => {
  const classes = useStyles();
  return (
    <>
      
      <CardContent>
        <Grid container direction="row" className={classes.trackContainer}>
          <Grid item lg={12} className={classes.trackInfoTitle}>
            <Typography
              variant={"h5"}
              className={classes.trackTitle}
            >
              {item.title}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              paragraph
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </Grid>
        </Grid>
      </CardContent>

      <Grid
        container
        direction="row"
        className={classes.end}
        spacing={2}
        alignItems="center"
      >
        
        <Grid item>
          <CardActions>
            <Button
              component="button"
              variant="contained"
              disableRipple
              onClick={() => onApplyNowClick(item)}
              className={"successBtn"}
            >
              Details
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </>
  );
};

export default JobsCardContent;
