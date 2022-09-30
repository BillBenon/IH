import { useStopwatch } from 'react-timer-hook';
import React, { forwardRef, useImperativeHandle } from 'react';

interface ITimer {

}

const Timer = forwardRef((props: ITimer, ref) => {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });


    useImperativeHandle(ref, () => ({
        startSw() {
            start();
        },
        pauseSw() {
            pause();
        },
        resetSw(offsetTimestamp?: Date, autoStart?: boolean) {
            reset(offsetTimestamp, autoStart);
        },
        isRunning() {
            return isRunning;
        }
    }));
    
    return <div className="d-flex align-items-center justify-content-center mt-2">
        {!!hours && <>
            <span>{hours}</span>
            <span>:</span>
        </>}
        <span>{minutes.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
});

export default Timer;