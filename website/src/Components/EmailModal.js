import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Typography, Button, Backdrop, Modal, Fade, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: '0 20px'
        }
    },
    textfield: {
        width: '100%',
        '& .MuiInputBase-root': {
            height: '3rem'
        },
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '2.75rem',
        width: '480px',
        borderRadius: '4px',
        textAlign: 'center',
        position: 'relative',
        '&:focus': {
            outline: 'none'
        }
    },
    button: {
        background: theme.palette.primary.main,
        borderRadius: '4px',
        color: '#fff',
        textTransform: 'none',
        marginTop: '1rem',
        '&:hover': {
            background: '#2144C7'
        },
        '&:active': {
            background: '#1939C0'
        }
    },
    crossIcon: {
        width: '1rem !important',
        height: '1rem !important',
        position: 'absolute',
        top: '21px',
        right: '21px',
        cursor: 'pointer'
    }
}));

export default function EmailModal({ open, handleClose, handleOK, heading, btnText, message }) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '' });

    const handleInputChange = (ev) => {
        const value = ev.target.value;
        setEmail(value);
    }

    const validateForm = () => {
        let errorForm = {};
        errorForm.email = email.length > 0 ? /\S+@\S+\.\S+/.test(email) ?
            "" : "Email is not valid" : "Email is required";

        setErrors({
            ...errorForm
        });

        return Object.values(errorForm).every(x => !x);
    }

    const handleSubmit = () => {
        if (validateForm()) {
            handleOK(email);
        }
    }

    const closeModal = () => {
        setEmail('');
        setErrors({ email: '' });
        handleClose();
    }

    return (
        <Modal
            className={classes.root}
            open={open}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            disableAutoFocus
        >
            <Fade in={open}>
                <div className={classes.modalContent}>
                    <div>
                        <ClearIcon
                            className={classes.crossIcon}
                            onClick={closeModal}
                        />
                    </div>
                    <Typography variant="h6" align="center">
                        {heading}
                    </Typography>
                    <TextField
                        autoComplete="off"
                        variant="outlined"
                        value={email}
                        name="email"
                        type="email"
                        className={classes.textfield}
                        onChange={handleInputChange}
                        placeholder="Email address*"
                        required
                        error={errors.email.length > 0}
                        helperText={errors.email}
                    />
                    <Button className={classes.button} type="button" onClick={handleSubmit}>
                        {btnText}
                    </Button>
                    {message && <Typography variant="subtitle2">
                        {message}
                    </Typography>}
                </div>
            </Fade>
        </Modal>
    )
}