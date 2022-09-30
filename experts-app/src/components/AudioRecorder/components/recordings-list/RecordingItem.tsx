import React, { useRef } from 'react'
import { TrashAlt } from "@styled-icons/fa-regular";
import { UndoAlt } from "@styled-icons/fa-solid";
import "./styles.css";

interface RecordingItem {
    isDeleted?: boolean;
    audio?: string;
    video?: string;
    recordKey: string;
    onDelete?: (key: string) => void;
    undoDelete?: (key: string) => void;
}

const RecordingItem = ({ isDeleted, audio, video, onDelete, undoDelete, recordKey }: RecordingItem) => {
    const audioRef = useRef(null);

    return (
        <div className={"record " + (isDeleted ? 'deleted-record' : '')}>
            {audio && <audio ref={audioRef} className="user-audio" controls src={audio} />}
            {video && <video height={100} width={200} controls src={video} style={{ opacity: isDeleted ? 0.5 : 1 }} />}
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
