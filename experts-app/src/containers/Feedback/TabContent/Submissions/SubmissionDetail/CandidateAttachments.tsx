import React, { useState, useEffect } from 'react';
import { Download } from 'styled-icons/boxicons-solid';
import { IconContainer } from '../../../../../components/Common/IconContainer/IconContainer';
import { candidateService } from 'services/candidate';
import { downloadFile, getFolderPathAfterDomainName } from 'utilities/commonUtils';

type CandidateAttachmentsProps = {
    candidateId: string;
    capabilityId: string;
    questionId: string;
    expertId: string;
    version: number | string;
};

type AttachmentPickerObject = {
    label: string;
    id: string;
    background: string;
};

export const CandidateAttachments = (props: CandidateAttachmentsProps) => {
    const [attachments, setAttachments] = useState<AttachmentPickerObject[]>([]);
    const { candidateId, capabilityId, questionId } = props;
    const attachmentsDir = candidateId + "/" + capabilityId + "/" + questionId + "/attachment/v" + props.version;   

    const getQuestionAttachments = () => {
        const files: any = [];
        candidateService.getS3FolderFiles({
            expertId: props.expertId, path: attachmentsDir ? attachmentsDir : ''
        }).then(res => {
            res.output.files.map((url: string, index: number) => {
                if (!url.includes("~audio~") && !url.includes("~video~")) {
                    files.push({
                        label: '' + files.length,
                        id: url + index,
                        background: url,
                    });
                }
            })
            setAttachments([...files]);
        }).catch(e => {
            console.log('failed loading attachments from aws', e);
        })
    }


    const getFileNameFromURL = (url: string) => {
        if (url) {
            var m = url.toString().match(/.*\/(.+?)\./);
            if (m && m.length > 1) {
                return decodeURIComponent(m[1]);
            }
        }
        return "";
    }

    const itemsJSX = attachments.map((section: any, index: number) => {
        return <li>
            <div className='d-flex align-items-center py-1'>
                <span className="mr-1">{getFileNameFromURL(section.background)}</span>
                <a href="#" onClick={() => (getResumeFromS3(section.background))}><IconContainer icon={Download} /></a>
            </div>
        </li>
    });

    useEffect(() => {
        getQuestionAttachments();
    }, [])

    const getResumeFromS3 = (url: string) => {
        candidateService.getSignedURLToGETFile({
            expertId: props.expertId,
            path: getFolderPathAfterDomainName(url)
        }).then(res => {
            downloadFile(res.output.url);
        })
    }

    return (
        <div className="w-40">
            <div className="h6">
                <span>{'Your Attachments'}</span>
            </div>
            {(attachments && attachments.length) ? <ul>
                {itemsJSX}
            </ul> : <span className='text-muted small'>{'No files available'}</span>}
        </div>
    );
};