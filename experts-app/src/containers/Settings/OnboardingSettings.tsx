import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VideoPlayer } from '../../components/VideoPlayer';
import { RootState } from '../../store';
import { post } from '../../utilities';
import { ConfigTypes, CONFIG_URL_PREFIX, DEFAULT_TOKEN } from '../../utilities/constants';

export const OnboardingSettings = () => {
    const expert = useSelector((state: RootState) => state.auth.user);
    const [urls, setURLs] = useState<string[]>([]);

    useEffect(() => {
        getvideoConfig();
    }, [expert])


    const getvideoConfig = async () => {
        if (expert.expertId) {
            const output = await post(CONFIG_URL_PREFIX + "getConfig", { token: DEFAULT_TOKEN, expertId: expert.expertId, type: ConfigTypes.EXPERT_ON_BOARDING_VIDEO_INFO });
            if (output && output.output && output.output.values) {
                setURLs(output.output.values.map((val: any) => val.url));
            }
        }
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            {urls.map(url => <VideoPlayer url={url} />)}
        </div>
    )
}
//url={'https://share.vidyard.com/watch/UL7D6aPm17fXRMbwUWCYbA'}