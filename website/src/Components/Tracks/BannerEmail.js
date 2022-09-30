import {
    Button, TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { useState } from 'react';
import ReactGa from 'react-ga';
import { useUser } from '../../context/UserProvider';
import axiosInstance from '../../utils/axiosInstance';

let userModel = {
    email: '',
}

let styles = (theme) => {
    return {
        formFields: {
            marginTop: "2px !important",
            background: "#FFFF",
            [theme.breakpoints.up("md")]: {
                marginRight: "0.5rem",
                width: "60%"
            },
            [theme.breakpoints.down("md")]: {
                marginBottom: "5px",
                width: "100%"
            },
            '& .MuiFormHelperText-root': {
                color: '#000',
                margin: '0 !important'
            },
            '& .MuiFilledInput-underline': {
                backgroundColor: 'white',
            },
            '& .MuiInputBase-input': {
                zIndex: 1,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '12.8px',
                lineHeight: '19px'
            },
            '& .MuiInputBase-root': {
                [theme.breakpoints.down("md")]: {
                    width: "100% !important",
                },
                height: '3rem',
            },
            '& .MuiSvgIcon-root': {
                width: '35px !important',
                height: '100% !important',
                fontSize: '1rem'
            },
            '& .MuiSelect-icon': {
                top: 0,
                zIndex: 1,
                color: '#A8A8A8'
            }
        },
        button: {
            textTransform: "uppercase",
            backgroundColor: '#E25252',
            width: "18rem",
            height: "3.1rem",
            fontWeight: "900",
            borderRadius: "4px",
            alignSelf: "center",
            fontSize: "16px",
            fontFamily: 'Gilroy-Bold',
            '&:hover': {
                background: '#D73C3C'
            },
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
        },
        stickyEmail: {
          [theme.breakpoints.up("md")]: {
                display: "flex",
                width: "100%"
          }
        }
    }
};

const BannerEmail = ({ classes, pageProps }) => {
    const { user, setUser } = useUser();
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
            pageProps.onAction(user.email);
        }
    }

    return <div className={classes.stickyEmail} id="stickyEmail">
        <TextField
            variant="outlined"
            value={user.email}
            className={classes.formFields}
            name="email"
            type="email"
            onChange={handleInputChange}
            label="Email Address"
            required
            error={errors.email.length > 0}
            helperText={errors.email}
        />
        <Button variant="contained" className={classes.button} onClick={handleSubmit}>
            {pageProps.actionText}
        </Button>
    </div>
};

export default withStyles(styles)(BannerEmail);
