import React from "react";
import ReactPlayer from "react-player";
import Video from "./Video";

type TProps = {
    urls: string[];
    expertId: string;
}
const RenderVideos = (props: TProps) => {
    let { urls, expertId } = props;

    return (
        <div>
            <div className="h6">{'Videos'}</div>
            {urls.map(url => <div className='d-flex align-items-center justify-content-center'>
                <Video url={url} expertId={expertId} />
            </div>)}
        </div>
    );
}

export default RenderVideos;