import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    lineHeight: "150%",
    height: "50px",
    fontWeight: "bold",
    fontSize: "19px",
    color: "#37281F",
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      fontWeight: "600",
      fontSize: "16.3767px",
      lineHeight: "150%",
      textAlign: "center",
      color: "#37281F"
    },
  },
  expertName: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  removeCustomMargin: {
    [theme.breakpoints.down("sm")]: {
      "&.MuiGrid-root.MuiGrid-item": {
        margin: "0 !important",
      },
    },
  },
  userIcon: {
    width: "45px !important",
    marginLeft: "10px",
    marginRight: "10px",
  },
  workIcon: {
    width: "30px !important",
    marginLeft: "17.5px",
    marginRight: "17.5px",
  },
  expertWork: {
    fontWeight: "bold",
    fontSize: "16px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "right",
    },
  },
  price: {
    fontSize: "17px",
    fontWeight: "bold",
  },
  row: { display: "flex", alignItems: "center" },
  end: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  productCardContent: {
    overflow: "hidden",
    padding: "0",
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    maxHeight: "400px",
  },
  expertProfileDesc: {
    overflow: "hidden",
    height: "160px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      height: "auto",
    },
  },
  expertProfileSection: {
    height: "175px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
      textAlign: "center",
    },
  },
  expertInfoTitle: {
    textDecoration: "underline",
  },
  expertTagVal: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#9b9595",
    paddingLeft: "12px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
    },
  },
  mobileDesign: {
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
      justifyContent: "start",
    },
  },
}));

const ExpertCardContent = ({ item, onExpertClick, onBuyNowClick }) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        gutterBottom
        variant="h5"
        component="h2"
        className={classes.heading}
      >
        {item.trackName}
      </Typography>
      <Divider />

      <CardContent>
        <Grid container direction="column">
          <Grid item lg={12}>
            <Grid
              container
              spacing={3}
              className={classes.expertProfileSection}
            >
              <Grid item lg={3} className={classes.removeCustomMargin}>
                <PersonIcon className={classes.userIcon} />
              </Grid>

              <Grid item lg={9} className={classes.removeCustomMargin}>
                <Grid container direction="column">
                  <Grid item lg={12}>
                    <Typography
                      gutterBottom
                      variant={"h5"}
                      onClick={() => onExpertClick(item)}
                      className={classes.expertName}
                    >
                      {item.expertInfo.name}
                    </Typography>
                  </Grid>

                  {item?.tags.map((tag) => (
                    <Grid
                      item
                      lg={12}
                      key={`tag-${tag.key}`}
                      className={classes.removeCustomMargin}
                    >
                      <Grid
                        container
                        direction="row"
                        className={classes.mobileDesign}
                      >
                        <Grid item lg={4} className={classes.removeCustomMargin}>
                          <Typography
                            gutterBottom
                            variant={"h5"}
                            className={classes.expertWork}
                          >
                            {tag.key}:
                          </Typography>
                        </Grid>

                        <Grid item lg={8} className={classes.removeCustomMargin}>
                          <Typography
                            gutterBottom
                            variant={"h5"}
                            className={classes.expertTagVal}
                          >
                            {tag.value.join(", ")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="row" className={classes.expertProfileDesc}>
          <Grid item lg={12} className={classes.expertInfoTitle}>
            <Typography
              gutterBottom
              variant={"h5"}
              className={classes.expertWork}
            >
              About Expert
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              paragraph
              dangerouslySetInnerHTML={{ __html: item.expertInfo.profile }}
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
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom={true}
            className={classes.price}
          >
            {`$${(item.price / 100).toString()}/Hr/Session`}
          </Typography>
        </Grid>
        <Grid item>
          <CardActions>
            <Button
              component="button"
              variant="contained"
              disableRipple
              onClick={() => onBuyNowClick(item)}
              className={"successBtn"}
            >
              Buy Now & Schedule
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpertCardContent;
