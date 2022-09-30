import {
    Backdrop, Chip, Fade, Grid, Modal, Paper,
    Tooltip, Typography
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "35rem",
        top: "10rem",
        display: "flex",
        alignItems: "center",
        margin: '35px auto',
        '& .MuiGrid-item': {
            marginBottom: '0.375rem !important',
            marginLeft: '0 !important'
        },
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            zIndex: '5',
            margin: '35px 20px',
        }
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
    },
    mobileGridItem: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0px !important",
            marginBottom: "0px !important"
        }
    },
    container: {
        maxHeight: "40rem",
        overflow: "auto",
        '& .MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                padding: '0 !important',
            }
        },
        '& .MuiCardContent-root': {
            [theme.breakpoints.down('sm')]: {
                padding: "0px !important"
            }
        }
    },
    keyPoints: {
        fontSize: "18px",
        fontWeight: "bold",
        margin: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            fontSize: "16px",
            padding: "5px",
        }
    },
    chip: {
        margin: '5px',
    },
    cardContent: {
        overflowY: 'auto',
    }
}
));


const CapabilityModal = ({ currentCategory, handleClose }) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    const closeModal = () => {
        handleClose();
    }

    return (
        <Modal
            className={classes.root}
            open={!!currentCategory}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            disableAutoFocus
        >
            <Fade in={!!currentCategory}>
                <Paper className={classes.root}>
                    {currentCategory.capabilities && !!currentCategory.capabilities.length && <Grid item className={classes.mobileGridItem} xs={12}>
                        <Card elevation={0} className={classes.container}>
                            <CardHeader
                                title={<Grid container spacing={3}>
                                    <Grid item justify="start" sm={12} xs={12}>
                                        <Paper elevation={0} square={true}><h2 className={classes.keyPoints}>{'Capabilities you will be evaluated for.'}</h2></Paper>
                                    </Grid>
                                </Grid>}
                            />
                            <CardContent className={classes.cardContent}>
                                {currentCategory.capabilities.map(c =>
                                    <Tooltip title={c.capabilityDescription && <Typography paragraph dangerouslySetInnerHTML={{ __html: c.capabilityDescription }}></Typography>}>
                                        <Chip className={classes.chip} variant="outlined" label={c.capabilityText && c.capabilityText} avatar={c.capabilityText && matches && <Avatar>{c.capabilityText.charAt(0)}</Avatar>} />
                                    </Tooltip>
                                )}
                            </CardContent>
                        </Card >
                    </Grid>}
                </Paper>

            </Fade>
        </Modal>
    )
}

export default CapabilityModal;
