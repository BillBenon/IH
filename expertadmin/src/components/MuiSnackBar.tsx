import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import crossIcon from "assets/logo/cross.svg";
import React from 'react';

type IProps = {
    open: boolean;
    onSnakBarClose: Function;
    message: string;
    severity: "success" | "error" | "info" | "warning";
}

const severityToColorMap = {
    success: "#2e7d32", "error": "#d32f2f", "info": "#0288d1", "warning": "#ed6c02"
}

const MuiSnackBar = (props: IProps) => {
    const { open, message, onSnakBarClose, severity } = props;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            close: {
                padding: theme.spacing(0.5),
                color: "red",
                fontSize: "18px"
            }, message: {
                borderRadius: "10px",
            }, customBG: {
                fontWeight: "bold",
                background: severityToColorMap[severity],
            }
        }),
    );

    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        onSnakBarClose();
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message}
                className={classes.message} ContentProps={{ classes: { root: classes.customBG } }}
                key={message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={handleClose}
                        >
                            <img src={crossIcon} className="text-light" />
                        </IconButton>
                    </React.Fragment>
                } />
        </div>

    )
}

export default MuiSnackBar