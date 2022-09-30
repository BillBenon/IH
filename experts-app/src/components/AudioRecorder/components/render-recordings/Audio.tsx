import React, { memo, useRef, useState } from "react";
import { candidateService } from "services/candidate";
import { getFolderPathAfterDomainName } from "utilities/commonUtils";


type TProps = {
    url: string;
    expertId: string;
}
const Audio = (props: TProps) => {

    let { url, expertId } = props;
    const [audioUrl, setAudioUrl] = useState(url + "123153");
    const eleRef = useRef<HTMLAudioElement>(null);

    const updateSrc = (url: string) => {
        let folderPath = getFolderPathAfterDomainName(url);
        candidateService.getSignedURLToGETFile({
            expertId, path: folderPath
        }).then(res => {
            setAudioUrl(res.output.url)
        })
    }

    return (
        <audio controls src={audioUrl} ref={eleRef} onError={() => updateSrc(audioUrl || '')} />
    )
}

export default memo(Audio);