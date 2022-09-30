import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Grid, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CalenderSvg from '../assets/thankyou/calender.svg';
import ClockSvg from '../assets/thankyou/clock.svg';
import axiosInstance from '../utils/axiosInstance';

const dates = [
    {
        label: 'Anyday of the week',
        value: 'Anyday'
    },
    {
        label: 'Weekdays',
        value: 'Weekdays'
    },
    {
        label: 'Weekends',
        value: 'Weekends'
    },
    {
        label: 'Choose Date',
        value: 'CustomDate',
        icon: `${CalenderSvg}`
    },
];

const times = [
    {
        label: 'Anytime of the day',
        value: 'Anytime'
    },
    {
        label: '9 AM - 12 PM',
        value: '9 AM - 12 PM'
    },
    {
        label: '12 PM - 6 PM',
        value: '12 PM - 6 PM'
    },
    {
        label: 'Choose Time',
        value: 'CustomTime',
        icon: `${ClockSvg}`
    },
];

const useStyles = makeStyles((theme) => (
    {
        root2: {
            width: '100%',
            '& .MuiTypography-root': {
                letterSpacing: '0.5px',
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'left',
                    '&.MuiTypography-h3': {
                        fontSize: '2.5rem'
                    }
                }
            },
            '& .cross .MuiButtonBase-root': {
                color: '#E25252',
                minWidth: '0',
            },
        },
        subtitle: {
            position: 'relative',
            marginTop: '1.5rem',
            '&::after': {
                content: '"*Optional"',
                position: 'absolute',
                color: '#A8A8A8',
                fontSize: '0.625rem',
                bottom: '0.625rem'
            }
        },
        subtitleModal: {
            position: 'relative',
            marginTop: '1.5rem',
            '&::after': {
                content: '',
                position: 'absolute',
                color: '#A8A8A8',
                fontSize: '0.625rem',
                bottom: '0.625rem'
            }
        },
        form: {
            '& .formContainer.MuiGrid-root.MuiGrid-container': {
                paddingTop: '1.5rem',
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    margin: '0',
                    marginBottom: '35px',
                    '& .MuiGrid-root.MuiGrid-item': {
                        margin: '0 !important',
                        marginBottom: '16px !important',
                        padding: '0'
                    }
                }
            },
            '& .MuiFormControl-root': {
                margin: '0 !important',
                width: '100%'
            },
            '& .MuiInputBase-root': {
                background: 'white',
                borderRadius: '4px 0 0 4px',
                height: '3rem',
                overflow: 'hidden'
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                '&:hover': {
                    border: 'none'
                }
            },
            '& .MuiSvgIcon-root': {
                top: 'auto',
                width: '30px !important',
                height: '30px !important'
            },
            '& .MuiSelect-root': {
                backgroundColor: 'white'
            },

            '& input': {
                fontSize: '0.75rem',
                paddingLeft: '14px'
            },
            '& .cross': {
                background: 'white',
                display: 'flex',
                borderRadius: '0 4px 4px 0'
            }
        },
        logo: {
            marginRight: '0.625rem'
        },
        datePicker: {
            display: 'flex',
            '& .MuiButton-root:hover': {
                backgroundColor: 'inherit'
            },
            '& .MuiIconButton-root:hover': {
                backgroundColor: 'inherit'
            },
            '& .MuiSvgIcon-root': {
                width: '20px !important',
                height: '20px !important'
            },
            '& .MuiButtonBase-root': {
                padding: '0',
                paddingRight: '0.625rem',
            },
            '& .MuiInput-underline::before': {
                content: 'none'
            },
            '& .MuiInput-underline::after': {
                content: 'none'
            },
        },
        timePicker: {
            display: 'flex',
            '& .MuiButton-root:hover': {
                backgroundColor: 'inherit'
            },
            '& .MuiIconButton-root:hover': {
                backgroundColor: 'inherit'
            },
            '& .MuiSvgIcon-root': {
                width: '20px !important',
                height: '20px !important'
            },
            '& .MuiFormControl-root:first-child': {
                marginRight: '1rem !important'
            }
        },
        btn: {
            borderRadius: '4px',
            boxShadow: 'none',
            height: '48px',
            width: '100%',
            fontWeight: '600',
            fontSize: '1.125rem',
            letterSpacing: '1px',
        },
        submitBtn: {
            backgroundColor: '#E25252',
            '&:hover': {
                background: '#D73C3C'
            },
            '&:active': {
                background: '#D33030',
                boxShadow: 'none'
            }
        },
        successBtn: {
            backgroundColor: '#04B700',
            cursor: 'auto',
            '&:hover': {
                backgroundColor: '#04B700'
            },
            '&:active': {
                backgroundColor: '#04B700',
                boxShadow: 'none'
            }
        },
        inputClass: {
            border: "1px solid #d9dbe4"
        }
    }
));
export default function ThankyouForm({ email, resetEmail, heading, isModal, onSubmit }) {

    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState('Anyday');
    const [selectedTime, setSelectedTime] = useState('Anytime');
    const [datePicker, setDatePicker] = useState({
        showDatePicker: false,
        chosenDate: new Date()
    });
    const [timePicker, setTimePicker] = useState({
        showTimePicker: false,
        chosenTime: new Date()
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

    // open date and time picker when clicked from dropdown
    useEffect(() => {
        if (datePicker.showDatePicker) {
            const el = document.getElementById('date-picker');
            el.click();
        }
    }, [datePicker.showDatePicker]);

    useEffect(() => {
        if (timePicker.showTimePicker) {
            const el = document.getElementById('time-picker');
            el.click();
        }
    }, [timePicker.showTimePicker]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = preparePayload();
        axiosInstance.post("users", payload).then(response => {
            setError(false);
            if (onSubmit) {
                onSubmit();
                return;
            }
            setSuccess(true);
        }).catch(error => {
            setError(true);
        });
    }

    const preparePayload = () => {
        const appointmentPayload = {
            email: email,
            custom_fields: {
                freeConsultationDate: selectedDate,
                freeConsultationTime: selectedTime,
            }
        };

        if (selectedDate === "CustomDate") {
            appointmentPayload.custom_fields.freeConsultationDate = datePicker.chosenDate.toDateString()
        }

        if (selectedTime === "CustomTime") {
            appointmentPayload.custom_fields.freeConsultationTime = `${timePicker.chosenTime.toTimeString()}`
        } else {
            appointmentPayload.custom_fields.freeConsultationTime += ` ${/\((.*)\)/.exec(new Date().toString())[1]}`
        }

        return appointmentPayload;
    }

    const closeDateTimePicker = (type) => {
        if (type === "date") {
            setDatePicker({
                showDatePicker: false,
                chosenDate: new Date()
            });
            setSelectedDate('Anyday');
        }

        if (type === "time") {
            setTimePicker({
                showTimePicker: false,
                chosenTime: new Date()
            });
            setSelectedTime('Anytime');
        }
    }

    const handleInputChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;

        if (name === "date") {
            if (value === "CustomDate") {
                setDatePicker({
                    ...datePicker,
                    showDatePicker: true
                });
            }
            setSelectedDate(value);
        }

        if (name === "time") {
            if (value === "CustomTime") {
                setTimePicker({
                    ...timePicker,
                    showTimePicker: true,
                });
            }
            setSelectedTime(value);
        }
    }

    const handleDateChange = (date) => {
        setDatePicker({
            ...datePicker,
            chosenDate: date
        });
    }

    const handleTimeChange = (time) => {
        setTimePicker({
            ...timePicker,
            chosenTime: time
        });
    }

    const getMenuItem = (option) => {
        return (
            <MenuItem key={option.value} value={option.value}>
                <Box display="flex" alignItems="center">
                    {option.icon && <img className={classes.logo} src={option.icon} alt={option.value}></img>}
                    <Typography variant="caption">{option.label}</Typography>
                </Box>
            </MenuItem>
        )
    }

    const goBackHome = () => {
        resetEmail();
        history.push('/');
    }

    return (
        <div className={classes.root2}>
            <Typography variant={isModal ? "h5" : "h3"}>
                {heading || 'Thank you for signing up to our free consultation'}
            </Typography>
            <Typography variant="subtitle1" className={!isModal ? classes.subtitle : classes.subtitleModal}>
                {'One Last thing, Let us know a convinient time to contact you.'}
            </Typography>
            <div>
                <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} className="formContainer">
                        <Grid item sm={6} xs={12}>
                            {!datePicker.showDatePicker &&
                                <TextField
                                    variant="outlined"
                                    select
                                    value={selectedDate}
                                    onChange={handleInputChange}
                                    fullWidth
                                    className={clsx(classes.formFields, {
                                        [classes.inputClass]: isModal,
                                    })}
                                    name="date"
                                >
                                    {dates.map((option) => (
                                        getMenuItem(option)
                                    ))}
                                </TextField>}
                            {datePicker.showDatePicker &&
                                <div className={classes.datePicker}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            disableToolbar
                                            disablePast={true}
                                            minDate={new Date()}
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker"
                                            value={datePicker.chosenDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <div className="cross">
                                        <Button onClick={() => closeDateTimePicker('date')}>
                                            <ClearRoundedIcon />
                                        </Button>
                                    </div>
                                </div>
                            }
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            {!timePicker.showTimePicker &&
                                <TextField
                                    variant="outlined"
                                    select
                                    value={selectedTime}
                                    onChange={handleInputChange}
                                    fullWidth
                                    className={clsx(classes.formFields, {
                                        [classes.inputClass]: isModal,
                                    })}
                                    name="time"
                                >
                                    {times.map((option) => (
                                        getMenuItem(option)
                                    ))}
                                </TextField>}
                            {timePicker.showTimePicker &&
                                <div className={classes.datePicker}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <TimePicker
                                            minutesStep="5"
                                            margin="normal"
                                            id="time-picker"
                                            value={timePicker.chosenTime}
                                            onChange={handleTimeChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <div className="cross">
                                        <Button onClick={() => closeDateTimePicker('time')}>
                                            <ClearRoundedIcon />
                                        </Button>
                                    </div>
                                </div>
                            }
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            {!success && <Button
                                type="submit"
                                component="button"
                                variant="contained"
                                className={clsx(classes.btn, classes.submitBtn)}
                                disableRipple
                            >
                                {'Submit'}
                            </Button>}
                            {success && <Button
                                type="button"
                                component="button"
                                variant="contained"
                                className={clsx(classes.btn, classes.successBtn)}
                                disableRipple
                            >
                                {'Submitted'}
                            </Button>}
                        </Grid>
                        {success && <Grid item sm={3} xs={12}>
                            <Button type="button"
                                variant="contained"
                                color="primary"
                                className={classes.btn}
                                disableRipple
                                onClick={goBackHome}>
                                {'Go home'}
                            </Button>
                        </Grid>}
                    </Grid>
                </form>
                {error && <Typography variant="subtitle2">{'Something went wrong, please try again.'}</Typography>}
            </div>
        </div>
    )
}