import React from "react";
import Audio from "./Audio";

type TProps = {
    urls: string[];
    expertId: string;
}
const RenderAudios = (props: TProps) => {

    let { urls, expertId } = props;
    
    return (
        <div>
            <div className="h6">{'Audios'}</div>
            {urls.map((url: string, i: number) =>
                <div className='d-flex align-items-center justify-content-center py-1' key={url + i}>
                    <Audio expertId={expertId} url={url} />
                </div>
            )}
        </div>);
}

export default RenderAudios;