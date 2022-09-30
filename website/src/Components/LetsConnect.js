import { Box, Button, Fade, Grid, MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ReactGa from 'react-ga';
import { useUser } from '../context/UserProvider';
import axiosInstance from '../utils/axiosInstance';
import { countries } from '../utils/Constants';
import ThankyouForm from './ThankyouForm';

let userModel = {
    name: '',
    email: '',
    phoneCountry: 'UnitedStates',
    phoneNumber: '',
    comments: '',
}

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        width: "35rem",
        border: props => props.border || 0,
        display: "flex",
        alignItems: "center",
        margin: props => props.margin || "0 auto",
        '& .MuiGrid-item': {
            marginBottom: '0.375rem !important',
            marginLeft: '0 !important'
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            zIndex: '5',
            margin: '0 20px',
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
    formFields: {
        width: '100%',
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
    textAreaField: {
        width: '100%',
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
            height: "auto !important",
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
    information: {
        boxShadow: "none",
        padding: "10px",
        width: '100%',
    },
    modalHeading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "#545454",
        padding: "25px 0px 0px",
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
        textTransform: "uppercase",
        '&:hover': {
            background: '#D73C3C'
        },
        '&:active': {
            background: '#D33030',
            boxShadow: 'none'
        }
    },
    okBtn: {
        backgroundColor: '#04B700 !important',
        cursor: 'auto',
        '&:hover': {
            backgroundColor: '#04B700'
        },
        '&:active': {
            backgroundColor: '#04B700',
            boxShadow: 'none'
        }
    },
    btn: {
        backgroundColor: '#aaa',
        borderRadius: '4px',
        boxShadow: 'none',
        height: '48px',
        width: '100px',
        fontWeight: '600',
        fontSize: '1.125rem',
        letterSpacing: '1px',
        margin: "10px",
    }
}
));

const LetsConnect = ({ defaultComment, enrollFreePlan, customMsg, open, handleClose, styleProps, className }) => {
    const classes = useStyles(styleProps || {});
    const { user, setUser } = useUser();
    const focusNameElement = useRef(null);
    const [errors, setErrors] = useState(userModel);
    const [message, setMessage] = useState(null);
    const [showThankYou, setshowThankYou] = useState(false);
    const [freePlanContent, setFreePlanContent] = useState(false);

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
        errorForm.email = (user.email || "").length > 0 ? /\S+@\S+\.\S+/.test(user.email) ?
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
        if (nameParts.length > 1) payload.last_name = nameParts[1];
        const phone = getFormattedPhoneNumber();
        if (phone !== '') payload.phone = phone;
        payload.comments = user.comments;
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
                action: 'User clicked on connect with us for unlimited plan'
            });
            const payload = preparePayload();
            axiosInstance.post("users", payload).then(response => {
                setshowThankYou(true);
            }).catch(error => {
                setStatusMessage('Something went wrong, Please try again.')
            });
        }
    }

    const getMenuItem = (option) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                <Box display="flex" alignItems="center" id="countryDropdown">
                    <img className={classes.logo} src={option.icon} alt={option.value} width="30%"></img>
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

    useEffect(() => () => setErrors({ email: '', phoneNumber: '', name: '' }), [])

    const renderFreeplanContent = () => {
        return (
            <Box p={3}>
                <Paper className={classes.information}>
                    <Typography className={classes.modalHeading} variant="subtitle2" color="subheading">{customMsg.freePlanMsg}</Typography>
                </Paper>
                <Paper className={classes.information}>
                    <Typography className={classes.modalHeading} variant="h3" color="subheading">{"Do you want to continue with free plan?"}</Typography>
                </Paper>
                <Box display="flex" align-alignItems="center" justifyContent="center" p={2}>
                    {handleClose && (<Button
                        type="button"
                        component="button"
                        variant="contained"
                        className={classes.btn}
                        disableRipple
                        onClick={handleClose}
                    >
                        {'Cancel'}
                    </Button>)}
                    <Button
                        type="button"
                        component="button"
                        variant="contained"
                        className={clsx(classes.btn, classes.okBtn)}
                        disableRipple
                        onClick={enrollFreePlan}
                    >
                        {'Ok'}
                    </Button>
                </Box>
            </Box >
        )
    }

    const handleThankyousubmit = () => {
        setshowThankYou(false);
        setFreePlanContent(true);
    }

    return (

        <Fade className={className} in={open ? open : true}>
            <Paper className={classes.root}>
                {!showThankYou && !freePlanContent &&
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container className={classes.form}>
                            <Paper className={classes.information}>
                                <Typography className={classes.modalHeading} variant="subtitle2" color="subheading">{customMsg.headerMsg}</Typography>
                            </Paper>
                            <Grid className='name' item xs={12} ref={focusNameElement}>
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    value={user.name}
                                    name="name"
                                    onChange={handleInputChange}
                                    label="Name"
                                    required
                                    className={classes.formFields}
                                    error={errors.name.length > 0}
                                    helperText={errors.name}
                                    onClick={focusElement}
                                />
                            </Grid>
                            <Grid className='email' item xs={12}>
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
                            </Grid>
                            <Grid className='phoneNum' item xs={12} >
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
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
                                    <Grid item xs={9}>
                                        <TextField
                                            variant="outlined"
                                            value={user.phoneNumber}
                                            className={classes.formFields}
                                            name="phoneNumber"
                                            onChange={handleInputChange}
                                            label="Phone"
                                            required
                                            error={errors.phoneNumber.length > 0}
                                            helperText={errors.phoneNumber}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className='comments' item xs={12}>
                                <Grid container justify="space-between" className={classes.contentBox}>
                                    <TextField
                                        variant="outlined"
                                        value={user.comments}
                                        defaultValue={defaultComment}
                                        className={classes.textAreaField}
                                        name="comments"
                                        onChange={handleInputChange}
                                        label="Your Comments"
                                        multiline={true}
                                        rows={4}
                                        helperText={errors.comment}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className='btnConWidUs' item xs={12}>
                                <Button
                                    type="submit"
                                    component="button"
                                    variant="contained"
                                    classes={{ root: classes.submitBtn }}
                                    disableRipple
                                >
                                    {'Connect with us'}
                                </Button>
                                {message && <Typography variant="subtitle2" color="secondary">
                                    {message}
                                </Typography>}
                            </Grid>
                        </Grid>
                    </form>}
                {!freePlanContent && showThankYou &&
                    <Box p={3}>
                        <ThankyouForm email={user.email} heading={customMsg.thankyouMsg} isModal={true} onSubmit={handleThankyousubmit} />
                    </Box>
                }
                {!showThankYou && freePlanContent &&
                    renderFreeplanContent()
                }
            </Paper>

        </Fade>
    )
}

export default LetsConnect;
