import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import LetsConnectModal from "../Components/TrackDetails/LetsConnectModal";
import Companies from "../Components/Tracks/Companies";
import CountMatters from "../Components/Tracks/CountMatters";
import HappyCustomers from "../Components/Tracks/HappyCustomers";
import HeroBanner from "../Components/Tracks/HeroBanner";
import HowThisWorks from "../Components/Tracks/HowThisWorks";
import Newsletters from "../Components/Tracks/Newsletters";
import Plans from "../Components/Tracks/Plans";
import TextWithImageLeft from "../Components/Tracks/TextWithImageLeft";
import { post } from '../utils/axiosInstance';
import { planTypes } from "../utils/Constants";
import { removeTrackSpaces } from '../utils/helper';

const images = {
  heroImage: require("../assets/tracks/hero.png"),
  Airbnb: require("../assets/tracks/airbnb.svg"),
  Amazon: require("../assets/tracks/amazon.svg"),
  Apple: require("../assets/tracks/apple.svg"),
  Facebook: require("../assets/tracks/facebook.svg"),
  Microsoft: require("../assets/tracks/microsoft.svg"),
  Uber: require("../assets/tracks/uber.svg"),
  Google: require("../assets/tracks/google.svg"),
  Netflix: require("../assets/tracks/netflix.svg"),
};
let styles = (theme) => {
  return {
    root: {
      marginTop: "6rem",
      background: "linear-gradient(101.37deg, #FCFDFF -9.56%, #F5F5FF 105.03%)",
      [theme.breakpoints.down("sm")]: {
        height: "auto",
        padding: "40px 16px",
        "& .MuiGrid-root.MuiGrid-item": {
          margin: "0 0 16px 0 !important",
          padding: "0",
        },
        "& .MuiContainer-root": {
          padding: "0",
        },
        "& .MuiGrid-spacing-xs-6": {
          width: "auto",
          margin: "0",
        },
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "7rem",
      padding: "0px",
      [theme.breakpoints.down("sm")]: {
        gap: "5.5rem",
      },
    },
  };
};

const pageObj = {
  companies: {
    heading: "1,500+",
    fontFamily: "'Gilroy-Bold', sans-serif",
    subHeading: "Companies in our professional network",
    data: [
      images.Airbnb,
      images.Amazon,
      images.Uber,
      images.Microsoft,
      images.Apple,
      images.Google,
      images.Facebook,
      images.Netflix,
    ],
  }
};

function TracksUpdated({ classes, ...props }) {
  const { trackname } = useParams();
  const { search } = useLocation();
  const [trackdetail, settrackdetail] = useState();
  const [open, setOpen] = useState(false);
  const [message] = useState(null);
  const [pageobj, setPageobj] = useState();
  const [modalProperties] = useState({
    heading: '',
    btnText: '',
  });

  const closeNextConnectModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTrackDetail(trackname);
  }, [trackname])

  const setTrackDetail = async (trackname) => {
    if (trackname) {
      var updatedTrackName = removeTrackSpaces(trackname);
      window.history.replaceState({}, document.title, updatedTrackName);
      var result = await post('getTrackDetails', { title: updatedTrackName });
      const details = result && result.data && result.data.output;
      details && settrackdetail(details);
      pageObj.trackHeader = setTrackHeader(details);
      pageObj.countMatters = setCountMatters(details);
      pageObj.howThisWorks = setHowThisWorks(details);
      pageObj.plans = setPlans(details);
      pageObj.happyCustomers = setSuccessStories(details);
      pageObj.textWithImageLeft = setTextWithLeftImage(details);
      setPageobj(pageObj);
    }
  }

  const setTrackHeader = (detail) => {
    return {
      heading: detail?.trackPitch?.title,
      subHeading: detail?.trackPitch.description,
      actionText: "Take me to the program",
      onAction: (email) => enrollFreePlan(email, detail)
    };
  }

  const setCountMatters = (details) => {
    return {
      heading: "Some Count That Matters",
      subHeading: "Our achievement in the journey depicted in numbers",
      data: details.statistics?.map(s => { return { label: s.number, detail: s.title } }),
      withBackground: true,
    };
  }

  const setHowThisWorks = (details) => {
    return {
      heading: "Our Tried and Tested Process",
      subHeading: `How This Works`,
      data: details?.ourProcess?.map((p, inx) => {
        return {
          circleText: inx + 1,
          stepName: p.stepTitle,
          stepDetail: p.stepDescription,
        }
      })
    };
  }

  const setPlans = (details) => {
    return {
      heading: "Pick your Program and get started",
      subHeading: "Learn about benefits",
      data: details?.productInfo?.map(info => {
        return {
          heading: info.displayName,
          listItems: info.displayDescription,
          ...getPlanBtnProps(info, details),
          price: info.price,
        };
      })
    };
  }

  const getPlanBtnProps = (planInfo, details) => {
    let btnText;
    let onClickCTA;
    if (planInfo.subProductType === planTypes.TRACKPLANSUBSCRIPTION) {
      btnText = 'Buy Now';
      onClickCTA = () => {
        window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${details.trackId}&lpproductid=${planInfo.productId}&lpflowtype=buy`
      };
    }
    else if (planInfo.subProductType === planTypes.TRACKPLANCONTRACT) {
      btnText = "Let's Connect";
      onClickCTA = () => setOpen(true);
    }
    else if (planInfo.subProductType === planTypes.TRACKPLANEVALUATION) {
      btnText = 'Buy Now';
      onClickCTA = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${details.trackId}&lpproductid=${planInfo.productId}&lpflowtype=evalbuy`;
    } else if (planInfo.subProductType === planTypes.TRACKPLANPLACEMENT) {
      btnText = 'Enroll Now';
      let placementPartner = "";
      if (details.placementPartner) {
        placementPartner = `&company=${details.placementPartner.name}`;
      }
      onClickCTA = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${details.trackId}&lpproductid=${planInfo.productId}&lpflowtype=placement${placementPartner}`;
    } else if (planInfo.subProductType === planTypes.TRACKPLANFREE) {
      btnText = 'Enroll Now';
      onClickCTA = () => enrollFreePlan(undefined, details);
    }
    return { btnText, onClickCTA };
  }

  const enrollFreePlan = (email, details) => {
    const t = details && details.productInfo && !!details.productInfo.length && details.productInfo.find(t => t.subProductType === planTypes.TRACKPLANFREE);
    let redirecturl;
    if (t) {
      redirecturl = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${details.trackId}&lpproductid=${t.productId}&lpflowtype=enroll`
      if (email) {
        redirecturl = redirecturl + `&lpemail=${email}`
      }
      window.location.href = redirecturl;
    } else {
      alert("No free plan available for this track!")
    }
  }

  const setSuccessStories = (details) => {
    return {
      heading: "Our Clients Make us Blush",
      subHeading:
        "Read all these inspiring stories from people who got their dream job!",
      data: details.successStories?.map(ss => {
        return {
          videoUrl: ss.videoURL,
          imgUrl: ss.companyLogo || images.Apple,
          name: ss.name,
          bio: ss.profile,
          review: ss.description
        }
      })
    };
  }

  const setTextWithLeftImage = (details) => {
    return {
      imgSrc: images.heroImage,
      heading: details?.landingPageInfo?.heading,
      subHeading: details?.landingPageInfo?.subHeading,
      detail: details?.landingPageInfo?.description,
    }
  }

  return (
    <Grid className={classes.root}>
      {pageobj && <>
        <Container className={classes.container}>
          <HeroBanner pageProps={pageobj.trackHeader} />
          <TextWithImageLeft pageProps={pageobj.textWithImageLeft} />
          <CountMatters pageProps={pageobj.countMatters} />
          <HowThisWorks pageProps={pageobj.howThisWorks} />
          <Plans pageProps={pageobj.plans} />
          <HappyCustomers pageProps={pageobj.happyCustomers} />
          <Companies pageProps={pageobj.companies} />
          <Newsletters />
        </Container></>
      }
      {trackdetail && <LetsConnectModal
        {...modalProperties}
        defaultComment={`I am interested in ${trackdetail.title} unlimited plan.`}
        open={open}
        handleClose={closeNextConnectModal}
        message={message}
        enrollFreePlan={enrollFreePlan}
        customMsg={{
          thankyouMsg: "Thank you for showing your interest in unlimited plan",
          freePlanMsg: "We are happy to let you know that we have a FREE plan also. Until we customize option for you why don't you try FREE options",
          headerMsg: "Please provide us following information so that we can get back to you with customized options"
        }}
      />}

    </Grid>
  );
}

export default withStyles(styles)(TracksUpdated);
