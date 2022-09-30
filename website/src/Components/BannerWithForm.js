import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import bannerImage from "../assets/Banner/bannerBackground.svg";
import { Box, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import UserFormForConsultation from "./UserFormForConsultation";

const bannerTextData = {
  title: "Personalized Professional Mentoring for FAANG aspirants",
  topicsCovered: [
    "Leet Code Prep",
    "Mock Interviews",
    "Behavioral Coaching",
    "System Design Prep",
  ],
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "64px",
    boxSizing: "border-box",
    "& .MuiTypography-root": {
      letterSpacing: "1px",
    },
  },
  banner: {
    background: `url(${bannerImage}) no-repeat center`,
    backgroundSize: "cover",
    height: "716px",
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
    '& .responsiveItemLeft': {
      [theme.breakpoints.down('sm')]: {
        margin: '0 !important',
        width: '100%',
        textAlign: 'left !important',
        '& #primaryBox': {
          padding: '86px 16px 20px',
          alignItems: 'flex-start'
        },
        '& .MuiGrid-root.MuiGrid-item': {
          marginLeft: '0 !important',
          marginBottom: '16px !important'
        }
      }
    },
    '& .responsiveItemRight': {
      [theme.breakpoints.down('sm')]: {
        margin: '0 !important',
      }
    }
  },

  // left banner
  bannerLeft: {
    color: "#fff",
    height: "100%",
    background: theme.palette.primary.main,
    opacity: "0.85",
    padding: "0 5rem",
  },
  bannerText: {
    color: "inherit",
    fontSize: "2rem",
    lineHeight: "120%",
  },
  bannerCaptionGrid: {
    marginTop: "24px",
  },
  bannerCaptionGridItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "13px",
  },
  bannerTextCaption: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: "27px",
    [theme.breakpoints.down('sm')]: {
      fontWeight: 600,
      fontSize: "1",
      lineHeight: "21px",
    }
  },
  checkIcon: {
    height: "20px !important",
    width: "20px !important",
    marginRight: "16px",
    color: "#E25252",
  },

  // right banner
  bannerRight: {
    height: "100%",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      padding: '40px 16px'
    }
  },
}));

export default function BannerWithForm({ focusForm, resetFocusForm, setEmail, calendlyPrefillData, setCalendlyPrefillData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.banner}>
        <Grid item xs={12} sm={6} className="responsiveItemLeft">
          <Box
            className={classes.bannerLeft}
            display="flex"
            alignItems="center"
            id="primaryBox"
          >
            <div>
              <Box>
                <Typography className={classes.bannerText}>
                  {bannerTextData.title}
                </Typography>
              </Box>
              <Grid container className={classes.bannerCaptionGrid}>
                {bannerTextData.topicsCovered.map((topic) => (
                  <Grid
                    item
                    key={topic}
                    xs={12}
                    sm={6}
                    className={classes.bannerCaptionGridItem}
                  >
                    <CheckCircleIcon
                      fontSize="small"
                      classes={{ root: classes.checkIcon }}
                    />
                    <Typography
                      variant="caption"
                      className={classes.bannerTextCaption}
                    >
                      {topic}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} className="responsiveItemRight">
          <Box
            className={classes.bannerRight}
            display="flex"
            alignItems="center"
          >
            <UserFormForConsultation focusName={focusForm} resetFocusName={resetFocusForm} setEmail={setEmail} calendlyPrefillData={calendlyPrefillData} setFormData={(e) => setCalendlyPrefillData(e)}/>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
