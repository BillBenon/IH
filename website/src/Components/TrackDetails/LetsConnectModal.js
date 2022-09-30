import { Backdrop,  Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import LetsConnect from '../LetsConnect';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "35rem",
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
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
}
));


const LetsConnectModal = (props) => {
    const { open, handleClose } = props
    const classes = useStyles();
    return (
        <Modal
            className={classes.root}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            disableAutoFocus
        >
                <LetsConnect {...props}/>
        </Modal>
    )
}

export default LetsConnectModal;
