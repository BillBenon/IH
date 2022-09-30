import RenderAudios from 'components/AudioRecorder/components/render-recordings/RenderAudios';
import RenderVideos from 'components/AudioRecorder/components/render-recordings/RenderVideos';
import React, { useEffect, useState } from 'react';
import { candidateService } from 'services/candidate';

type CandidateRecordingsProps = {
    candidateId: string;
    capabilityId: string;
    questionId: string;
    version: string | number;
    expertId: string;
};

type RecordingPickerObject = {
    label: string;
    id: string;
    background: string;
};

export const CandidateRecordings = (props: CandidateRecordingsProps) => {
    const [recordings, setRecordings] = useState<RecordingPickerObject[]>([]);
    const { candidateId, capabilityId, questionId } = props;
    const recordingsDir = candidateId + "/" + capabilityId + "/" + questionId + "/recordings/v" + props.version;

    const getQuestionRecordings = () => {
        const files: any = [];
        candidateService.getS3FolderFiles({
            expertId: props.expertId, path: recordingsDir ? recordingsDir : ''
        }).then(res => {
            res.output.files.map((url: string, index: number) => {
                files.push({
                    label: '' + files.length,
                    id: url + index,
                    background: url,
                });
            })
            setRecordings([...files]);
        }).catch(e => {
            console.log('failed loading attachments from aws', e);
        })
    }

    const renderItems = () => {
        const isVideo = (url: string) => url.split("~")[1] === "video";
        const videos = recordings.filter(rec => isVideo(rec.background));
        const audios = recordings.filter(rec => !isVideo(rec.background));

        const audioUrls = audios.map(v => v.background);
        const videoUrls = videos.map(v => v.background);

        return <>
            {!!audios.length && <RenderAudios urls={audioUrls} expertId={props.expertId} />}
            {!!audios.length && !!videos.length && <hr />}
            {!!videos.length && <RenderVideos urls={videoUrls} expertId={props.expertId} />}
        </>
    }

    useEffect(() => {
        getQuestionRecordings();
    }, [])

    return (
        <div className="w-40">
            {(recordings && recordings.length) ? <div className="d-flex flex-column">
                {renderItems()}
            </div> : <span className='text-muted small'>{'No recordings available'}</span>}
        </div>
    );
};