import React, { Fragment } from 'react';
import FaqCategory from '../Components/FaqCategory';
import { Button } from '@material-ui/core';

function Faq() {
    return (

        <Fragment>
            <h2 className="faq-heading">Getting started with Leet Code</h2>
            <h4 className="faq-description"><span>Learn leet code in month(s). Below is a breakdown of the topics learned in </span>
                <span>each level. You can choose which level you would like to start with.</span></h4>
            <Button
                variant="contained"
                className='btnRegisterInterview'
                href='https://calendly.com/rsalota1/30min'
            >
                Register
        </Button>
            <FaqCategory />
        </Fragment>

    )
}

export default Faq
