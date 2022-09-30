import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import "./app.css";
import RecorderControls from "./components/recorder-controls";
import RecordingsList from "./components/recordings-list";
import { Audio } from "./types/recorder";
import { convertHMS } from './utils/format-time';
import generateKey from './utils/generate-key';
import { useMessagePopup } from 'context/messagePopup';
import { Important } from "@styled-icons/fluentui-system-filled/Important";
import { convertHttpsToHttpFromUrl, getFolderPathAfterDomainName } from 'utilities/commonUtils';
import { evaluationPlatformService } from 'services';
import axios from 'axios';

interface IAudioRecorder {
  directory: string,
  handleCancel?: () => void,
  handleSubmit?: (cantainRecording?: boolean) => void,
  isReadOnly?: boolean,
  candidateTrackId: string
}

export default function AudioRecorder(props: IAudioRecorder) {
  const message = useMessagePopup();
  const { directory } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [recordings, setRecordings] = useState<Audio[]>([]);
  const [existingRecordings, setExistingRecordings] = useState<Audio[]>([]);
  const [totalRecordingTime, setTotalRecordingTime] = useState<string>();
  const [lastRecordType, setlastRecordType] = useState<"audio" | "video">("audio");

  function onDeleteNewRecord(audioKey: string) {
    setRecordings((prevState) => {
      return [...prevState.map((record) => {
        if (record.key === audioKey) {
          record.isDeleted = true;
        }
        return record
      })];
    });
  }

  function undoDelete(audioKey: string) {
    setRecordings((prevState) => {
      return prevState.map((record) => {
        if (record.key === audioKey) {
          record.isDeleted = false;
        }
        return record
      })
    });
  }

  const undoExistingDelete = (audioKey: string) => {
    setExistingRecordings((prevState) => {
      return prevState.map((record) => {
        if (record.key === audioKey) {
          record.isDeleted = false;
        }
        return record
      })
    });
  }

  const onDeleteExistingRecord = (audioKey: string) => {
    setExistingRecordings((prevState) => {
      return [...prevState.map((record) => {
        if (record.key === audioKey) {
          record.isDeleted = true;
        }
        return record
      })];
    });
  }

  const handleUpload = (recordings: Audio[]) => {
    const filesToUpload = recordings.filter(rec => rec.file && !rec.isDeleted);
    const files = filesToUpload.map(rec => rec.file);
    if (!files.length) {
      props.handleSubmit && props.handleSubmit(!!(recordings?.length || existingRecordings?.length));
      return;
    }
    setLoading(true);
    if (files && Object.keys(files).length) {
      for (let i = 0; i < Object.keys(files).length; i++) {
        const file = files[i];
        if (file) {
          const newFileName = file.name.replace(/ /g, '');
          const ext = file.type.split('/')[1];
          const type = file.type.split('/')[0];
          const reader = new FileReader();

          const handleActionAfterUpload = (err?: any, res?: any) => {
            console.log(err)
            setLoading(false);
            if (err) {
              setError(true);
              alert('Failed with error: ' + err);
              return;
            }
            setError(false);
            if (i === Object.keys(files).length - 1) {
              props.handleSubmit && props.handleSubmit(!!(recordings?.length || existingRecordings?.length));
            }
          }

          reader.onloadend = () => {
            const buffer = Buffer.from(reader.result as any);

            // Getting SignedInCredentials
            evaluationPlatformService.getS3SignedInCredentials({
              path: directory + `/${newFileName}~${type}~.${ext}`, candidateTrackId: props.candidateTrackId
            }).then((res) => {
              let bucketUrl = res.output.url;
              // Uploading to bucket
              axios.put(bucketUrl, buffer)
                .then((res) => {
                  handleActionAfterUpload();
                }).catch(err => {
                  console.log(err);
                  axios.put(convertHttpsToHttpFromUrl(bucketUrl), buffer)
                    .then((res) => {
                      handleActionAfterUpload();
                    }).catch(err => {
                      handleActionAfterUpload(err);
                    })
                })
            }).catch(err => {
              handleActionAfterUpload(err);
            });
          };
          reader.readAsArrayBuffer(file);
        }
      }
    }
  };

  const removeAllFiles = (files: any[]) => {
    files.forEach((url: string) => {
      evaluationPlatformService.deleteS3File({ candidateTrackId: props.candidateTrackId, path: getFolderPathAfterDomainName(url) })
    });
  }

  const handleRemoveFiles = async (recordings: Audio[]) => {
    const filesToDelete = recordings.filter(rec => !rec.file && rec.isDeleted);
    const objectsList = filesToDelete.map(rec => directory + '/' + (rec.key + ".webm"));
    if (!objectsList.length) return
    setLoading(true);
    await removeAllFiles(objectsList);
    setLoading(false);
  }

  const handleSubmit = () => {
    handleUpload(recordings);
    handleRemoveFiles(existingRecordings);
  }

  const getRecordings = () => {
    const files: Audio[] = [];
    evaluationPlatformService.getS3FolderFiles({ candidateTrackId: props.candidateTrackId, path: directory })
      .then((res) => {
        res.output.files.map((url: string) => {
          const type = url.split("~")[1];
          files.push({
            key: url,
            audio: type === "audio" ? url : undefined,
            video: type === "video" ? url : undefined,
            file: null,
          });
        });
        setExistingRecordings([...files]);
      }).catch(e => {
        console.log('failed loading recordings from aws', e);
      })
  }

  useEffect(() => {
    if ((recordings && recordings.length) || (existingRecordings && existingRecordings.length)) {
      setTimeout(() => {
        const totalTime = getTotalAudioLength();
        setTotalRecordingTime(totalTime);
      }, 3000)
    }
  }, [recordings, existingRecordings])

  const getTotalAudioLength = () => {
    const allAudios = Array.prototype.slice.call(document.getElementsByTagName('audio'), 0);
    const allVideos = Array.prototype.slice.call(document.getElementsByTagName('video'), 0);
    const allFiles = allAudios.concat(allVideos);
    if (allFiles && allFiles.length) {
      let total = 0;
      for (let i = 0; i < allFiles.length; i++) {
        total = total + (allFiles[i].duration === Infinity ? 0 : (allFiles[i].duration || 0))
      }
      return convertHMS(total);
    }
  }

  useEffect(() => getRecordings(), [])

  const onSaveRecording = (recording: any, isVideo?: boolean) => {
    setlastRecordType(isVideo ? "video" : 'audio');
    const file = new File([recording.blob], generateKey(), { type: recording.type });
    setRecordings((prevState: Audio[]) => {
      const rec = { key: generateKey(), audio: !isVideo && recording.url, video: isVideo && recording.url, file }
      return [...prevState, rec];
    });
  }

  const onCancel = () => {
    if (recordings.filter(r => !r.isDeleted).length) {
      const text = "You will loose your new recordings. Are you sure you want to cancel?";
      message.confirm(text, (response: any) => props.handleCancel && props.handleCancel(), Important);
    } else {
      props.handleCancel && props.handleCancel()
    }
  }

  return (
    <div>
      {!props.isReadOnly && <RecorderControls
        onSaveRecording={onSaveRecording}
      />}
      <RecordingsList
        recordings={recordings}
        existingRecordings={existingRecordings}
        undoExistingDelete={undoExistingDelete}
        onDeleteExistingRecord={onDeleteExistingRecord}
        onDeleteNewRecord={onDeleteNewRecord}
        undoDelete={undoDelete}
        lastRecordType={lastRecordType}
        isReadOnly={props.isReadOnly}
      />
      <hr />
      <div className="d-flex align-items-center justify-content-between">
        <div className="text-primary">Total Recordings Duration: <strong>{totalRecordingTime}</strong></div>
        <div className="d-flex align-items-center">
          {!!props.handleCancel && <Button variant="secondary" className="mr-2" type="button" onClick={onCancel}>{'Cancel'}</Button>}
          {!props.isReadOnly && <Button type="button" disabled={!recordings.filter(r => !r.isDeleted).length} onClick={() => handleSubmit()} className="d-flex align-items-center">
            {loading && <Spinner style={{ height: "1rem", width: "1rem" }} animation="border" />}
            {'Upload'}
          </Button>}
        </div>
      </div>
    </div>
  );
}
