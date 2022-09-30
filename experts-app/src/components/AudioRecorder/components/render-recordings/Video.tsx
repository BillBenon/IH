import React, { memo, useRef, useState } from "react";
import { candidateService } from "services/candidate";
import { getFolderPathAfterDomainName } from "utilities/commonUtils";


type TProps = {
    url: string;
    expertId: string;
}
const Video = (props: TProps) => {

    let { url, expertId } = props;
    const [videoUrl, setVideoUrl] = useState(url);
    const eleRef = useRef<HTMLVideoElement>(null);

    const updateSrc = (url: string) => {
        let folderPath = getFolderPathAfterDomainName(url);
        candidateService.getSignedURLToGETFile({
            expertId, path: folderPath
        }).then(res => {
            setVideoUrl(res.output.url);
        })
    }

    return (
        <div className="d-flex align-items-center justify-content-center">
            <video controls className="m-2 border" src={videoUrl} ref={eleRef} width="100%"
                onError={() => updateSrc(videoUrl || '')} />
        </div>
    )
}

export default memo(Video);