import React, { useEffect, useState, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { CardWrapper } from './JobsContainer';
import { CapabilitiesModal, CapabilityLink } from './CapabilitiesModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { JobCandidate } from 'types/Jobs';
import { CreateCandidate } from './CreateCandidate';
import { KeyboardBackspace } from '@styled-icons/material/KeyboardBackspace';
import { theme, messages } from '../constants';
import useJobDispatcher from 'containers/HiringManager/Jobs.util';
import { setRefetchCandidates, resetChangeNotification } from 'actions/hiringManager/jobs/jobsSlice';
import { ConfirmationModal, ConfirmationProps } from './ConfirmationModal';
import { ChevronDoubleRight } from '@styled-icons/bootstrap/ChevronDoubleRight';
import { ToastNotification } from './ToastNotification';
import { API_STATUSES, BASE_PORTAL_URL, DEFAULT_TOKEN } from 'utilities/constants';
import { candidateService } from 'services/candidate';
import { buildUrlWithParams } from 'utilities/commonUtils';
import { toast } from 'react-toastify';
import { StarBadgeIcon, CheckPerformanceIcon, InterviewRequestIcon, FinaliseIcon, RejectIcon } from '../../../assets';
import { setValueBrowserStorage, getValueBrowserStorage } from '../../../services/browserStorageService';
import {
    JobCandidatesWrapper,
    TypeWrapper,
    NavButtonContainer,
    NavButton,
    CandidatesButton,
    CandidateCardsContainer,
    ProgressBar,
    ProgressBarItem,
    InterviewActionButton,
    InterviewActionButtonWrapper,
    LogoImage
} from './Jobs.styled';

type Props = {
    setShowJobCandidates: React.Dispatch<React.SetStateAction<boolean>>;
    jobId: string;
};

const jobsContext = React.createContext<{ showNewImprovedUI?: boolean }>({});

export const JobCandidates = ({ setShowJobCandidates, jobId }: Props) => {
    const {
        jobs: {
            changeNotification,
            vettedCandidates,
            talentPoolCandidates,
            interviewRequestCandidates,
            rejectedCandidates,
            finalizeCandidates,
            refetchCandidates
        },
        auth: { user: { expertId } }
    } = useSelector((state: RootState) => ({ jobs: state.jobs, auth: state.auth }));
    const { getJobCandidates } = useJobDispatcher();
    const dispatch = useDispatch();
    const [showNotification, setShowNotification] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState<string>('');

    useEffect(() => {
        if (refetchCandidates) {
            getJobCandidates({ jobId });
            dispatch(setRefetchCandidates({ refetchCandidates: false }));
        }
    });

    useEffect(() => {
        if (changeNotification.show && changeNotification.status) {
            setNotificationStatus(changeNotification.status)
            setShowNotification(true);
            dispatch(resetChangeNotification());
        }
    }, [changeNotification, refetchCandidates]);

    return (
        <jobsContext.Provider value={{}}>
            <Nav setShowJobCandidates={setShowJobCandidates} />
            <JobCandidatesWrapper className='job-candidates-wrapper' isMobile={isMobile}>
                <TalentPoolType cards={[...talentPoolCandidates, ...vettedCandidates]} jobId={jobId} expertId={expertId} />
                <VettedType cards={vettedCandidates} jobId={jobId} expertId={expertId} />
                <InteviewType cards={interviewRequestCandidates} jobId={jobId} expertId={expertId} />
                <TypeWrapper bg={theme.colors.FINALIZED} isMobile={isMobile}>
                    <CandidateCardsList level={4} title='Finalized Candidates' cards={finalizeCandidates} expertId={expertId} />
                </TypeWrapper>
                <TypeWrapper mr={0} bg={theme.colors.REJECTED} isMobile={isMobile}>
                    <CandidateCardsList level={-1} title='Rejected Candidates' cards={rejectedCandidates} expertId={expertId} />
                </TypeWrapper>
            </JobCandidatesWrapper>
            {showNotification &&
                <ToastNotification show={showNotification} setShow={setShowNotification} status={notificationStatus} />
            }
        </jobsContext.Provider>
    )
};

const TalentPoolType = ({ cards, jobId, expertId }: { cards: JobCandidate[], jobId: string, expertId: string }) => {
    const [showCreateCandidate, setShowCreateCandidate] = useState<boolean>(false);

    const handleCreateCandidate = () => {
        setShowCreateCandidate(true);
    }

    const talentPoolProps = {
        isTalentPool: true,
        createCandidate: handleCreateCandidate
    };

    return (
        <TypeWrapper bg={theme.colors.TALENT_POOL} isMobile={isMobile}>
            <CandidateCardsList level={1} talentPoolProps={talentPoolProps} title='Talent Pool' cards={cards} expertId={expertId} />
            {showCreateCandidate && (
                <CreateCandidate setShowCreateCandidate={setShowCreateCandidate} jobId={jobId} />
            )}
        </TypeWrapper>
    );
};

const VettedType = ({ cards, jobId, expertId }: { cards: JobCandidate[], jobId: string, expertId: string }) => {
    const { changeCandidateStatus } = useJobDispatcher();

    const handleSendInterviewRequest = (candidateId: string) => {
        changeCandidateStatus({ candidateId, jobId, status: 'INTERVIEW_REQUEST' })
    };

    const vettedProps = {
        isVetted: true,
        sendInterviewRequest: handleSendInterviewRequest
    };

    return (
        <TypeWrapper bg={theme.colors.VETTED} isMobile={isMobile}>
            <CandidateCardsList vettedProps={vettedProps} level={2} title='Vetted Candidates' cards={cards} expertId={expertId} />
        </TypeWrapper>
    );
};

const InteviewType = ({ cards, jobId, expertId }: { cards: JobCandidate[], jobId: string, expertId: string }) => {
    const { changeCandidateStatus } = useJobDispatcher();

    const sendReminder = (candidateId: string) => {
        changeCandidateStatus({ candidateId, jobId, status: 'REMINDER' });
    };

    const onFinalise = (candidateId: string) => {
        changeCandidateStatus({ candidateId, jobId, status: 'FINALIZED_CANDIDATE' });
    };

    const onReject = (candidateId: string) => {
        changeCandidateStatus({ candidateId, jobId, status: 'REJECTED_CANDIDATE' });
    };

    const interviewProps = {
        onFinalise,
        onReject,
        sendReminder,
        isInterview: true,
    };

    return (
        <TypeWrapper bg={theme.colors.INTERVIEW} isMobile={isMobile}>
            <CandidateCardsList interviewProps={interviewProps} level={3} title='Interview' cards={cards} expertId={expertId} />
        </TypeWrapper>
    );
};

type TalentPoolProps = {
    isTalentPool: boolean;
    createCandidate: () => void;
}

type InterviewProps = {
    isInterview: boolean;
    sendReminder: (candidateId: string) => void;
    onFinalise: (candidateId: string) => void;
    onReject: (candidateId: string) => void;
}

type VettedProps = {
    isVetted: boolean;
    sendInterviewRequest: (candidateId: string) => void;
}

type CandidateCardsListType = {
    title: string;
    cards: JobCandidate[];
    talentPoolProps?: TalentPoolProps;
    vettedProps?: VettedProps;
    interviewProps?: InterviewProps;
    level: number;
    expertId: string;
};

const CandidateCardsList = ({ title, cards, talentPoolProps, vettedProps, interviewProps, level, expertId }: CandidateCardsListType) => {
    return (
        <div>
            <ProgressBar>
                {Array.from(Array(4).keys()).map((o, index) => {
                    const colorCode = index + 1 <= level ? `PROGRESS_0${index + 1}` : `PROGRESS_00`;
                    return <ProgressBarItem className='progress-bar-item' bg={theme.colors[colorCode]} />
                })}
            </ProgressBar>
            <div className='font-weight-bold d-flex justify-content-between'>
                <div className='font-weight-bold selection-title' style={{ fontSize: '18px' }}>{title}</div>
                <div>{cards.length}</div>
            </div>
            <CandidateCardsContainer>
                {talentPoolProps?.isTalentPool && (
                    <CandidatesButton mb={20} variant='primary' onClick={talentPoolProps?.createCandidate}>
                        Add Candidate
                    </CandidatesButton>
                )}
                {cards.map(card => {
                    let borderColor;
                    const showBadge = card.status === 'VETTED_CANDIDATE';
                    if (talentPoolProps?.isTalentPool) {
                        borderColor = card.status === 'VETTED_CANDIDATE' ? '#F2C94C' : '#009D9A';
                    }

                    return (
                        <CandidateCard borderColor={borderColor} showBadge={showBadge} {...card} expertId={expertId} vettedProps={vettedProps} interviewProps={interviewProps} />
                    )
                })}
            </CandidateCardsContainer>
        </div>
    )
};

type CandidateCardProps = {
    vettedProps?: VettedProps;
    interviewProps?: InterviewProps;
    borderColor?: string;
    showBadge?: boolean;
    expertId: string;
} & JobCandidate;

const CandidateCard = ({ attributes = [], secondaryAttributes, email, fullname, vettedProps, interviewProps, candidateId, candidateTrackId: trackId, borderColor, showBadge, expertId }: CandidateCardProps) => {
    const [showCapabilites, setShowCapabilites] = useState<boolean>(false);
    const [confirmationProps, setConfirmationProps] = useState<ConfirmationProps>();
    const handleShowCapabilities = () => setShowCapabilites(true);
    const handleHideCapabilities = () => setShowCapabilites(false);
    const { showNewImprovedUI } = useContext(jobsContext);

    const handleViewPerformance = async () => {
        if (candidateId !== '' && trackId !== '') {
            const response = await candidateService.getCandidateAuthorizationToken({ expertId, token: DEFAULT_TOKEN, candidateId });
            if (response.apiStatus === API_STATUSES.SUCCESS) {
                const { authorizationToken: token } = response.output;
                let urlParams = {
                    candidateId,
                    trackid: trackId,
                    authorizationToken: token,
                    lpflowtype: "enroll"
                }
                const url = buildUrlWithParams(BASE_PORTAL_URL, urlParams);
                window.open(url);
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    const handleButtonClick = (successHandler: (candidateId: string) => void, buttonText: string) => {
        const onReject = () => {
            setConfirmationProps({
                show: false,
            });
        }

        const onSuccess = () => {
            successHandler(candidateId);
            setConfirmationProps({
                show: false,
            });
        }

        const confirmationProps: ConfirmationProps = {
            onReject,
            onSuccess,
            buttonText,
            candidateName: fullname,
            show: false
        }

        setConfirmationProps({
            ...confirmationProps,
            show: true
        });
    }

    return (
        <CardWrapper borderTop={borderColor} className='mr-0' style={{ padding: '20px 12px' }}>
            {showBadge &&
                <LogoImage style={{ position: 'absolute', top: '4px', right: '0', width: '20px' }} src={StarBadgeIcon} />
            }
            <div style={{ fontSize: '16px' }}>
                <span style={{ color: '#6F6F6F' }}>Name:&nbsp;</span>
                <span className='font-weight-bold'>{fullname}</span>
            </div>
            <div style={{ width: '100%' }}>
                <CapabilityLink>
                    <div onClick={handleShowCapabilities}>
                        View Capabilities
                        <ChevronDoubleRight />
                    </div>
                </CapabilityLink>
            </div>
            {showNewImprovedUI ?
                <div className='d-flex'>
                    <LogoImage onClick={() => handleViewPerformance()} src={CheckPerformanceIcon} />
                    {vettedProps?.isVetted &&
                        <LogoImage onClick={() => handleButtonClick(vettedProps?.sendInterviewRequest, messages.SEND_INTERVIEW_REQUEST)} src={InterviewRequestIcon} />
                    }
                    {interviewProps?.isInterview && (
                        <>
                            <LogoImage onClick={() => handleButtonClick(interviewProps?.sendReminder, messages.SEND_REMINDER)} src={InterviewRequestIcon} />
                            <LogoImage onClick={() => handleButtonClick(interviewProps?.onFinalise, messages.FINALISE)} src={FinaliseIcon} />
                            <LogoImage onClick={() => handleButtonClick(interviewProps?.onReject, messages.REJECT)} src={RejectIcon} />
                        </>
                    )}
                </div> :
                (<>
                    <div style={{ width: '100%' }}>
                        <CandidatesButton mb={0} mt={10} variant='primary' onClick={() => handleViewPerformance()}>
                            {messages.VIEW_CANDIDATE_PERFORMANCE}
                        </CandidatesButton>
                    </div>
                    {vettedProps?.isVetted && (
                        <div style={{ width: '100%' }}>
                            <CandidatesButton mt={10} mb={0} variant='secondary' onClick={() => handleButtonClick(vettedProps?.sendInterviewRequest, messages.SEND_INTERVIEW_REQUEST)}>
                                {messages.SEND_INTERVIEW_REQUEST}
                            </CandidatesButton>
                        </div>
                    )}
                    {interviewProps?.isInterview && (
                        <>
                            <div style={{ width: '100%', justifyContent: 'center' }}>
                                <CandidatesButton mt={10} mb={0} variant='secondary' onClick={() => handleButtonClick(interviewProps?.sendReminder, messages.SEND_REMINDER)}>
                                    {messages.SEND_REMINDER}
                                </CandidatesButton>
                            </div>
                            <InterviewActionButtonWrapper>
                                <InterviewActionButton onClick={() => handleButtonClick(interviewProps?.onFinalise, messages.FINALISE)} bg={theme.colors.FINALISE}>
                                    {messages.FINALISE}
                                </InterviewActionButton>
                                <InterviewActionButton onClick={() => handleButtonClick(interviewProps?.onReject, messages.REJECT)} bg={theme.colors.REJECT}>
                                    {messages.REJECT}
                                </InterviewActionButton>
                            </InterviewActionButtonWrapper>
                        </>
                    )}
                </>)
            }
            {showCapabilites && (
                <CapabilitiesModal
                    showScore
                    name={fullname}
                    attributes={attributes}
                    secondaryAttributes={secondaryAttributes}
                    show={showCapabilites}
                    handleClose={handleHideCapabilities}
                    dialogClassName={`candidates-capabilities-dialog-${isMobile && 'mobile'}`}
                />
            )}
            {confirmationProps?.show && (
                <ConfirmationModal {...confirmationProps} />
            )}
        </CardWrapper>
    )
}

type NavProps = {
} & Pick<Props, "setShowJobCandidates">;

const Nav = ({ setShowJobCandidates }: NavProps) => {
    return (
        <NavButtonContainer>
            <NavButton onClick={() => setShowJobCandidates(false)}>
                <KeyboardBackspace />
                Back
            </NavButton>
        </NavButtonContainer>
    );
};