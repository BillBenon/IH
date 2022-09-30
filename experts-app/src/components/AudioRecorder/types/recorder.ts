import { Dispatch, SetStateAction } from "react";

export type Recorder = {
  recordingMinutes: number;
  recordingSeconds: number;
  initRecording: boolean;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  audio: string | null;
  file: File | null;
  key?: string;
};

export type UseRecorder = {
  recorderState: Recorder;
  startRecording: () => void;
  cancelRecording: () => void;
  saveRecording: () => void;
};

export type RecorderControlsProps = {
  onSaveRecording: (audio: any) => void;
};

export type RecordingsListProps = {
  existingRecordings?: Audio[];
  recordings?: Audio[];
  undoExistingDelete?: (audioKey: string) => void;
  onDeleteExistingRecord?: (audioKey: string) => void;
  onDeleteNewRecord?: (audioKey: string) => void;
  undoDelete?: (audioKey: string) => void;
  lastRecordType?: "audio" | "video";
};

export type Audio = {
  key: string;
  audio?: string;
  file: File | null;
  isDeleted?: boolean;
  video?: string;
};

export type Interval = null | number | ReturnType<typeof setInterval>;
export type SetRecorder = Dispatch<SetStateAction<Recorder>>;
export type SetRecordings = Dispatch<SetStateAction<Audio[]>>;
export type AudioTrack = MediaStreamTrack;
export type MediaRecorderEvent = {
  data: Blob;
};
