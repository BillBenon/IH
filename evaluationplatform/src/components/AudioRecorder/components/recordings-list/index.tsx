import React from 'react';
import { RecordingsListProps } from "../../types/recorder";
import "./styles.css";
import RecordingItem from './RecordingItem';
export default function RecordingsList({ existingRecordings, recordings, onDeleteExistingRecord, undoExistingDelete, onDeleteNewRecord, undoDelete, isReadOnly }: RecordingsListProps) {
  const existingAudios = existingRecordings?.filter(r => !!r.audio) || [];
  const existingVideos = existingRecordings?.filter(r => !!r.video) || [];
  const newAudios = recordings?.filter(r => !!r.audio) || [];
  const newVideos = recordings?.filter(r => !!r.video) || [];

  return (
    !!(recordings?.length || existingRecordings?.length) ? <>
      <hr />
      <div className="d-flex justify-content-around space-between">
        <div className="mr-4">
          <div className="d-flex flex-column align-items-center justify-content-center">
            {!!newAudios.length && <div className="h6">New Audios</div>}
            {newAudios.map((record) => (
              <RecordingItem
                key={record.key}
                recordKey={record.key}
                isDeleted={record.isDeleted}
                audio={record.audio}
                onDelete={onDeleteNewRecord}
                undoDelete={undoExistingDelete}
              />
            ))}
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {!!existingAudios.length && <div className="h6">{isReadOnly ? 'Submitted Audios' : 'Existing Audios'}</div>}
            {existingAudios.map((record) => (
              <RecordingItem
                key={record.key}
                recordKey={record.key}
                isDeleted={record.isDeleted}
                audio={record.audio}
                onDelete={onDeleteExistingRecord}
                undoDelete={undoExistingDelete}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {!!newVideos.length && <div className="h6">New Videos</div>}
            {newVideos.map((record) => (
              <RecordingItem
                key={record.key}
                recordKey={record.key}
                isDeleted={record.isDeleted}
                video={record.video}
                onDelete={onDeleteNewRecord}
                undoDelete={undoDelete}
              />
            ))}
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center">
            {!!existingVideos.length && <div className="h6">{isReadOnly ? 'Submitted Videos' : 'Existing Videos'}</div>}
            {existingVideos.map((record) => (
              <RecordingItem
                key={record.key}
                recordKey={record.key}
                isDeleted={record.isDeleted}
                video={record.video}
                onDelete={onDeleteExistingRecord}
                undoDelete={undoExistingDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </> : <></>
  );
}
