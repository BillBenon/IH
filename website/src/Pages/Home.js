import React, { Fragment } from 'react';
import BannerWithForm from '../Components/BannerWithForm';
import Carousel from '../Components/Carousel';
import Difference from '../Components/Difference';
import FeaturePanel from '../Components/FeaturePanel';
import ProfessionalNetwork from '../Components/ProfessionalNetwork';
// import TopOrganization from '../Components/TopOrganization';

function HowItWorks({ focusForm, resetFocusForm, setEmail, calendlyPrefillData, setCalendlyPrefillData }) {
    // const bannerConfiguration = [
    //     {
    //         title:"Grow into top tier organizations.",
    //         subtext:"Use time more efficiently to get your dream job.",
    //         btntext:"Register for a free session",
    //         bannerLogo:bannerLogo,
    //         link:'https://calendly.com/rsalota1/30min'
    //     }
    // ];

    // const productsConfiguration = [
    //     {
    //         title: "Behavior Interview coaching",
    //         description: "Time tested behaivor questions and answers evaluated by experts from top tier organizations like Facebook, Google and Amazon",
    //         btntext: "See Questions",
    //         img: Behavioural,
    //         link: '/behavioral-coaching',
    //         leadText: 'Know more ...'

    //     },
    //     {
    //         title: "Live system design sessions",
    //         description: "Multiple system desgin sessions every week on zoom",
    //         btntext: "Learn more",
    //         img: LiveSystemDesign,
    //         link: '/system-design',
    //         leadText: 'Know more ...'
    //     },
    //     {
    //         title: "Daily Algorithms and Datastructure practice",
    //         description: "Led by Google,Amazon coaches",
    //         btntext: "Learn more",
    //         img: AlgorithmPractice,
    //         link: '/Faq',
    //         leadText: 'Know more ...'
    //     },
    //     {
    //         title: "Join us on Slack",
    //         description: "A community of software professionals to help you land your next FAANG job",
    //         btntext: "Join Now!",
    //         img: JoinUs,
    //         link: 'https://join.slack.com/t/interviewhelpiogroup/shared_invite/zt-dcrkvyuv-g8sY1HxexCvHU9Xbi~PUUw',
    //         leadText: 'Join now'

    //     }
    // ];

    return (
        <Fragment>
            {/* <Banner
                configuration={bannerConfiguration}
            /> */}
            <BannerWithForm
                focusForm={focusForm}
                resetFocusForm={resetFocusForm} 
                setEmail={setEmail}
                calendlyPrefillData={calendlyPrefillData}
                setCalendlyPrefillData={setCalendlyPrefillData}/>
            <FeaturePanel />
            <ProfessionalNetwork />
            <Carousel />

            <Difference />
            {/* <TopOrganization /> */}
        </Fragment>
    )
}

export default HowItWorks
