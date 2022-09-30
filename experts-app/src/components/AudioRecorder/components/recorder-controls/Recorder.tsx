import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import { CameraHome } from "@styled-icons/boxicons-solid/CameraHome";
import { Microphone, Pause, Play, Times } from "@styled-icons/fa-solid";
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import AudioAnalyser from './AudioAnalyzer';
import { RestartAlt } from "@styled-icons/material/RestartAlt";
import useRecorder, { RecorderStatus } from "./useRecorder";
import { Add } from "@styled-icons/fluentui-system-regular/Add";

interface IRecorder {
    onStop: () => void;
    onStart: () => void;
    onPause: () => void;
    onCancel: () => void;
    onSaveRecording: Function;
    toggleIsVideo: () => void;
}

const Recorder = (props: IRecorder) => {
    const [isVideo, setIsVideo] = useState<boolean>(false);
    const [isRestart, setIsRestart] = useState<boolean>(false);
    const [audioStream, setAudioStream] = useState<MediaStream | void>();
    const { onStop, onStart, onPause, onCancel, onSaveRecording } = props;
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const videoMime = "video/webm";
    const audioMime = "audio/webm"
    const { startRecording, stopRecording, register, status, error, unregister, pauseRecording, resumeRecording, cancelRecording } = useRecorder({ audio: true, video: isVideo }, { mimeType: isVideo ? videoMime : audioMime });

    const onRecorderStop = (blob: any, blobUrl: any) => {
        onSaveRecording({ url: blobUrl, blob, type: isVideo ? videoMime : audioMime }, isVideo);
    };

    const stop = () => {
        stopRecording(onRecorderStop);
        onStop();
    }

    const start = async () => {
        if (status === RecorderStatus.PAUSED) resumeRecording();
        else {
            startRecording();
        }
        onStart();
    }

    const pause = () => {
        pauseRecording();
        onPause();
    }

    const cancel = () => {
        cancelRecording();
        onCancel();
    }

    const restart = () => {
        cancel();
        setIsRestart(true);
    }

    const toggleIsVideo = () => {
        setAudioStream();
        unregister();
        setIsVideo(!isVideo);
        props.toggleIsVideo();
    }

    const prepareRecording = async () => {
        if (status === RecorderStatus.IDLE || status === RecorderStatus.INIT || status === RecorderStatus.UNREGISTERED) {
            if (isVideo && videoRef?.current) {
                await register(videoRef.current as any, { audio: true, video: true }, videoMime);
            } else {
                if (audioRef.current) {
                    const stream = await register(audioRef.current as any, { audio: true, video: false }, audioMime);
                    setAudioStream(stream);
                }
            }
        }
    }

    useEffect(() => {
        return () => unregister()
    }, [])

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                onCancel();
            }, 1000)
        }
    }, [error, onCancel])

    useEffect(() => {
        if (isRestart) {
            start();
            setIsRestart(false);
        }
    }, [isRestart])

    useEffect(() => {
        prepareRecording();
    }, [isVideo])

    return (
        <>
            {error ? <div className="text-danger">{`Error: Permissions to use ${isVideo ? `Camera` : `Microphone`} was denied.`}</div> :
                <>
                    <FormGroup>
                        <FormControlLabel control={<Switch color="secondary" inputProps={{ 'aria-label': 'controlled' }} onChange={toggleIsVideo} size="small" />} label={isVideo ? 'Record Audio?' : 'Record Video?'} />
                    </FormGroup>
                    {isVideo ? <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        style={{ width: 200, height: 100, background: "#000" }}
                    /> : <>
                        {audioStream && status === RecorderStatus.RECORDING ? <AudioAnalyser audio={audioStream} /> : ''}
                        <audio
                            ref={audioRef}
                            autoPlay
                            muted
                            playsInline
                            style={{ width: 200, height: 100, background: "#000" }}
                        />
                    </>}
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        {(status === RecorderStatus.RECORDING) && (
                            <Button
                                variant="outline-danger"
                                className="cancel-button mx-1 p-0 d-flex align-items-center justify-content-center"
                                title="Cancel recording"
                                onClick={cancel}
                            >
                                <Times height={'1rem'} />
                            </Button>
                        )}
                        {(status === RecorderStatus.RECORDING) && (
                            <Button
                                variant="outline-secondary"
                                className="cancel-button mx-1 p-0 d-flex align-items-center justify-content-center"
                                title="Pause recording"
                                onClick={pause}
                            >
                                <Pause height={'1rem'} />
                            </Button>
                        )}
                        {(status === RecorderStatus.RECORDING) && (
                            <Button
                                variant="outline-secondary"
                                className="cancel-button mx-1 p-0 d-flex align-items-center justify-content-center"
                                title="Restart"
                                onClick={restart}
                            >
                                <RestartAlt height={'1rem'} />
                            </Button>
                        )}
                        {status === RecorderStatus.PAUSED && (
                            <Button
                                variant="outline-secondary"
                                className="cancel-button mx-1 p-0 d-flex align-items-center justify-content-center"
                                title="Resume recording"
                                onClick={start}
                            >
                                <Play height={'1rem'} />
                            </Button>
                        )}
                        {(status === RecorderStatus.RECORDING || status === RecorderStatus.PAUSED) ? (
                            <Button
                                variant="outline-primary"
                                className="cancel-button mx-1 p-0 d-flex align-items-center justify-content-center"
                                title="Add to list"
                                onClick={stop}
                            >
                                <Add height={'1rem'} />
                            </Button>
                        ) : (
                            (status === RecorderStatus.IDLE || status === RecorderStatus.INIT) && <Button className="start-button p-0 d-flex align-items-center justify-content-center" title="Start recording" onClick={start}>
                                {isVideo ? <CameraHome height={'1rem'} /> : <Microphone height={'1rem'} />}
                            </Button>
                        )}
                    </div>
                </>}
        </>
    )
}

export default Recorder;
