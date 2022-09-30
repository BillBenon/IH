import AustraliaIcon from '../assets/countries/australia.svg';
import CanadaIcon from '../assets/countries/canada.svg';
import FranceIcon from '../assets/countries/france.svg';
import GermanyIcon from '../assets/countries/germany.svg';
import ItalyIcon from '../assets/countries/italy.svg';
import JapanIcon from '../assets/countries/japan.svg';
import NewZealandIcon from '../assets/countries/newzealand.svg';
import SpainIcon from '../assets/countries/spain.svg';
import UkIcon from '../assets/countries/uk.svg';
import UsaIcon from '../assets/countries/usa.svg';
import BrazilIcon from '../assets/countries/brazil.svg';

const constants = {
    INDEX: {
        get: ""
    }
};

export const planTypes = {
    TRACKPLANFREE: "trackPlanFree",
    TRACKPLANSUBSCRIPTION: "trackPlanSubscription",
    TRACKPLANCONTRACT: "trackPlanContract",
    TRACKPLANEVALUATION: "trackPlanEvaluation",
    TRACKPLANPLACEMENT: "trackPlanPlacement"
}

export const TemplateTypes = {
    DEFAULT: "DEFAULT_TEMPLATE",
    MARKETING: "MARKET_TEMPLATE",
    CUSTOMIZED: "CUSTOMIZED",
}

export const TrackDetailConsts = {
    MaxCapability: 5,
    MaxKeyPoints: 5,
    MaxPlanPoints: 4,
}

export const colorsArray = ['#FC766AFF', '#5B84B1FF', '#5F4B8BFF', '#D6ED17FF', '#00203FFF', '#00A4CCFF', '#2C3E50', '#606060FF'];

export const countries = [
    {
        value: 'UnitedStates',
        label: '1',
        icon: `${UsaIcon}`
    },
    {
        value: 'Canada',
        label: '1',
        icon: `${CanadaIcon}`
    },
    {
        value: 'UnitedKingdom',
        label: '44',
        icon: `${UkIcon}`
    },
    {
        value: 'France',
        label: '33',
        icon: `${FranceIcon}`
    },
    {
        value: 'Germany',
        label: '49',
        icon: `${GermanyIcon}`
    },
    {
        value: 'Spain',
        label: '34',
        icon: `${SpainIcon}`
    },
    {
        value: 'Italy',
        label: '39',
        icon: `${ItalyIcon}`
    },
    {
        value: 'New Zealand',
        label: '64',
        icon: `${NewZealandIcon}`
    },
    {
        value: 'Australia',
        label: '61',
        icon: `${AustraliaIcon}`
    },
    {
        value: 'Japan',
        label: '81',
        icon: `${JapanIcon}`
    },
    {
        value: 'Brazil',
        label: '55',
        icon: `${BrazilIcon}`
    }
];

export const faqList1 = [
    {
        question: 'What do you offer ?',
        answer: `We currently focus on three domains Technical program managers, Software development managers, and 
        Software Development Engineers. To support these three domains end to end, we offer various services ranging 
        from resume reviews to placement support. We consider ourselves a one-stop-shop in your journey to a new job 
        or career, therefore please ask us if you have a unique requirement, and we will make adjustments to achieve 
        it.`
    },
    {
        question: `What about your coaching is different than me learning on my own?`,
        answer: [`The value prop differs from candidate to candidate. In our opinion, self-learning is a great way, 
        but if you are not able to get the result in an optimal time frame, then you are just losing on the opportunity. 
        The window for an optimal timeframe runs out pretty quickly; in our experience, it is 2-3 months if you have 1-2 
        years of industry experience.`,
            `I will illustrate this with a real-world case study; I had a candidate who was working at a start-up at approximately 
        90K per annum. He had completed his master's program 1.5 years ago was and an SDE-1 by industry standards. He joined 
        our program in August and used our training and placement network services. As a result, he was able to land an SDE-2 
        position at a top tier company; it doubled his total comp and accelerated his career by 2-3 years. This impact is hard 
        to replicate in a self-learning do it my self environment. It is these possibilities that interviehelp.io materialize 
        for its users, which makes joining our programs a no brainer. We would not be excited about interviewhelp.io if this 
        were not the norm with all our candidates. `
        ]
    },
    {
        question: `Where do you hold the classes or 1-on-1 sessions ?`,
        answer: `We hold our classes in the cloud using zoom. We record all sessions and are available on request.`
    },
    {
        question: `When are the classes held ?`,
        answer: `Each class has its own schedule. Please see the class pages to see what works for you. If the class timings 
        don't work, I suggest looking at our Pay on success program where we can customize it for your specific needs.`
    },
    {
        question: `Do you offer placement support ?`,
        answer: `Yes we do! however please don't assume this as job placement guarantee. We help our candidates land jobs to 
        the best of our abilities using our extensive network.`
    },
    {
        question: `How are you different from your competitors ?`,
        answer: `We don't focus on our competitors but focus on outcomes, customer satisfaction, and the best results. To date, 
        we have had 100% success with our candidates, be it be a software developer, software development manager, or technical 
        program manager. Our candidates stand by us and become a part of our network and, in some cases, become mentors on our 
        platform with the intent to give back for the help they received to reach their destinations.`
    }
];

export const faqList2 = [
    {
        question: `Why did you create the placement program?`,
        answer: `We created the placement program to help connect talent directly with decision-makers. The objective is to reduce 
        the candidate wait time by showcasing their abilities beyond the resume. To accomplish this goal, we want to provide 
        calibrated candidates to managers so that they can make quick hiring decisions.`
    },
    {
        question: `How does the placement program work?`,
        answer: `The program is quite simple; candidate enrolls in the program; we take a couple of mock interviews; we evaluate 
        the interviews and give the candidate a score and finally get candidate's approval to list his profile on our candidate 
        portal. The portal allows hiring managers to see candidate strengths.`
    },
    {
        question: `Is there a charge for applying to the program?`,
        answer: `We charge $400 per candidate to enroll in the program +  3% of your base compensation on success, if the interview 
        is scheduled through our placement network.`
    },
    {
        question: `How many mock interviews will we need ? `,
        answer: `We take two mock interviews. The exact interviews taken depends on the track. For Software Development Engineers, 
        the mocks are coding and system design. For Software development managers, it is Manager core and System Design, and for 
        Technical program managers, it is System design and TPM core.`
    },
    {
        question: `Will I get feedback from the mock interviews?`,
        answer: `Yes, we will provide you with feedback and guide you through to get better. Our primary goal is to help people 
        grow, and feedback and evaluation framework are tactics to supports this goal.`
    },
    {
        question: `Do you support a placement program for all the streams?`,
        answer: `Yes, we do. Currently, placement support is available for Software development engineers, Software development 
        managers, and Technical program managers.`
    },
    {
        question: `Which companies are in your placement network?`,
        answer: `We have relationships with almost all companies in the Seattle area, however at any given point in time only a 
        few companies are looking. In order to check our current network and opening please click here.`
    }
];

export const PrivacyPolicyTexts = {
    heading1: `interviewhelp.io respects your privacy and is committed to letting you know how we will collect and use your information. 
    This Notice of Privacy Practices ("Notice") describes the privacy practices we follow in connection with the interviewhelp.io sites 
    and mobile applications that link to it (collectively the "Sites"), as well as the related consumer services offered through the 
    Sites. It also describes the options you have regarding our collection, use, and disclosure of your personal information when 
    accessing the Sites.`,
    heading2: `By using our Sites and/or registering as a interviewhelp.io member, you are accepting the privacy practices described in 
    this Notice and consenting to our collection, use and disclosure of your personal information as described below. If you do not agree 
    with this Notice, please do not use the Sites. We reserve the right to modify the terms of these Privacy Practices at any time. We will 
    post any changes to our website. Your continued use of our Sites following the posting of changes will mean you accept those changes.`,
    informationCollection: [
        `Information you provide to us: Our services are offered on a members-only basis and focus on special deals and product offerings 
        that may only be available for limited times and in limited quantities. In order to access and use the interviewhelp.io services, 
        you must register through the Sites as a interviewhelp.io member and provide us with personally identifiable information, which 
        includes your name, email address, physical address and phone number. You will also be required to create a interviewhelp.io password. 
        This information allows us to authenticate your access to the Sites, keep you informed in a timely fashion of special deals and product 
        offerings, and complete transactions you initiate. When you use our services, you may also provide payment account information 
        (e.g., credit/debit card information, bank account number), photographs in which you may be recognized, and other information 
        about yourself.`,
        `Information we collect automatically: We also collect information about your visit to and use of the Sites, such as your IP address and the 
        location of your IP server, device IDs, device type, wi-fi connection information, general and precise geo-location data, product search 
        history, type of browser and operating system used, date and time you access the services, pages you visit, and, if you came to the Sites 
        from another website, the address of that website.`,
        `Information collected through cookies, web beacons and other tracking technologies: Like many websites, we use "cookies," which are small 
        text files that are stored on your computer or equipment when you visit certain online pages that record your preferences and actions. 
        We may also use web beacons (also known as "action tags," "tracer tags," or "single-pixel gifs"), which are an invisible graphic on a 
        web page that is programmed to collect information about your use of a given website. These technologies may also be used in the emails 
        and other communications we send to you to help us understand how you interact with those messages. We may also use mobile application 
        plug-ins, such as software development kits, application programming interfaces and similar technologies. We use cookies, web beacons 
        and other similar technologies for security, and to monitor traffic, improve the Sites, and make our Sites easier to use and more relevant 
        to you. We and our third party partners, as applicable, also use these technologies to track your use of our Sites and interaction with our 
        emails and other communications, to personalize your experience and deliver advertisements, and for research and marketing purposes, and to 
        track your exposure to online advertisements (see Interest-Based Advertising). Most web browsers automatically accept cookies, but, if you 
        prefer, you can usually modify your browser setting to disable or reject cookies. If you delete your cookies or if you set your browser to 
        decline cookies, some features of the Sites may not work or may not work as designed. For more information on cookies and how to disable them, 
        you can consult the information provided by the Interactive Advertising Bureau at www.allaboutcookies.org.`,
        `Information collected from other sources: We may collect information about you that we receive from other sources or from our offline interactions 
        with you to, among other things, enable us to verify or update information contained in our records and to better customize services for you. 
        We may also combine information we receive from third parties with the information we receive based on your use of the Sites and any other 
        interactions with us.`
    ],
    useInformation: {
        heading: 'We may use the information we collect from you to:',
        points: [
            `Provide content, products and services, including the operational, management, and billing support necessary to accomplish those business 
            purposes`,
            `Post content you provide to us`,
            `Communicate about account or transactions and send information about features and enhancements`,
            `Communicate about changes to our policies`,
            `Personalize content and experiences, including providing recommendations based on your preferences`,
            `Send offers or promotions for our products, services or special events`,
            `Send offers or promotions for third-party products, services or special events`,
            `Provide advertising including advertising based on your activity on the Sites or activity on third-party websites`,
            `Administer contests, sweepstakes, promotions, or surveys`,
            `Optimize or improve our products, services and operations`,
            `Detect, investigate, and prevent activities that may violate our policies or be illegal`,
            `Perform statistical, demographic, and marketing analyses of users of the Sites and their purchasing patterns`
        ],
        paragraphs: [
            `We may use the information from one portion of the Sites on other portions of the Sites, and we may combine 
            information gathered from multiple portions of the Sites into a single record. We may also use or combine information 
            that we collect offline or we collect or receive from third-party sources to enhance, expand, and check the accuracy 
            of your customer records.`,
            `We may use your information in other ways not listed here, for which we will provide notice at the time of collection 
            and as required by legal process.`
        ]
    },
    socialMediaInteraction: {
        heading: `Interaction with Social Media`,
        point: `We may include applications from third parties on this website or through our Sites, which allow interaction 
        or content sharing by users. Some of these applications provide specific services or content from a third party, such as a Facebook 
        "Share" or "Like" button, and are visible to you when you visit our Sites. Your interaction with these programs typically allows the 
        third party to collect some information about you through cookies they place on your device and other tracking mechanisms. In some 
        cases, the third party may recognize you through its cookies even when you do not interact with their application. If you choose to 
        log in to your interviewhelp.io account with or through a social networking service, interviewhelp.io and that service may share 
        certain information about you and your activities. We also may share information about your activities, including what you view and 
        purchase on the Sites, with a social network, in accordance with your account settings with us or your social networking service, or 
        with your permission. Please visit the third parties' respective privacy policies to better understand their data collection practices 
        and controls they make available to you.`
    },
    interestBasedAdvertising: [
        `interviewhelp.io uses the information you make available to us when you interact with our Sites, content, or services to provide 
        you with advertising and offers that are more relevant to you. We also partner with third party advertising companies to provide 
        advertisements on our Sites and other Sites about goods and services that may be of interest to you, including advertisements for 
        unaffiliated products and services on our Sites. The advertisements may be based on information collected through cookies, web 
        beacons and other tracking technologies from our Sites, emails/communications and on other third-party websites you visit and 
        mobile applications you use that participate in our advertising networks. These third parties may use persistent identifiers to 
        track your Internet usage across other websites and mobile applications in their networks beyond these Sites. For information about 
        how third parties may access your information, please see Information We Share below.`,
        `You can learn more about ad serving companies and the options available to limit their collection and use of your information 
        by visiting the websites for the Network Advertising Initiative and the Digital Advertising Alliance, and the webpages for 
        Facebook's ad preferences tool and privacy policy. Similarly, you can learn about your options to opt-out of mobile app tracking 
        by certain advertising networks through your device settings and by resetting the advertiser ID on your Apple or Android device. 
        For more information about how to change these settings go to:`,
        `Apple: http://support.apple.com/kb/HT4228`,
        `Android: http://www.google.com/policies/technologies/ads/`,
        `Windows: http://choice.microsoft.com/en-US/opt-out`,
        `Please note that opting-out of advertising networks services does not mean that you will not receive advertising while using 
        our Sites or on other websites, nor will it prevent the receipt of interest-based advertising from third parties that do not 
        participate in these programs. It will, however, exclude you from interest-based advertising conducted through participating 
        networks, as provided by their policies and choice mechanisms.`
    ],
    informationYouShare: {
        heading: `Information You Share`,
        point: `The Sites may allow you to connect and share your actions, comments, content, and information publicly or 
        with other people you specify. You may also connect to and share your information on third party social media platforms, websites, 
        applications, and services through "plug-ins," widgets, buttons, and other third party features on and connected with our Sites. 
        You may also share with interviewhelp.io contact information of friends and people in your address book so that we can help you 
        invite others to become interviewhelp.io members or let them know about special offers and help facilitate deliveries. Please be 
        mindful of your own privacy needs and those of others as you choose with whom to connect, what you share with us and others, and 
        what you make public. We cannot control the privacy of information you choose to make public or share with others. We also cannot 
        control and are not responsible for any third party sharing services or their actions including the data that they collect from 
        you and your device or how they use such data. Please review their privacy policies to understand their privacy practices.`
    },
    informationWeShare: {
        heading: `We may share your information with third parties as described below:`,
        points: [
            {
                heading: `Affiliates`,
                point: `We may share your information with any related entities of interviewhelp.io ("Affiliates") that use and 
                disclose your information for their purposes in ways consistent with this Notice.`
            },
            {
                heading: `Service Providers`,
                point: `We may allow third parties who perform business services for us to access, store, and process your information 
                in order to provide those services. Our service providers will not use your personally identifiable information for their 
                own marketing or other business purposes without your consent.`
            },
            {
                heading: `Business Partners`,
                point: `We may engage in activities that include sharing your information with business partners who provide products and 
                services that we think may be of interest to you. In such instances, we will restrict our business partners' use of any 
                information that personally identifies you to our joint marketing activities. To learn how to limit the sharing of your 
                information for these joint marketing activities, go to the Your Choices section of this policy.`
            },
            {
                heading: `Surveys/Sweepstakes/Promotions`,
                point: `In the event that you participate in a survey, sweepstakes, contest, or other promotion that is sponsored by 
                interviewhelp.io and a third party, such participation serves as your consent for interviewhelp.io to share your information 
                collected in conjunction with the survey, sweepstakes, contest or promotion, with that co-sponsoring third party. After the 
                information is provided to such third parties, the subsequent use or disclosure of such information is subject to those third 
                parties' privacy policies and practices.`
            },
            {
                heading: `Legal Disclosures`,
                point: `We may disclose information, including information that personally identifies you, to: (i) protect or defend the legal 
                rights, interests or property of interviewhelp.io and our Affiliates; (ii) protect the safety and security of our customers or 
                members of the public; (iii) protect against fraud or for risk management purposes; or (iv) comply with applicable law or legal 
                process. In addition, we may disclose or transfer your information in connection with or during negotiation of any merger, financing, 
                acquisition, bankruptcy, dissolution, or any other transaction or proceeding involving sale, transfer, divestiture or disclosure of 
                all or a portion of our business or assets to another company. Under such circumstances, we would, to the extent possible, require 
                the acquiring party to follow the practices described in this Notice, as it may be amended from time to time. Nevertheless, we cannot 
                promise that an acquiring company party or the merged company entity will have the same privacy practices or treat your information 
                the same as described in this Notice of Privacy Practices.`
            }
        ],
        paragraphs: [
            `We may share information about your visit to and use of the Sites, including browser or device information, with third parties, 
            including our Affiliates, advertising networks, analytics providers and others who may use the data for any legally permissible 
            purpose and without notice to you.`
        ]
    },
    yourChoices: {
        heading: `Your Choices`,
        points: [
            {
                heading: `Personally Identifiable Information`,
                point: `Visitors to our Sites can choose not to provide the personally identifiable information needed to register as a 
                interviewhelp.io member, however, they will not be able to use the interviewhelp.io services.`
            },
            {
                heading: `Emails and Other Communications`,
                point: `By becoming a member, you are requesting that we inform you about limited time and quantity deals and agreeing to 
                receive communications from us, including promotional emails. If you would like to alter the frequency and type of communications 
                you receive from us, you may do so at any time by updating the communication preferences specified in your Account Profile here, 
                or by going to our website, and clicking on my account. If you no longer wish to receive promotional communications from us, you 
                may do so by changing your preferences as noted above. Please note that this may affect your ability to access certain products 
                and services, and we may continue to send non-promotional communications such as order confirmations, surveys, and other information 
                about your transactions. If you refer others to us using our email functionality, please note that they may choose not to receive 
                any promotional emails from us in the future by following the opt-out instructions in the email invitation. If you want to receive 
                our emails, but do not wish for us to track the emails we send you, some email services allow you to adjust your display to turn 
                off HTML or disable download of images that should effectively disable our email tracking.`
            },
            {
                heading: `Tracking`,
                paragraphs: [
                    `You also have choices to limit some tracking mechanisms that collect information when you use the Sites. Many web browsers 
                    automatically accept cookies, but you can usually modify your browser's setting to decline cookies if you prefer. If you choose 
                    to decline cookies, certain features of our website, including the Sites themselves, may not function properly or remain accessible 
                    to you. In addition, you may also render some web beacons unusable by rejecting or removing their associated cookies. Note that if 
                    you choose to remove cookies, you may remove opt-out cookies that affect your advertising preferences.`,
                    `You may opt out of the collection and use of your information by some advertising networks as described in the Interest-Based 
                    Advertising section of this Notice.`,
                    `You may opt out of tracking of analytics data by Google Analytics, one of our customer usage analytics providers, 
                    by clicking here.`,
                    `You may choose not to share your precise geo-location information with us by adjusting the device's location services 
                    settings or the settings on our mobile applications.`,
                    `Your browser or device may include "Do Not Track" functionality. Note that interviewhelp.io's information collection and disclosure 
                    practices, and the choices that we provide to customers, will continue to operate as described in this Notice, whether or not a 
                    Do Not Track signal is received.`
                ]
            },
            {
                heading: `Third Party Links`,
                point: `The Sites may contain links to other sites that interviewhelp.io does not own or operate. This includes links from advertisers, 
                vendors, social media, co-branded sites, and other third parties. These other sites may send their own cookies to your device, they 
                may independently collect data or solicit personal information and may or may not have their own published privacy policies. We do 
                not control, recommend or endorse and are not responsible for these sites or their privacy policies or practices. This Notice of 
                Privacy Practices only applies to the Sites and information collected by interviewhelp.io or its Affiliates.`
            }
        ]
    },
    accessAndUpdateInfo: {
        heading: `Accessing and Updating your Information`,
        point: `You may access and update your account information at any time after signing in to the Sites by visiting your Account Profile here. 
        To help us maintain accurate, current and complete information about you, please submit only true, accurate and complete information 
        whenever you provide personally identifiable information to us, and promptly update your account whenever it changes. For additional 
        assistance, please contact us in in the manner specified below.`
    },
    children: {
        heading: `Children`,
        point: `We do not knowingly collect, use or disclose personally identifiable information from anyone under 16 years of age. If we 
        become aware that we have unknowingly collected personally identifiable information from a child under the age of 16, we will make 
        reasonable efforts to delete such information from our records.`
    },
    transferInfoConsent: {
        heading: `Consent to Processing and Transfer of Information`,
        point: `Given that we are an international business, our use of your information necessarily involves the transmission of data on an 
        international basis. If you are located outside of the United States, please be aware that information we collect may be transferred 
        to and processed by servers located in the United States. By using the Sites, or providing us with any information, you consent to 
        the collection, processing, maintenance and transfer of such information in and to the United States.`
    },
    dataSecurity: {
        heading: `Data Security`,
        point: `We employ certain administrative, technical, and physical security measures to help reduce the risks of loss, theft and 
        unauthorized access associated with the information that is in our possession. We cannot, however, guarantee the security of the 
        networks, systems, servers, devices, and databases we operate or that are operated on our behalf.`
    },
    howToContact: {
        heading: `How to Contact Us`,
        paragraphs: [
            `If you have any questions or comments about this Notice or if you would like us to help you adjust your preferences, please 
            contact us by email at help@interviewhelp.io.com or call us at 2063492696.`,
            `If preferred, you may write to us at:`,
            `interviewhelp.io, LLC`,
            `Attn: Privacy Inquiry`,
            `8105 Douglas Ave SE`,
            `Snoqualmie, WA 98121`
        ]
    },
    californiaPrivacyPolicy: {
        heading: `California Privacy Practices`,
        paragraphs: [
            {
                point: `The California Consumer Privacy Act ("CCPA") provides new rights to California residents ("consumers"). This section 
                ("CCPA Notice") explains how interviewhelp.io collects and uses the personal information of California consumers and 
                how those consumers can exercise their rights under CCPA. This CCPA Notice will be updated every 12 months, or as needed 
                to address changes in the law or our practices.`
            },
            {
                point: `This CCPA Notice supplements our other privacy notices and policies and shall govern in the event of a conflict.`
            },
            {
                heading: `Note for non-members or prospective members`,
                point: `Please note that this CCPA Notice does not apply to human resources data or business-to-business communications data. 
                If you would like information about human resources data or business-to-business communications data, please reach out to your 
                contact at interviewhelp.io.`
            }
        ],
        topics: [
            {
                heading: `Collected personal information.`,
                paragraphs: [
                    {
                        heading: `Categories of personal information `,
                        point: `interviewhelp.io may collect personal information about members and other users of our services who are California 
                        consumers including personal information within the following categories: identifiers (e.g. your name and other contact 
                        information, IP address and device ID); characteristics of protected classifications under California or federal law; 
                        commercial information (e.g. your order information, payment information and feedback information); internet or other 
                        electronic network activity information (e.g. your browsing history); geolocation data; audio, electronic, visual, or 
                        similar information (e.g. pictures and videos that you send to us, or recordings of your calls to our customer 
                        service centers); professional or employment-related information; inferences information (e.g. your interests, 
                        demographics and shopping preferences); and individual records (e.g. any other information that may identify or 
                        relates to you).`
                    },
                    {
                        heading: `Non-personal information `,
                        point: `interviewhelp.io may also collect, generate or share deidentified or aggregate information. This is not personal 
                        information under CCPA and we reserve the right to convert, or permit others to convert, personal information into 
                        deidentified data or aggregate consumer information.`
                    }
                ]
            },
            {
                heading: `Sources of personal information`,
                point: `interviewhelp.io collects personal information from different sources.`,
                paragraphs: [
                    {
                        heading: `Personal information we collect from you. `,
                        point: `interviewhelp.io collects some personal information that you provide directly to us. This can include contact 
                        information, order information, payment information, communication information, feedback information, preferences 
                        information, pictures and videos that you send to us, and other information you provide to us. In addition, you may 
                        provide us with the personal information of other people if you invite others to become interviewhelp.io members or 
                        send a package to another person.`
                    },
                    {
                        heading: `Personal information we collect from cookies, pixels and similar technologies. `,
                        point: `interviewhelp.io or its vendors collect some personal information automatically from cookies, pixels and similar 
                        technologies when you use our services. This can include your browsing activities when you are on our Sites; information 
                        about devices that you use to access interviewhelp.io’s services; and other information collected through cookies, pixels, 
                        and similar technologies.`
                    },
                    {
                        heading: `Personal information we create. `,
                        point: `interviewhelp.io creates some personal information when you use our services. This can include analytics and 
                        inferences about your interests, demographics and shopping preferences.`
                    },
                    {
                        heading: `Personal information we collect from third parties. `,
                        point: `interviewhelp.io collects personal information from other companies. This can include updated address and shipping 
                        instructions information; credit information; information from advertisers; information from Facebook, Twitter and other 
                        similar platforms; personal information from third parties that supplements the personal information we already have.`
                    }
                ]
            },
            {
                heading: `Uses of personal information`,
                point: `interviewhelp.io uses personal information for the following business or commercial purposes:`,
                paragraphs: [
                    {
                        heading: `Account provision and maintenance, `,
                        point: `including creating and managing your account with interviewhelp.io; providing customer service; verifying member 
                        information; and providing other services in the course of interviewhelp.io’s business operations`
                    },
                    {
                        heading: `Product sales and fulfillment, `,
                        point: `including selling products; processing and shipping orders to you or to other people you designate; managing 
                        returns; processing refunds; managing any warranties`
                    },
                    {
                        heading: `Customer service and communications, `,
                        point: `including responding to requests, comments, or questions through emails, Facebook messenger messages, text 
                        messages, push notifications, telephone calls, postal mail, chat functions; providing interest-based advertising 
                        and other advertising, marketing and promotional content and messaging, managing and communicating through 
                        interviewhelp.io presences on social media platforms and other platforms; maintaining product review capabilities; 
                        reviewing recorded calls or content of other communications for quality or customer service purposes; responding 
                        to requests for information and taking action that may be requested under CCPA`
                    },
                    {
                        heading: `Improving services and user experience, `,
                        point: `including creating and updating applications, websites, and other features or functionality used by 
                        interviewhelp.io; debugging to identify and repair errors that may affect how the services function; engaging 
                        in analytics related to improving services or user experience`
                    },
                    {
                        heading: `Personalizing user experience and marketing, `,
                        point: `including targeted product display; targeted marketing and advertising through the services; marketing 
                        through emails, Facebook messenger messages, text messages, push notifications and other communications methods; 
                        re-targeted marketing and advertising across other websites, devices, and platforms; auditing related to the 
                        performance of interviewhelp.io’s advertising and marketing efforts; engaging in analytics to personalize user 
                        experience`
                    },
                    {
                        heading: `Fraud prevention and information security, `,
                        point: `including measures to verify identity when an account is used for ordering or when the account is 
                        otherwise accessed; detecting and responding to fraud or security incidents; protecting against other 
                        malicious, deceptive, or illegal activity`
                    },
                    {
                        heading: `Legal obligations, `,
                        point: `including prosecuting people responsible for fraudulent, malicious, deceptive or illegal activities; 
                        defending claims; notifying of product recalls or other issues related to products; enforcing and notifying 
                        of interviewhelp.io’s terms and conditions, notice of privacy practices and other policies and changes to 
                        such terms and conditions, notice of privacy practices and other policies`
                    },
                    {
                        heading: `Payment-related activities, `,
                        point: `including processing payments, evaluating payment options, managing Smart-pay and similar payment 
                        programs, and managing private label credit card programs`
                    },
                    {
                        heading: `Conducting research, `,
                        point: `analytics, surveys, and focus groups to improve member experiences, develop services and products, 
                        provide better marketing and advertising`
                    },
                    {
                        heading: `Product safety or quality activities`
                    },
                    {
                        heading: `Any other legal purpose `,
                        point: `consistent with our applicable notice of privacy practices.`
                    }
                ]
            },
            {
                heading: `Disclosures of personal Information.`,
                paragraphs: [
                    {
                        heading: `Sales of personal information. `,
                        point: `The concept of a "sale" under CCPA is different from what has traditionally been considered a 
                        "sale", e.g., selling a customer list for money. Under CCPA, a "sale" potentially includes other uses 
                        or disclosures of personal information to third parties outside interviewhelp.io in a commercial 
                        context (unless an exception to "sale" as provided by CCPA exists). Because the concept of "sale" is 
                        so broad under CCPA, interviewhelp.io may be deemed to "sell" the following personal information even 
                        though we may not disclose your personal information in exchange for money: identifiers; characteristics 
                        of protected classifications under California or federal law; commercial information; internet or other 
                        electronic network activity information; geolocation data; audio, electronic, visual, or similar information; 
                        professional or employment-related information; inferences information; and individual records.`
                    },
                    {
                        heading: `Disclosures for business purposes. `,
                        point: `Please note that interviewhelp.io may share your personal information with vendors that help us fulfill 
                        your transactions and provide other services to us. Examples of these vendors include payment processors, fraud 
                        prevention services, and shippers. We do not treat these disclosures as sales. interviewhelp.io may disclose the 
                        following personal information to our vendors: identifiers; characteristics of protected classifications under 
                        California or federal law; commercial information; internet or other electronic network activity information; 
                        geolocation data; audio, electronic, visual, or similar information; professional or employment-related information; 
                        inferences information; and individual records.`
                    }
                ]
            }
        ]
    },
    rightsCCPA: {
        heading: `CCPA rights.`,
        paragraphs: [
            {
                heading: `Right to delete personal information. `,
                point: `If you are a California consumer, you have the right to request that interviewhelp.io delete any personal information 
                about you that interviewhelp.io has collected from you. Note that interviewhelp.io may retain some personal information, as 
                permitted under CCPA.`,
                paragraphs: [
                    {
                        heading: `How to exercise right of deletion: `,
                        point: `If you are a California consumer, you may exercise your right to request deletion of your personal information 
                        by clicking here or by emailing CCPA.deletion.request@interviewhelp.io.com. In order to verify your identity, you must 
                        enter the email address and password associated with your interviewhelp.io account. There is no reasonable method by 
                        which interviewhelp.io can verify the identity of a consumer who does not have a interviewhelp.io account.`
                    }
                ]
            },
            {
                heading: `Right to opt-out of sales. `,
                point: `interviewhelp.io may sell certain personal information that interviewhelp.io has collected about you as described in 
                the "Sales of personal information" section above. If you are a California consumer, you have the right to opt-out of some 
                sales of your personal information.`,
                paragraphs: [
                    {
                        heading: `How to exercise right to opt-out of sales: `,
                        point: `If you are a California consumer, you may exercise your right to opt-out by clicking here or by emailing 
                        CCPA.opt-out.request@interviewhelp.io.com.`
                    }
                ]
            },
            {
                heading: `Right to receive a copy of your personal information and other information. `,
                point: `If you are a California consumer, you have the right to request that interviewhelp.io disclose to you the 
                following information:`,
                paragraphs: [
                    {
                        point: `The categories of personal information interviewhelp.io has collected about you.`
                    },
                    {
                        point: `The categories of sources from which the personal information about you is collected.`
                    },
                    {
                        point: `The business or commercial purpose for collecting or selling personal information about you.`
                    },
                    {
                        point: `The categories of third parties with whom interviewhelp.io shares personal information about you.`
                    },
                    {
                        point: `The categories of personal information interviewhelp.io sold about you and the categories of third 
                        parties to whom the personal information about you was sold.`
                    },
                    {
                        point: `The categories of personal information interviewhelp.io disclosed about you for a business purpose.`
                    },
                    {
                        point: `The specific pieces of personal information interviewhelp.io has collected about you.`
                    },
                    {
                        heading: `How to exercise right to receive a copy of personal information and other information: `,
                        point: `If you are a California consumer, you may exercise your right to request a copy of the 
                        information described under this "Right to receive a copy of personal information and other information" 
                        section by clicking here or by emailing CCPA.access.request@interviewhelp.io.com. In order to verify your 
                        identity, you must enter the email address and password associated with your interviewhelp.io account. 
                        There is no reasonable method by which interviewhelp.io can verify the identity of a consumer who does 
                        not have a interviewhelp.io account.`
                    }
                ]
            },
            {
                heading: `Right to non-discrimination. `,
                point: `If you are a California consumer, you have the right that a business shall not discriminate against you 
                because you exercised rights under CCPA. However, we reserve the right to provide loyalty programs and other 
                differential pricing and services as permitted by CCPA, which will be subject to applicable terms and conditions 
                of such programs.`
            }
        ]
    },
    rightsLimitations: {
        heading: `Limitation of rights; compliance with applicable law. `,
        point: `Notwithstanding anything to the contrary in this CCPA Notice, we may collect, use and disclose personal information 
        as required or permitted by applicable law and this may override CCPA rights. In addition, we need not honor any requests 
        to the extent that doing so would infringe upon our or any other person or party’s rights or conflict with applicable law.`
    },
    californiaLaw: {
        heading: `California's "Shine the Light" law. `,
        point: `If you are a California resident, California law gives you the right to request a list of all third parties to which 
        interviewhelp.io has disclosed your personal information (as defined by CA Civil Code § 1798.83) for those companies’ direct 
        marketing purposes. California consumers who wish to request further information about the entities with which we have shared 
        their personal information, if any, should email us at privacyinquiry@interviewhelp.io.com and place "California Shine the 
        Light Request" in the subject line.`
    }
};

export const TrackSearchTypes = {
    CUSTOM_SEARCH: "CUSTOM_SEARCH",
    JOURNEY: "JOURNEY",
    TAGS: "TAGS"
}

export const TrackTags = [
    "Data engineering manager", "TPM", "SDE", "FAANG", "Google", "Amazon", "Behavior", "SDM", "Phone Screening", "System Design", "QA", "Job Opening", "Career Change", "Apply4U", "Digital Marketing", "Data Engineer", "Apple"
];

export const JourneySearchTypes = {
    MOCK_INTERVIEW: "MOCK_INTERVIEW"
}

export const JourneyList = [{
    text: "Confused about your career (Talk to an Expert)",
    val: ""
}, {
    text: "FAANG Interview Preparation",
    val: "FAANG_INTERVIEW"
}, {
    text: "Specific preparation (Coding Design behaviour)",
    val: ""
}, {
    text: "Want a Mock interview",
    val: "MOCK_INTERVIEW"
}, {
    text: "Have a phone screening interview",
    val: "PHONE_SCREEN_INTERVIEW"
}, {
    text: "Have a scheduled interview",
    val: ""
}, {
    text: "Help needed in applying for job",
    val: ""
}, {
    text: "Looking for placement",
    val: "PLACEMENT"
}];

export const productFilterSubLabels = {
    Company: "(Expert take interview for)",
    Level: "(Expert take interview for)",
    Location: "(Expert based out of)"
}

export const PriceFilterTypes = {
    key: "Price",
    selected: [],
    value: ["all", "0-100", "100-200", "300-1000"],
};

export const getRadioLabelByKey = {
    all: "All",
    "0-100": "$0-$100",
    "100-200": "$100-$200",
    "300-1000": "$300-Above",
};

export const CALENDLY_URL = 'https://calendly.com/rsalota1/30min';
export const formatCalendlyUrl = ({
    url,
    prefill = {},
    embedType,
  }) => {

    const {
      email,
      name,
    } = prefill;
  
  
    const queryStringIndex = url.indexOf("?");
    const hasQueryString = queryStringIndex > -1;
    const queryString = url.slice(queryStringIndex + 1);
    const baseUrl = hasQueryString ? url.slice(0, queryStringIndex) : url;
  
    const updatedQueryString = [
      hasQueryString ? queryString : null,
      name ? `name=${encodeURIComponent(name)}` : null,
      email ? `email=${encodeURIComponent(email)}` : null,
      embedType ? `embed_type=${embedType}` : null,
    ]
      .filter((item) => item !== null)
      .join("&");
  
    return `${baseUrl}?${updatedQueryString}`;
  };


export default constants;
