import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PrivacyPolicyTexts } from '../../utils/Constants';

const Wrapper = styled.div`
    margin-top: 80px;
    margin-left: 10%;
    margin-right: 10%;
    padding: 18px;
    font-size: 15px;
    line-height: 23px;

    .line-heading {
        font-size: 17px;
        font-weight: bold;
        color: rgb(44,62,80);
    }

    .list-square {
        list-style-type: square;
        margin-bottom: 5px;
    }
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 40px;
`;

const NoticeHeader = styled.div`
    font-size: 20px;
    font-weight: 600;    
    margin-bottom: 35px;
    text-decoration: underline;
    text-underline-position: under;
`;

const Intro = styled.div`
    margin-bottom: 36px;
    .para1 {
        margin-bottom: 20px;
    }
    .para2 {
        font-weight: 700;
    }
`;

const Heading = styled.div`
    font-size: 26px;
    margin-bottom: 20px;
    color: #1d69a5;
    font-weight: bold;
    line-height: 42px;
`;

const ParaWrapper = styled.div`
    margin-bottom: 20px;
`;

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <>
            <Wrapper>
                <Title>Privacy Policy</Title>
                <NoticeHeader>Our notice of privacy practices</NoticeHeader>
                <Intro>
                    <div className='para1'>{PrivacyPolicyTexts.heading1}</div>
                    <div className='para2'>{PrivacyPolicyTexts.heading2}</div>
                </Intro>
                <InformationCollection />
                <UseInformation />
                <ParagraphComponent heading={PrivacyPolicyTexts.socialMediaInteraction.heading} paragraph={PrivacyPolicyTexts.socialMediaInteraction.point} />
                <ParagraphComponent heading={'Interest-Based Advertising'} paragraph={PrivacyPolicyTexts.interestBasedAdvertising} />
                <ParagraphComponent heading={PrivacyPolicyTexts.informationYouShare.heading} paragraph={PrivacyPolicyTexts.informationYouShare.point} />
                <InformationWeShare />
                <YourChoices />
                <ParagraphComponent heading={PrivacyPolicyTexts.accessAndUpdateInfo.heading} paragraph={PrivacyPolicyTexts.accessAndUpdateInfo.point} />
                <ParagraphComponent heading={PrivacyPolicyTexts.children.heading} paragraph={PrivacyPolicyTexts.children.point} />
                <ParagraphComponent heading={PrivacyPolicyTexts.transferInfoConsent.heading} paragraph={PrivacyPolicyTexts.transferInfoConsent.point} />
                <ParagraphComponent heading={PrivacyPolicyTexts.dataSecurity.heading} paragraph={PrivacyPolicyTexts.dataSecurity.point} />
                <ParagraphComponent heading={PrivacyPolicyTexts.howToContact.heading} paragraph={PrivacyPolicyTexts.howToContact.paragraphs} />
                <CaliforniaPrivacyPolicy />
                <CCPARights />
                <LawAndRights />
            </Wrapper>
            
        </>
    )
};

const InformationCollection = () => (
    <ParaWrapper>
        <Heading>Information We Collect</Heading>
        {PrivacyPolicyTexts.informationCollection.map((collection) => {
            const info = collection.split(':');
            return (
                <BoldHeadingLine heading={info[0]} line={info[1]} divider={':'} marginRequired={true} />
            )
        })}
    </ParaWrapper>
);

const BoldHeadingLine = ({ heading, line, divider, marginRequired }) => {
    const headingText = divider ? `${heading}${divider} ` : heading;
    return (
        <div style={{ marginBottom: `${marginRequired ? '20px' : '0'}` }}>
            <span className='line-heading'>{headingText}</span>
            <span>{line}</span>
        </div>
    );
};

const UseInformation = () => (
    <ParaWrapper>
        <Heading>How We Use Your Information</Heading>
        <div>{PrivacyPolicyTexts.useInformation.heading}</div>
        <ul>
            {PrivacyPolicyTexts.useInformation.points.map((point) => (
                <li className='list-square'>{point}</li>
            ))}
        </ul>
        <div style={{ marginBottom: '15px' }}>{PrivacyPolicyTexts.useInformation.paragraphs[0]}</div>
        <div>{PrivacyPolicyTexts.useInformation.paragraphs[1]}</div>
    </ParaWrapper>
);

const InformationWeShare = () => (
    <ParaWrapper>
        <Heading>Information We Share</Heading>
        <div>{PrivacyPolicyTexts.informationWeShare.heading}</div>
        <ul>
            {PrivacyPolicyTexts.informationWeShare.points.map((pointObj) => (
                <li style={{ listStyleType: 'number', marginBottom: '5px' }}>
                    <BoldHeadingLine heading={pointObj.heading} line={pointObj.point} divider={'.'} marginRequired={false} />
                </li>
            ))}
        </ul>
        <div>{PrivacyPolicyTexts.informationWeShare.paragraphs[0]}</div>
    </ParaWrapper>
);

const ParagraphComponent = ({ heading, paragraph }) => {
    const isArray = paragraph.constructor === Array;
    return (
        <ParaWrapper>
            <Heading>{heading}</Heading>
            {isArray ? (
                paragraph.map((para) => (
                    <ParaWrapper>{para}</ParaWrapper>
                ))
            ) : (
                <div>{paragraph}</div>
            )}
        </ParaWrapper>
    );
};

const YourChoices = () => (
    <ParaWrapper>
        <Heading>{PrivacyPolicyTexts.yourChoices.heading}</Heading>
        {PrivacyPolicyTexts.yourChoices.points.map((pointObj) => {
            return (pointObj.point ? (
                <BoldHeadingLine heading={pointObj.heading} line={pointObj.point} divider={'.'} marginRequired={true} />
            ) : (
                pointObj.paragraphs.map((paragraph, index) => (
                    index === 0 ? (
                        <BoldHeadingLine heading={pointObj.heading} line={paragraph} divider={'.'} marginRequired={true} />
                    ) : (
                        <ParaWrapper>{paragraph}</ParaWrapper>
                    )
                ))
            ))
        })}
    </ParaWrapper>
);

const CaliforniaPrivacyPolicy = () => (
    <ParaWrapper>
        <Heading>{PrivacyPolicyTexts.californiaPrivacyPolicy.heading}</Heading>
        {PrivacyPolicyTexts.californiaPrivacyPolicy.paragraphs.map((pointObj) => (
            pointObj.heading ? (
                <BoldHeadingLine heading={pointObj.heading} line={pointObj.point} divider={'.'} marginRequired={true} />
            ) : (
                <ParaWrapper>{pointObj.point}</ParaWrapper>
            )
        ))}
        {PrivacyPolicyTexts.californiaPrivacyPolicy.topics.map((topic) => (
            <>
                {topic.point ? (
                    <BoldHeadingLine heading={topic.heading} line={topic.point} divider={'.'} />
                ) : (
                    <div className='line-heading'>{topic.heading}</div>
                )}
                <ul>
                    {topic.paragraphs.map((pointObj) => (
                        <li className='list-square'>
                            <BoldHeadingLine heading={pointObj.heading} line={pointObj.point} />
                        </li>
                    ))}
                </ul>
            </>
        ))}
    </ParaWrapper>
);

const CCPARights = () => (
    <ParaWrapper>
        <Heading>{PrivacyPolicyTexts.rightsCCPA.heading}</Heading>
        <ul>
            {PrivacyPolicyTexts.rightsCCPA.paragraphs.map((pointObj) => (
                <li className='list-square'>
                    <BoldHeadingLine heading={pointObj.heading} line={pointObj.point} marginRequired />
                    {pointObj.paragraphs && (
                        <ul>
                            {pointObj.paragraphs.map((innerPointObj) => (
                                <li className='list-square'>
                                    <BoldHeadingLine heading={innerPointObj.heading} line={innerPointObj.point} marginRequired />
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    </ParaWrapper>
);

const LawAndRights = () => (
    <>
        <ParaWrapper>
            <BoldHeadingLine heading={PrivacyPolicyTexts.rightsLimitations.heading} line={PrivacyPolicyTexts.rightsLimitations.point} />
        </ParaWrapper>
        <ParaWrapper>
            <BoldHeadingLine heading={PrivacyPolicyTexts.californiaLaw.heading} line={PrivacyPolicyTexts.californiaLaw.point} />
        </ParaWrapper>
    </>
)

export default PrivacyPolicy;