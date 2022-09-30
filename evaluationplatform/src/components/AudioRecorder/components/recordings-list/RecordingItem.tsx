import React, { RefObject, useRef, useState } from 'react'
import { TrashAlt } from "@styled-icons/fa-regular";
import { UndoAlt } from "@styled-icons/fa-solid";
import "./styles.css";
import { evaluationPlatformService } from 'services';
import { getFolderPathAfterDomainName } from 'utilities/commonUtils';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { Candidate_Track_Id } from 'utilities/constants';

interface RecordingItem {
    isDeleted?: boolean;
    audio?: string;
    video?: string;
    recordKey: string;
    onDelete?: (key: string) => void;
    undoDelete?: (key: string) => void;
}

const RecordingItem = ({ isDeleted, audio, video, onDelete, undoDelete, recordKey }: RecordingItem) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [audioUrl, setAudioUrl] = useState(audio);
    const [videoUrl, setVideoUrl] = useState(video);
    
    const candidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
    
    const updateSrc = (url: string, setUrl: Function, eleRef: RefObject<HTMLAudioElement> | RefObject<HTMLVideoElement>) => {
        let folderPath = getFolderPathAfterDomainName(url);
        evaluationPlatformService.getSignedURLToGETFile({ candidateTrackId: candidateTrackId ? candidateTrackId : '', path: folderPath })
            .then(res => {
                setUrl(res.output.url);
            })
    }

    return (
        <div className={"record " + (isDeleted ? 'deleted-record' : '')}>
            {audio && <audio ref={audioRef} className="user-audio" controls src={audioUrl}
                onError={() => updateSrc(audioUrl || '', setAudioUrl, audioRef)} />}
            {video && <video ref={videoRef} height={150} width={280} controls src={videoUrl} style={{ opacity: isDeleted ? 0.5 : 1 }} 
                onError={() => updateSrc(videoUrl || '', setVideoUrl, videoRef)} />}
            <div className="delete-button-container">
                {!isDeleted && <button
                    className={"delete-button"}
                    title="Delete recording"
                    onClick={() => onDelete && onDelete(recordKey)}
                >
                    <TrashAlt />
                </button>}
                {isDeleted && <button
                    className={"undo-button"}
                    title="Undo delete"
                    onClick={() => undoDelete && undoDelete(recordKey)}
                >
                    <UndoAlt />
                </button>}
            </div>
        </div>
    )
}

export default RecordingItem;
