import Rating from '@material-ui/lab/Rating';
import { Info, PenSquare, Upload } from "@styled-icons/fa-solid";
import { AlertIconOriginal, FeedbackReceivedIcon } from 'assets';
import { IconContainer } from 'components/Common/IconContainer';
import { ModalComponent } from 'components/Common/Modal/Modal';
import { ResumeReview } from 'containers/ResumeReview';
import { TalkToExpertPages } from 'containers/TalkToExpert';
import { IFocussedModule } from 'containers/TalkToExpert/meetingTypes';
import { ModuleSelectionComponent } from 'containers/TalkToExpert/moduleSelectionComponent';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { talkToExpertService } from 'services/talkToExpert';
import { RootState } from 'store';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { downloadFile, getFileNameFromURL, removeUnwantedTextFromFileName } from 'utilities/commonUtils';
import { Candidate_Track_Id, DEFAULT_TOKEN, Entity, FeedBackStatus, MENUS } from 'utilities/constants';
import { useLoader } from 'context/loaderDots';
import { getNotificationMsg } from 'store/evaluationPlatform';
import { evaluationPlatformService } from 'services';
import axios from 'axios';
import { getValueBrowserStorage } from 'services/browserStorageService';

const Styledfeedback = styled.img`
  margin-left: -24px;
  margin-top: -5px;
  width: 20px;
  height: auto;
`

const Main = styled.div<any>`
    .meeting-details {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;

        & .detail {
            text-align: left;
            margin-bottom: 1rem;
            width:25%;
        }

        & .detail:nth-of-type(4n) {
            margin-right: 0;	
        }
        
        & .detail:nth-of-type(4n+1) {
            margin-left: 0;	
        }
        * .textWrapper {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

const MeetingCard = styled(Container)`
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin: 10px 0;
    padding: 1rem;
    min-width: 100%;
    @media (min-width: 1200px) {
        max-width: 1190px;
    }
    @media (min-width: 1300px) {
        max-width: 1290px;
    }
`;

const MeetingModulesWrapper = styled.div<any>`
  height: 100px;
`;

const Warning = ({ message }: any) => (
    <div className="text--left ml--20 pt--10">
        <small><img src={AlertIconOriginal} width="33px" /><i className="gray">{message}</i></small>
    </div>
);

function ScheduledMeetings(props: IProps) {
    const history = useHistory();
    const loader = useLoader();
    const [meetingDetailId, setMeetingDetailId] = useState<string | undefined>();
    const { candidate } = useSelector((state: RootState) => state.evaluationPlatform);
    const { loadingMeetings } = useSelector((state: RootState) => state.talkToExpert);
    const { trackId } = useSelector((state: RootState) => state.payment);
    const [focusedModules, setFocussedModules] = useState<any>();
    const [isResumeReviewOpen, setIsResumeReviewOpen] = useState<boolean>(false);
    const [resumeUrl, setResumeUrl] = useState<string | undefined>();
    const [resumeLoading, showResumeLoading] = useState<boolean>(false);
    const [mmLoading, setMMLoading] = useState<boolean>(false);
    const [showMeetingModulesModal, setShowMeetingModulesModal] = useState<boolean>(false);
    const [showMeetingConfirmationMessage, setShowMeetingConfirmationMessage] = useState<boolean>(false);
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const dispatch = useDispatch();

    const onUpload = (meetingDetailId: string, resumeUrl?: string) => {
        setMeetingDetailId(meetingDetailId);
        setIsResumeReviewOpen(true);
        resumeUrl && setResumeUrl(resumeUrl);
    }

    const handleViewExpert = (meeting: any) => {
        evaluationPlatformService.candidateViewedMeetingFeedback({
            "meetingDetailId": meeting.id, "token": DEFAULT_TOKEN
        }).then(() => {
            dispatch(getNotificationMsg({ "menu": MENUS.MOCK_AND_COACHING, "trackId": trackId }));
        })
        history.push(`?meetingDetailId=${meeting.id}`)
    }

    const handleResumeSubmit = async () => {
        const payload = {
            token: DEFAULT_TOKEN,
            meetingDetailId,
            resumeUrl
        };
        showResumeLoading(true);
        await talkToExpertService.updateMeetingInfo(payload);
        showResumeLoading(false);
        setMeetingDetailId(undefined);
        setIsResumeReviewOpen(false);
        props.getMeetings && props.getMeetings("UPCOMING");
    }

    const getResumeFromS3 = (url: string) => {
        const candidateTrackId = getValueBrowserStorage(Candidate_Track_Id); evaluationPlatformService.getSignedURLToGETFile({
            candidateTrackId: candidateTrackId ? candidateTrackId : '',
            path: url
        }).then(res => {
            downloadFile(res.output.url);
        })
    }

    const renderValues = (info: any, meeting: any) => {
        let value;
        if (info.type === "rating") {
            value = <div className="d-flex align-items-start">
                <Rating
                    name="rating"
                    value={info.value}
                    disabled={true}
                />
                {info.tooltip && <IconContainer className="ml-3" popoverTitle='Your Comments' popoverContent={info.tooltip} icon={Info} />}
            </div>
        }
        else if (info.type === "link") {
            if (info.label === "Resume Link") {
                value = <a rel="noopener noreferrer" href="#" onClick={() => getResumeFromS3(info.value)} className="textWrapper d-block mr-2"><small>{info.nameOnly ? getFileNameFromURL(info.value) : info.value}</small></a>
            } else {
                value = <a target="_blank" rel="noopener noreferrer" href={info.value} className="textWrapper d-block mr-2"><small>{info.nameOnly ? getFileNameFromURL(info.value) : info.value}</small></a>
            }
        }
        else if (info.type === "resume-upload") {
            value = <div className="d-flex align-items-center">
                <a rel="noopener noreferrer" href='#' onClick={() => getResumeFromS3(info.value)} className="textWrapper d-block mr-2">
                    <small>{info.nameOnly ? removeUnwantedTextFromFileName(info.value) : info.value}</small>
                </a>
                <IconContainer onClick={() => onUpload(meeting.id, info.value)} tooltip="Change resume" className="ml-3" icon={PenSquare} />
            </div>
        }
        else {
            value = <div className="textWrapper"><small dangerouslySetInnerHTML={{ __html: info.value }}></small></div>
        }
        return <div className="d-flex align-items-center">
            {value}
            {(info.type === "upload" && props.meetingType === ('' + TalkToExpertPages.UMeetings)) && <IconContainer onClick={() => onUpload(meeting.id)} tooltip="Upload your resume" className="ml-3" icon={Upload} />}
        </div>
    }

    const renderSaving = (meeting: any) => {
        return props.saving && meeting.id === props.updatingMeetingId
            ? <div className="text--center text--grey text--12 text--bold pb--10">{'Saving...'}</div>
            : null
    }

    const onEditModules = (focussedModules: IFocussedModule[], meetingId: string) => {
        setShowMeetingModulesModal(true);
        setMeetingDetailId(meetingId);
        const keys = getTreeCheckedKeys(focussedModules);
        setCheckedKeys(keys);
    }

    const handleFMSubmit = async () => {
        const payload = {
            token: DEFAULT_TOKEN,
            meetingDetailId,
            focusedModules
        };
        setMMLoading(true);
        await talkToExpertService.updateMeetingInfo(payload);
        setMMLoading(false);
        setMeetingDetailId(undefined);
        setShowMeetingModulesModal(false);
        props.getMeetings && props.getMeetings("UPCOMING");
    }

    const getTreeCheckedKeys = (treeData: IFocussedModule[]) => {
        const keys: string[] = [];
        for (let i = 0; i < treeData.length; i++) {
            const cat = treeData[i];
            for (let j = 0; j < cat.children.length; j++) {
                const subcat = cat.children[j];
                for (let k = 0; k < subcat.children.length; k++) {
                    const cap = subcat.children[k];
                    keys.push(cat.entityId + "-" + cat.entity + "-" + subcat.entityId + "-" + subcat.entity + "-" + cap.entityId + "-" + cap.entity)
                }
            }
        }
        return keys;
    }

    const canEditFocusedModule = (focussedModules: IFocussedModule[]) => {
        const canEdit = focussedModules.some(cat => cat.children.some(subcat => subcat.children.some(cap => !!cap.children?.length)));
        return !canEdit;
    }

    const renderMeetingModules = (label: string, focussedModules: IFocussedModule[], meetingId: string) => {
        return <MeetingModulesWrapper className="mb-3">
            <div className="d-flex align-items-center justify-content-between"><div><b>{label}</b></div> {canEditFocusedModule(focussedModules) && props.meetingType === ('' + TalkToExpertPages.UMeetings) && <IconContainer onClick={() => onEditModules(focussedModules, meetingId)} tooltip="Change Meeting Modules" className="ml-3" icon={PenSquare} />}</div>
            <div className="overflow-auto" style={{height: "80%"}}>
                {focussedModules.map(cat => cat.children.map(subcat => subcat.children.map(cap => <span className='w-100 d-flex mb-1 border-bottom'>{cat.entityTitle + " | " + subcat.entityTitle + " | " + cap.entityTitle}</span>)))}
          </div>
        </MeetingModulesWrapper>
    }

    const renderModuleSelectionComponent = useMemo(() => <ModuleSelectionComponent
        checkedKeys={checkedKeys}
        onCheck={data => setFocussedModules(data)}
    />, [checkedKeys])

    useEffect(() => {
        if (showMeetingConfirmationMessage) {
            setTimeout(() => {
                setShowMeetingConfirmationMessage(false);
            }, 15000)
        }
    }, [showMeetingConfirmationMessage])

    useEffect(() => {
        if (loadingMeetings) {
            loader.showLoader();
        } else {
            loader.hideLoader();
        }
    }, [loadingMeetings])

    return (
        <Main>
            {props.meetings.map((meeting, ind) => {
                return (
                    <div key={meeting.id} className="d-flex align-items-start">
                        {meeting.feedbackStatus && meeting.feedbackStatus === FeedBackStatus.expertGivesFeedBack &&
                            <span title="Feedback Received"><Styledfeedback src={FeedbackReceivedIcon} /></span>
                        }
                        <div>
                            {showMeetingConfirmationMessage && <div className="text-success small">{`Your message has been sent successfully`}</div>}
                            <MeetingCard key={'meeting' + ind} id={'meeting' + meeting.id} className="mt-2">
                                {notEmpty(meeting.zoomMeetingId) ? null : <Warning message={meeting.remarks} />}
                                <div className="meeting-details">
                                    {meeting.details.map((info: any, ind: number) => {
                                        let Comp = null;
                                        if (info.component) Comp = info.component;
                                        return (info.label && notEmpty(info.value)) ? (
                                            <div key={info.label} className={info.fullwidth ? "w-100 text-left" : "detail"}>
                                                <div><b>{info.label}</b></div>
                                                {renderValues(info, meeting)}
                                            </div>
                                        ) : Comp && <Comp key={ind} onCTASuccess={() => { setShowMeetingConfirmationMessage(true); }} value={info.value} onChange={props.RTOnChange} meetingDetails={meeting} getMeeting={props.getMeetings} >{renderSaving(meeting)} </Comp>
                                    })
                                    }
                                    {meeting?.focusedModules && renderMeetingModules("Meeting Modules", meeting.focusedModules, meeting.id)}
                                    {meeting.showFeedbackBtn && <div className="col-12 text-right"><Button className="btn-sm" onClick={() => handleViewExpert(meeting)}>{'View Expert Feedback'}</Button></div>}
                                </div>
                            </MeetingCard>
                        </div>
                    </div>
                )
            })}
            {meetingDetailId && <ModalComponent
                handleClose={() => setIsResumeReviewOpen(false)}
                show={isResumeReviewOpen}
                footer={
                    <div>
                        <Button type="button" onClick={handleResumeSubmit}>{resumeLoading && (
                            <Spinner
                                className="mr-2"
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}{'Continue'}</Button>
                    </div>
                }
            >
                <div>
                    <div className="h5 m-3 text-center">
                        <span>{'Select Resume'}</span>
                    </div>
                    <ResumeReview resumeUrl={resumeUrl} setResumeUrl={setResumeUrl} />
                </div>
            </ModalComponent>}
            {showMeetingModulesModal && <ModalComponent
                handleClose={() => setShowMeetingModulesModal(false)}
                show={showMeetingModulesModal}
                footer={
                    <div>
                        <Button type="button" variant="secondary" className="mx-2" onClick={() => setShowMeetingModulesModal(false)}>{'Close'}</Button>
                        <Button type="button" onClick={handleFMSubmit}>{mmLoading && (
                            <Spinner
                                className="mr-2"
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}{'Submit'}</Button>
                    </div>
                }
            >
                <>
                    {renderModuleSelectionComponent}
                </>
            </ModalComponent>}
        </Main>
    );
}

interface IProps {
    meetingType?: string
    meetings: any[];
    RTOnChange: (value: any, source: any, id: string, zoomMeetingId: string) => void;
    saving: boolean;
    updatingMeetingId: string;
    getMeetings?: (meetingType: "PAST" | "UPCOMING") => void;
}

export default ScheduledMeetings;