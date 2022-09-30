import { RecorderControlsProps } from 'components/AudioRecorder/types/recorder';
import React, { useRef, useMemo } from 'react';
import Recorder from './Recorder';
import "./styles.css";
import Timer from './Timer';

export default function RecorderControls({ onSaveRecording }: RecorderControlsProps) {

  const timerRef = useRef(null);

  const stop = () => {
    if (timerRef?.current) (timerRef.current as any).resetSw(undefined, false);
  }

  const start = () => {
    if (timerRef?.current) (timerRef.current as any).startSw();
  }

  const pause = () => {
    if (timerRef?.current) (timerRef.current as any).pauseSw();
  }

  const cancel = () => {
    if (timerRef?.current) (timerRef.current as any).resetSw(undefined, false);
  }

  const toggleIsVideo = () => {
    if (timerRef?.current) (timerRef.current as any).resetSw(undefined, false);
  }

  const recorder = useMemo(() => <Recorder
    onStop={stop}
    onStart={start}
    onPause={pause}
    onCancel={cancel}
    onSaveRecording={onSaveRecording}
    toggleIsVideo={toggleIsVideo}
  />, [])

  return (
    <div className="card border-0">
      <div className="d-flex p-3 align-items-center justify-content-between flex-column">
        <div className={"recorder-display"}>
          {recorder}
          <Timer ref={timerRef} />
        </div>
      </div>
    </div>
  );
}
