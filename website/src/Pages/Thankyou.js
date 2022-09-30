import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import RightSvg from '../assets/thankyou/right.svg';
import ThankyouForm from '../Components/ThankyouForm';

const useStyles = makeStyles((theme) => (
    {
        root: {
            height: '100%',
            '& .MuiGrid-root.MuiGrid-container': {
                paddingTop: '64px',
                height: '100%',

            }
        },
        leftSection: {
            background: theme.palette.secondary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px',
            [theme.breakpoints.down('sm')]: {
                '&.MuiGrid-root.MuiGrid-item': {
                    padding: '40px 16px',
                    margin: '0 !important'
                }
            },
            '& .tyimage': {
                width: '100%'
            }
        },
        rightSection: {
            background: '#EFEFF6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '3rem',
            paddingRight: '9.5rem',
            [theme.breakpoints.down('sm')]: {
                '&.MuiGrid-root.MuiGrid-item': {
                    padding: '16px',
                    margin: '0 !important'
                }
            }
        }
    }
));

export default function Thankyou({ email, resetEmail }) {
    const classes = useStyles();
    useEffect(() => {
        //to report page view
        window.gtag('event', 'conversion', {
            send_to: 'AW-445948159/9DStCNvnufEBEP_B0tQB'
        });

    }, []);

    if (!email) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={5} className={classes.leftSection}>
                    <div>
                        <img src={RightSvg} alt={'Thank you'} className="tyimage"></img>
                    </div>
                </Grid>
                <Grid item xs={12} sm={7} className={classes.rightSection}>
                    <ThankyouForm email={email} resetEmail={resetEmail} />
                </Grid>
            </Grid>
        </div>
    )
}