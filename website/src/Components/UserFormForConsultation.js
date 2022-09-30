import { Box, Button, Grid, makeStyles, MenuItem, Paper, Radio, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ReactGa from 'react-ga';
import { useLocation } from 'react-router-dom';
import SdeSvg from '../assets/Banner/SDE.svg';
import SdmSvg from '../assets/Banner/SDM.svg';
import TpmSvg from '../assets/Banner/TPM.svg';
import queryString from 'query-string'
import CalendlyModal from "./CalendlyModal"

import axiosInstance from '../utils/axiosInstance';
import { countries } from '../utils/Constants';

let userModel = {
    name: '',
    email: '',
    phoneCountry: 'UnitedStates',
    phoneNumber: '',
    category: 'SDE'
}

const categories = [
    {
        catName: 'SDE',
        icon: `${SdeSvg}`
    },
    {
        catName: 'SDM',
        icon: `${SdmSvg}`
    },
    {
        catName: 'TPM',
        icon: `${TpmSvg}`
    }
]

const useStyles = makeStyles((theme) => ({
    root: {
        border: props => props.border || 0,
        width: '50%',
        margin: props => props.margin || 0,
        backgroundColor: props => props.backgroundColor || theme.palette.primary.main,
        '& .MuiGrid-item': {
            marginBottom: '0.375rem !important',
            marginLeft: '0 !important'
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            zIndex: '5'
        }
    },
    heading: {
        margin: '2rem 0 1.375rem !important',
        fontWeight: 600,
        lineHeight: '37px'
    },
    form: {
        padding: '0 1.5rem 1.5rem'
    },
    fullWidth: {
        width: "100%",
    },
    formFields: {
        width: '100%',
        height: '3rem',
        '& .MuiFormHelperText-root': {
            color: '#fff',
            margin: '0 !important'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            backgroundColor: 'white',
            transition: 'none',
            borderStyle: 'none'
        },
        '& .MuiInputBase-input': {
            zIndex: 1,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '12.8px',
            lineHeight: '19px'
        },
        '& .MuiInputBase-root': {
            height: '3rem'
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
    logo: {
        paddingRight: '3px'
    },
    contentBox: {
        boxSizing: 'content-box',
        marginTop: '10px'
    },
    radioWrapper: {
        width: '30%',
        textAlign: 'center',
        background: 'white',
        borderRadius: '4px',
        '& .MuiTypography-root': {
            fontSize: '0.8rem'
        }
    },
    submitBtn: {
        backgroundColor: '#E25252',
        borderRadius: '4px',
        boxShadow: 'none',
        height: '48px',
        marginTop: '18px',
        width: '100%',
        fontWeight: '600',
        fontSize: '18px',
        letterSpacing: '1px',
        '&:hover': {
            background: '#D73C3C'
        },
        '&:active': {
            background: '#D33030',
            boxShadow: 'none'
        },
        [theme.breakpoints.down("sm")]: {
          height: "auto",
        }
    },
}
));

export default function UserFormForConsultation({ focusName, resetFocusName, setEmail, styleProps, fullWidth, calendlyPrefillData, setFormData }) {
    const focusNameElement = useRef(null);
    const classes = useStyles(styleProps || {});
    const [user, setUser] = useState(userModel);
    const [errors, setErrors] = useState(userModel);
    const [message, setMessage] = useState(null);
    const [isCalendlyModal, setIsCalendlyModal] = useState(false)
    const { search } = useLocation();

    useEffect(() => {
        if (focusName) {
            focusNameElement.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            let inputElement = focusNameElement.current.getElementsByTagName('input')[0];
            inputElement.classList.add("transition-with-shadow"); 
            setTimeout(() => {
                inputElement.click();
                inputElement.classList.remove("transition-with-shadow"); 
            }, 1000);
            resetFocusName();
        }
    }, [focusName]); // eslint-disable-line

    const focusElement = (ev) => {
        ev.target.focus();
    }

    const handleInputChange = ev => {
        const name = ev.target.name;
        const value = ev.target.value;
        if ((name === "name" && value && !(/^[a-zA-Z ]+$/.test(value)))
            || (name === "phoneNumber" && value && isNaN(value))) {
            return;
        }
        setUser({
            ...user,
            [name]: value
        });
    }

    const validateForm = () => {
        let errorForm = {};
        errorForm.name = user.name ? "" : "Name is required";
        errorForm.email = user.email.length > 0 ? /\S+@\S+\.\S+/.test(user.email) ?
            "" : "Email is not valid" : "Email is required";
        errorForm.phoneNumber = !user.phoneNumber ? "Phone Number is required" : user.phoneNumber.length > 9 ?
            "" : "Minimum 10 numbers required";

        setErrors({
            ...errorForm
        });

        return Object.values(errorForm).every(x => !x);
    }

    const preparePayload = () => {
        let payload = {};
        const nameParts = user.name.split(' ');
        payload.first_name = nameParts[0];
        payload.email = user.email;
        const extras = queryString.parse(search);
        payload = { ...payload, extras };
        if (nameParts.length > 1) payload.last_name = nameParts[1];
        const phone = getFormattedPhoneNumber();
        if (phone !== '') payload.phone = phone;
        payload.tags = ["ClickedFreeConsultation", user.category];
        return payload;
    }

    const getFormattedPhoneNumber = () => {
        if (user.phoneCountry !== '' && user.phoneNumber !== '') {
            return '+' + countries.find(x => x.value === user.phoneCountry).label + ' ' + user.phoneNumber;
        }
        return '';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            ReactGa.event({
                category: 'Button',
                action: 'User pressed register for a free session button on homepage'
            });
            const payload = preparePayload();

            axiosInstance.post("users", payload).then(response => {
                setFormData({name: user.name, email: user.email});
                setUser(userModel);
                setEmail(payload.email);
                if(!fullWidth){
                    setIsCalendlyModal(true)
                }
            }).catch(error => {
                setStatusMessage('Something went wrong, Please try again.')
            });
        }
    }

    const getMenuItem = (option) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                <Box display="flex" alignItems="center" id="countryDropdown">
                    <img className={classes.logo} src={option.icon} alt={option.value} width="32px"></img>
                    <Typography variant="caption" >{'+' + option.label}</Typography>
                </Box>
            </MenuItem>
        )
    }

    const setStatusMessage = (message) => {
        setMessage(message);
        const removeMessage = () => setMessage(null);
        setTimeout(removeMessage, 4000);
    }

    return (
        <Paper className={clsx(classes.root, fullWidth ? classes.fullWidth : "")}>
            <Typography variant="h5" align="center" color="secondary" className={classes.heading}>
                Let's Connect
            </Typography>
            <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} ref={focusNameElement}>
                        <TextField
                            autoFocus
                            variant="outlined"
                            value={user.name}
                            name="name"
                            onChange={handleInputChange}
                            placeholder="Name*"
                            className={classes.formFields}
                            error={errors.name.length > 0}
                            helperText={errors.name}
                            onClick={focusElement}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={user.email}
                            className={classes.formFields}
                            name="email"
                            type="email"
                            onChange={handleInputChange}
                            placeholder="Email address*"
                            required
                            error={errors.email.length > 0}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    select
                                    value={user.phoneCountry}
                                    onChange={handleInputChange}
                                    fullWidth
                                    className={classes.formFields}
                                    name="phoneCountry"
                                >
                                    {countries.map((option) => (
                                        getMenuItem(option)
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    value={user.phoneNumber}
                                    className={classes.formFields}
                                    name="phoneNumber"
                                    onChange={handleInputChange}
                                    placeholder="Phone*"
                                    error={errors.phoneNumber.length > 0}
                                    helperText={errors.phoneNumber}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="space-between" className={classes.contentBox}>
                            {
                                categories.map(category => (
                                    <Grid key={category.catName} item className={
                                        clsx(classes.radioWrapper,
                                            user.category === category.catName && 'shadow-red'
                                        )}>
                                        <Radio
                                            checked={user.category === category.catName}
                                            onChange={handleInputChange}
                                            value={category.catName}
                                            name="category"
                                            icon={<img alt='' src={category.icon} width="100%" height="60" />}
                                            checkedIcon={<img alt='' src={category.icon} width="100%" height="60" />}
                                        />
                                        <Typography variant="button" display="block">
                                            {category.catName}
                                        </Typography>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            component="button"
                            variant="contained"
                            classes={{ root: classes.submitBtn }}
                            disableRipple
                        >
                            {'Get free consultation'}
                        </Button>
                        {message && <Typography variant="subtitle2" color="secondary">
                            {message}
                        </Typography>}
                    </Grid>
                </Grid>
            </form>
            {isCalendlyModal &&
                <CalendlyModal
                    open={isCalendlyModal}
                    setIsIFrameOpen={() => setIsCalendlyModal(false)}
                    prefillData={calendlyPrefillData}
                />
            }
        </Paper>
    )
}