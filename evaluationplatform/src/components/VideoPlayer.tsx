import vidyardEmbed from '@vidyard/embed-code';
import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { getUUIDFromURL } from '../utilities/commonUtils';

vidyardEmbed.api.renderDOMPlayers();
interface Metadata {
    chapters_attributes: Array<{
        video_attributes: {
            captions: any[];
            description: string | null;
            length_in_milliseconds: number;
            length_in_seconds: number;
            name: string;
            sd_url: string;
            status: string;
            tags: any[];
            thumbnail_urls: {
                normal: string;
                play_button: string;
                play_button_small: string;
                small: string;
            };
        };
    }>;
    custom_attributes: any[];
    description: string;
    height: number;
    length_in_seconds: number;
    name: string;
    tags: any[];
    uuid: string;
    width: number;
}

export const VideoPlayer = ({ url }: { url: string }) => {
    const [videoCaption, setVideoCaption] = useState<string>();
    const [videoDescription, setVideoDescription] = useState<string>("");

    try{
    vidyardEmbed.api.getPlayerMetadata(getUUIDFromURL(url))
        .then((metadata: Metadata) => {
            setVideoCaption(metadata.name);
            setVideoDescription(metadata.description);
        });
    }
    catch(e){
        console.log('error fetching player metadata');
    }

    return (
        <div className="w-100 border-bottom pb-5">
            {videoCaption && <p className="h4 my-3">{videoCaption}</p>}
            {videoDescription && <p className="h6 my-3">{videoDescription}</p>}
            <ReactPlayer className="my-2 border" url={url} />
        </div>
    )
}
