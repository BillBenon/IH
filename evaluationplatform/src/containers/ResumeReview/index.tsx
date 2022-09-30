import { CheckSquare, Speedometer2, Square } from "@styled-icons/bootstrap";
import { Download } from '@styled-icons/boxicons-regular';
import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";
import { IconContainer } from 'components/Common/IconContainer';
import { AwsUploader } from 'components/Uploader/AwsUploader';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { evaluationPlatformService } from "services";
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import { downloadFile, getFolderPathAfterDomainName, removeUnwantedTextFromFileName } from "utilities/commonUtils";
import "./index.css";
const { AffindaCredential, AffindaAPI } = require("@affinda/affinda");

const credential = new AffindaCredential("8d2e0a31e9049d9f501237726344eb26dbd76b91")
const client = new AffindaAPI(credential)

type ResumeReviewProps = {
    resumeUrl?: string,
    setResumeUrl?: Function,
    onResumeParse?: Function
}

export const ResumeReview = (props: ResumeReviewProps) => {
    const { resumeUrl, setResumeUrl } = props;
    const { candidate } = useSelector((state: RootState) => state.evaluationPlatform);
    const [s3Objs, setS3Objs] = useState<any[]>([]);
    const trackId = useSelector((state: RootState) => state.payment.trackId);
    const candidateTrackId = candidate?.lastCandidateSavedSetting?.lastCandidateTrackIDWorkedOn;
    const attachmentsDir = `${(getValueBrowserStorage('candidateId') as string)}/Resumes/${trackId}`;
    const attachmentsDirForResumes = `${(getValueBrowserStorage('candidateId') as string)}/Resumes`;

    const handleImageUpload = (url: string) => {
        getQuestionAttachments(url);
    };

    const handleAttachmentRemove = (name: string) => {
        evaluationPlatformService.deleteS3File({ candidateTrackId, path: getFolderPathAfterDomainName(name) })
            .then(res => console.log("File removed"))
            .catch(err => console.log('Unable to remove object', err))
            .finally(() => getQuestionAttachments())
    }

    const getQuestionAttachments = (selectedResumeUrl?: string) => {
        const objs: any = [];
        evaluationPlatformService.getS3FolderFiles({ candidateTrackId, path: attachmentsDirForResumes })
            .then((res) => {
                res.output.files?.map((val: any) => objs.push(val));
                const trackIdList: string[] = [];
                objs.map((val: any) => trackIdList.push(getFolderPathAfterDomainName(val)?.split("/")[2]));
                evaluationPlatformService.getTrackTitles({ candidateTrackId, trackIds: trackIdList }).then(
                    (res: any) => {
                        const trackIdToTrackNameMapper: { [trackId: string]: string } = {};
                        res.output.tracks?.map((val: any) => trackIdToTrackNameMapper[val.trackId] = val.title);
                        const groupedResumes = objs.reduce((r: any, a: any) => {
                            const trackName = trackIdToTrackNameMapper[getFolderPathAfterDomainName(a)?.split("/")[2]] || 'Others';
                            r[trackName] = [...r[trackName] || [], a];
                            return r;
                        }, {});
                        setS3Objs(groupedResumes);
                        if (selectedResumeUrl) {
                            const arr = selectedResumeUrl.split("/");
                            arr[arr.length - 1] = arr[arr.length - 1].replace(/ /g, '');
                            setResumeUrl && setResumeUrl(getFolderPathAfterDomainName(arr.join('/')));
                        }
                    })
            }).catch((err) => {
                console.log('failed loading attachments from aws', err);
            })
    }

    const onCheckResumeScore = (url: string) => {
        client.getResume("ZVeWggNm").then((result: any) => {
            props.onResumeParse && props.onResumeParse(result.data)
        }).catch((err: any) => {
            console.log("An error occurred:");
            console.error(err);
        });
    }

    useEffect(() => {
        getQuestionAttachments();
    }, [attachmentsDir])

    const getResumeFromS3 = (url: string) => {
        let folderPath = getFolderPathAfterDomainName(url);
        evaluationPlatformService.getSignedURLToGETFile({ candidateTrackId, path: folderPath })
            .then(res => {
                downloadFile(res.output.url);
            })
    }

    return (
        <div>
            <AwsUploader
                onUpload={handleImageUpload}
                directory={attachmentsDir}
                candidateTrackId={candidate?.lastCandidateSavedSetting?.lastCandidateTrackIDWorkedOn}
            />
            <div className="mt-3">
                {Object.keys(s3Objs)?.map((r: any, rIndex: number) => {
                    return <div className="col-lg-12 col-xxl-4 my-2" key={rIndex + r}>
                        <div className="card h-100">
                            <div className="card-body p-9">
                                <div className="font-weight-bold mb-4">{r}</div>
                                {s3Objs[r]?.map((obj: any, index: number) => {
                                    const resumeLink = obj;
                                    return <div className="fs-6 d-flex justify-content-between mb-3" key={resumeLink + index}>
                                        {<div className="d-flex">
                                            {setResumeUrl && resumeUrl !== getFolderPathAfterDomainName(resumeLink) &&
                                                <IconContainer className={"mr-3"} icon={Square} onClick={() => setResumeUrl(getFolderPathAfterDomainName(resumeLink))} />}
                                            {setResumeUrl && resumeUrl === getFolderPathAfterDomainName(resumeLink) &&
                                                <IconContainer className={"mr-3"} icon={CheckSquare} onClick={() => setResumeUrl(null)} />}
                                            <div className="fw-bold">{removeUnwantedTextFromFileName(obj)}</div>
                                        </div>}
                                        <div className="d-flex fw-bolder">
                                            <a onClick={() => getResumeFromS3(resumeLink)}><IconContainer icon={Download} /></a>
                                            <IconContainer icon={CircleWithCross} color={'red'} onClick={() => handleAttachmentRemove(obj)} />
                                            {false && <IconContainer tooltip={'Get your resume score'} icon={Speedometer2} onClick={() => onCheckResumeScore(resumeLink)} />}
                                        </div>
                                    </div>
                                }
                                )}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
