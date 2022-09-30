import React, { Fragment } from 'react'
import Banner from '../Components/Banner';
import How from '../Components/How';
import Current from '../Components/Current';
import Testimonial from '../Components/Testimonial';
import Offer from '../Components/Offer';
import bannerLogo from '../assets/Banner/HowBannerNew.svg';

import firstIcon from '../assets/How/first.svg';
import secondIcon from '../assets/How/second.svg';
import thirdIcon from '../assets/How/third.svg';
import fourthIcon from '../assets/How/fourth.svg';

import PieReport from '../Components/PieReport';
import Footer from '../Components/footer';

let Hows = [
    { title: "Register", subtext: "Register your company to get the most out of our services.", icon: firstIcon },
    { title: "Technical Bar", subtext: "Tell us about your technical bar", icon: secondIcon },
    { title: "Cultural Bar", subtext: "Tell us about your culture", icon: thirdIcon },
    { title: "Match Maker", subtext: "We will match candidates to your organization", icon: fourthIcon },
]

const bannerConfiguration = [
    {
        title: "Only get candidates that meet your bar",
        subtext: "Save time and money finding your ideal employee",
        btntext: "Let us get started",
        bannerLogo: bannerLogo,
        link: 'https://calendly.com/rsalota1/organization-introduction'
    }
];



function Home() {
    return (
        <Fragment>
            <Banner
                configuration={bannerConfiguration}
            />
            <How hows={Hows} />
            <PieReport />
            <Current />
            <Testimonial />
            <Offer />
            <Footer />
        </Fragment>
    )
}

export default Home
