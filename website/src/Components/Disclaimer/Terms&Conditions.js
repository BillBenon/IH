import React from 'react'
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .sections":{
            margin: '0 !important',
        },
        display: 'flex',
        fontSize: 'medium',
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: "92px !important",
        boxSizing: "border-box",
        "& .MuiTypography-root": {
            letterSpacing: "1px",
        },
        marginLeft: '10%',
        marginRight: '10%',
        "& Heading":{
            color:'#1d69a5',
        }
    },
    title:{
        textAlign: 'center'
    }
}))

const Heading = styled.div`
    font-size: 26px;
    margin-bottom: 20px;
    color: #1d69a5;
    font-weight: bold;
    line-height: 42px;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 40px;
`;


export default function () {
    const classes = useStyles();
    return <div className={classes.root}>
            <Title>Terms and Conditions for InterviewHelp.io</Title>
            <p className='sections'>
                <Heading>Introduction</Heading>
                <p>
                    These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, InterviewHelp accessible at https://www.interviewhelp.io/
                </p>
                <p>
                    These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.
                </p>
            </p>
            <p className='sections'>
                <Heading>Intellectual Property Rights</Heading>
                <p>Other than the content, you own, under these Terms, InterviewHelp and/or its licensors own all the intellectual property rights and materials contained in this Website.

                </p>
                <p>You are granted limited license only for purposes of viewing the material contained on this Website.

                </p>
                <p>The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to register for the Site</p>
            </p>
            <p className='sections'>
                <Heading>Restrictions</Heading>
                <p>
                    You are specifically restricted from all of the following:
                    <ul>
                        <li>publishing any Website material in any other media;</li>
                        <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
                        <li>publicly performing and/or showing any Website material;</li>
                        <li>using this Website in any way that is or may be damaging to this Website;</li>
                        <li>using this Website in any way that impacts user access to this Website;</li>
                        <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                        <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                        <li>Using this Website to engage in any advertising or marketing.</li>
                    </ul>
                </p>
                <p>
                    Certain areas of this Website are restricted from being access by you and InterviewHelp may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.
                </p>
            </p>
            <p className='sections'>
                <Heading>Your Content</Heading>
                <p>
                    In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant InterviewHelp a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
                </p>
                <p>Your Content must be your own and must not be invading any third party’s rights. InterviewHelp reserves the right to remove any of Your Content from this Website at any time without notice.

                </p>
            </p>
            <p className='sections'>
                <Heading>Your Privacy</Heading>
                <p>Please read Privacy Policy.

                </p>
            </p>
            <p className='sections'>
                <Heading>No warranties</Heading>
                <p>
                    This Website is provided "as is," with all faults, and InterviewHelp express no representations or warranties, of any kind related to this Website or the materials contained on this Website. In addition, nothing contained on this Website shall be interpreted as advising you.
                </p>
            </p>
            <p className='sections'>
                <Heading>Limitation of liability</Heading>
                <p>In no event shall InterviewHelp, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. InterviewHelp, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
                </p>
            </p>
            <p className='sections'>
                <Heading>Indemnification</Heading>
                <p>You hereby indemnify to the fullest extent InterviewHelp from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.
                </p>
            </p>
            <p className='sections'>
                <Heading>Severability</Heading>
                <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
                </p>
            </p>
            <p className='sections'>
                <Heading>Variation of Terms</Heading>
                <p>InterviewHelp is permitted to revise these Terms at any time as it sees fit, and by using this Website, you are expected to review these Terms on a regular basis.
                </p>
            </p>
            <p className='sections'>
                <Heading>Assignment</Heading>
                <p>The InterviewHelp is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.

                </p>
            </p>
            <p className='sections'>
                <Heading>Entire Agreement</Heading>
                <p>These Terms constitute the entire agreement between InterviewHelp and you in relation to your use of this Website, and supersede all prior agreements and understandings.
                </p>
            </p>
            <p className='sections'>
                <Heading>Governing Law & Jurisdiction</Heading>
                <p>These Terms will be governed by and interpreted in accordance with the laws of the State of us, and you submit to the non-exclusive jurisdiction of the state and federal courts located in us for the resolution of any disputes.
                </p>
            </p><br/><br/><br/><br/>
    </div>
}