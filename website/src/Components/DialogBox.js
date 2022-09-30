import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';

export default function DialogBox({ isOpen, title, message, footerText, handleClose }) {
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    component="button"
                    onClick={handleClose}
                    color="primary" autoFocus>
                    {footerText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}