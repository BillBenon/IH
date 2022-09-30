import { Grid, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Background from "../../assets/tracks/news_back.svg";
import React, { useState } from "react";
import ReactGa from 'react-ga';
import { useUser } from '../../context/UserProvider';
import axiosInstance from '../../utils/axiosInstance';

let userModel = {
  email: '',
}

let styles = (theme) => {
  return {
    root: {
      margin: "1.5rem 0 8.5rem 0",
      padding: "2rem",
      display: "flex",
      color: "#FFFFFF",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      borderRadius: "16px",
      background: `url(${Background})`,
      backgroundRepeat: "no-repeat",
      maxWidth: 700,
      alignSelf: "center",
      [theme.breakpoints.down("md")]: {
        maxWidth: "none",
        alignSelf: "auto"
      }
    },
    topContainer: {
      fontSize: "40px",
      color: "#FFFFFF",
      fontWeight: 700,
      fontFamily: "'Gilroy-Medium', sans-serif",
      [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
      },
    },
    bottomContainer: {
      display: "flex",
      gap: "1rem",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        width: "100%",
      },
    },
    button: {
      width: "147px",
      height: "48px",
      background: "#E25252",
      borderRadius: "4px",
      fontSize: "18px",
      fontWeight: "600",
      marginTop: "10px",
      padding: "10px 35px",
      boxShadow: "none",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    email: {
      width: "450px",
      height: "3rem",
      "& .MuiFormHelperText-root": {
        color: "#fff",
        margin: "0 !important",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        backgroundColor: "white",
        transition: "none",
        borderStyle: "none",
      },
      "& .MuiInputBase-input": {
        zIndex: 1,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        color: "rgba(17, 17, 17, 0.48)",
      },
      "& .MuiInputBase-root": {
        height: "3rem",
      },
      "& .MuiSvgIcon-root": {
        width: "35px !important",
        height: "100% !important",
        fontSize: "1rem",
      },
      "& .MuiSelect-icon": {
        top: 0,
        zIndex: 1,
        color: "#A8A8A8",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
  };
};

function Newsletters({ classes }) {
  const { user, setUser } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errors, setErrors] = useState(userModel);

  const handleInputChange = ev => {
    setUser({
      ...user,
      email: ev.target.value
    });
  }


  const validateForm = () => {
    let errorForm = {};
    errorForm.email = (user.email || "").length > 0 ? /\S+@\S+\.\S+/.test(user.email) ?
      "" : "Email is not valid" : "Email is required";
    setErrors({
      ...errorForm
    });
    return Object.values(errorForm).every(x => !x);
  }

  const preparePayload = () => {
    let payload = {};
    payload.email = user.email;
    return payload;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      ReactGa.event({
        category: 'Button',
        action: 'User clicked on connect with us for unlimited plan'
      });
      const payload = preparePayload();
      axiosInstance.post("users", payload);
      setIsSubscribed(true);
    }
  }

  return (
    <Grid className={classes.root}>
      <div className={classes.topContainer}>Join our email newsletter !</div>

      <div className={classes.bottomContainer}>
        {!isSubscribed ? <>
          <TextField
            variant="outlined"
            name="email"
            placeholder="Your email"
            className={classes.email}
            value={user.email}
            type="email"
            error={errors.email.length > 0}
            onChange={handleInputChange}
          />
          <Button variant="contained" className={classes.button} onClick={handleSubmit}>
            Subscribe
          </Button>
        </> :
          <Typography variant="h3" >
            {"Thanks for subscribing"}
          </Typography>
        }
      </div>
    </Grid>
  );
}

export default withStyles(styles)(Newsletters);
