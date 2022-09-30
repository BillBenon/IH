import React, { useState } from 'react';
import styled from 'styled-components';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LetsConnectModal from '../TrackDetails/LetsConnectModal';
import { faqList1, faqList2 } from '../../utils/Constants';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Wrapper = styled.div`
    margin-top: 135px;
    margin-left: 15px;
    margin-right: 15px;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 40px;
`;

const FaqsContainer = styled.div`
    .MuiAccordionSummary-root {
        font-weight: bold;
        border-radius: 5px;
        font-size: 16px;
        background-color: rgb(91, 148, 227);
        color: white;
        height: 50px;
        border-bottom: 1px solid powderblue;
    }

    .MuiAccordionDetails-root {
        font-size: 15px;
        background-color: rgba(44, 62, 80, 0.098);
    }
`;

const FaqMultiAnswer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FaqAnswer = styled.div`
    ${({ isLastPara }) => !isLastPara && `
        margin-bottom: 10px;    
    `}
`;

const ExpectConnectWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 90px;
    font-weight: 700;
    font-family: 'Khula', sans-serif;
    .submitBtn{
        background-color: #E25252;
        border-radius: 4px;
        box-shadow: none;
        height: 48px;
        margin-top: 18px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 1px;
        text-transform: "uppercase";
        :hover: {
            background: #D73C3C;
        };
        :active: {
            background: #D33030;
            boxShadow: none;
        }
    }
    .title {
        margin-bottom: 10px;
        font-size: 20px;
    }

    button {
        border: 1px solid black;
        background: #315CD5;
        color: white;
        padding: 5px 12px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
    }
`;

const Faqs = () => {
    const [openModal, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <Wrapper>
                <Title>FAQ</Title>
                <FaqList faqList={faqList1} />
                <ExpectConnect pitchText={'Get Free Consultation!'} handleOpenModal={handleOpenModal} />
                <FaqList faqList={faqList2} />
                <ExpectConnect pitchText={'Still having any doubt?'} handleOpenModal={handleOpenModal} />
                <LetsConnectModalComponent openModal={openModal} handleCloseModal={handleCloseModal} />
            </Wrapper >
            
        </>
    );
};


const LetsConnectModalComponent = ({ openModal, handleCloseModal }) => {
    const { search } = useLocation();
    const enrollFreePlan = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lpflowtype=enroll`;
    return <LetsConnectModal
        btnText={''}
        customMsg={{}}
        enrollFreePlan={enrollFreePlan}
        defaultComment={`I am interested.`}
        open={openModal}
        handleClose={handleCloseModal}
    />
}

const FaqList = ({ faqList }) => {
    return (
        <FaqsContainer>
            {faqList.map((faq) => {
                const multipleParagraphs = faq.answer.constructor.name === 'Array';
                return (
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon color={'secondary'} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            {faq.question}
                        </AccordionSummary>
                        <AccordionDetails>
                            {multipleParagraphs ? (
                                <FaqMultiAnswer>
                                    {faq.answer.map((faqAns, index, list) => {
                                        const isLastPara = index === list.length - 1;
                                        return (
                                            <FaqAnswer isLastPara={isLastPara}>
                                                {faqAns}
                                            </FaqAnswer>
                                        )
                                    })}
                                </FaqMultiAnswer>
                            ) : (
                                faq.answer
                            )}

                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </FaqsContainer>
    )
};

const ExpectConnect = ({ handleOpenModal, pitchText }) => {
    return (
        <ExpectConnectWrapper>
            <span className='title'>{pitchText}</span>
            <Button
                component="button"
                variant="contained"
                disableRipple
                onClick={handleOpenModal}
                className={'submitBtn'}
            >
                {'Connect with Expert'}
            </Button>
        </ExpectConnectWrapper>
    )
}

// const aboutUs = [`Nemo enim ipsam voluptatem quia voluptas sit atur aut odit aut fugit, sed quia consequuntur magni res.`];

// const popularProducts = [
//     'Technical Program Manager',
//     'Software Development Managers',
//     'Software Development Engineers',
//     'Technical Program Manager',
// ];

// const quickLinks = [
//     'Products',
//     'Our Process',
//     'Privacy Policy',
//     'Terms & Condition',
//     'About Us',
//     'Contact Us',
//     'Blog',
//     'FAQ'
// ];

// const contactAddress = [
//     'InterviewHelp Inc.',
//     '8015 Douglas Ave SE',
//     'Snoqualmie',
//     'WA 98065',
//     'United States',
//     'Phone: +1 425-298-3856'
// ];

// const Footer = () => {
//     return (
//         <FooterWrapper>
//             <div className='card-wrapper'>
//                 <Card title='About Us' content={aboutUs} />
//                 <Card title='Popular Products' content={popularProducts} />
//                 <Card title='Quick Links' content={quickLinks} />
//                 <Card title='Contact Us' content={contactAddress} />
//             </div>
            
//         </FooterWrapper>
//     )
// }

// const Card = ({ title, content }) => {
//     return (
//         <div className='card'>
//             <div className='title'>
//                 {title}
//             </div>
//             {content.map((data) => <span className='card-content'>{data}</span>)}
//         </div>
//     );
// }

export default Faqs;