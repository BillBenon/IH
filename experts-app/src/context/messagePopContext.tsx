import { MessageModal } from '../components/Modals/MessagePopup';
import React, { useState } from 'react';
import { notEmpty } from '../utilities';

type MessagePopupContextType = {
    success: (text?: string) => void;
    fail: (text?: string) => void;
    info: (text: string) => void;
    load: (text?: string) => void;
    close: () => void;
    confirm: (text?: string, callbackFn?: (response: boolean) => void) => void;
}

const MessagePopupContext = React.createContext<MessagePopupContextType>({
    success: () => { },
    fail: () => { },
    info: (s: string) => { },
    load: () => { },
    close: () => { },
    confirm: (t?: string, cb?: (t: boolean) => void) => { }
});

type MessagePopupProp = {
    children: React.ReactNode;
}

export enum MessagePopupType {
    SUCCESS = 1,
    FAIL,
    INFO,
    LOADER,
    CONFIRM
}

export const MessagePopup = ({ children }: MessagePopupProp) => {
    const [popupType, setPopupType] = useState<MessagePopupType>(MessagePopupType.INFO);
    const [text, setText] = useState('Yes');
    const [open, setOpen] = useState(false);
    const [callback, setCallback] = useState<{ cbFn: any } | null>(null);

    const successHandler = (st?: string) => {
        if (notEmpty(st)) setText(st as string);
        setOpen(true);
        setPopupType(MessagePopupType.SUCCESS);
    }

    const failHandler = (ft?: string) => {
        if (notEmpty(ft)) setText(ft as string);
        setOpen(true);
        setPopupType(MessagePopupType.FAIL);
    }

    const infoHandler = (it?: string) => {
        if (notEmpty(it)) setText(it as string);
        setOpen(true);
        setPopupType(MessagePopupType.INFO);
    }

    const loadHandler = (lt?: string) => {
        if (notEmpty(lt)) setText(lt as string);
        setOpen(true);
        setPopupType(MessagePopupType.LOADER);
    }

    const closeHandler = () => {
        setOpen(false);
    }

    const confirmHandler = (ct?: string, cb?: (t: boolean) => void) => {
        if (notEmpty(ct)) setText(ct as string);
        setCallback({ cbFn: cb });
        setOpen(true);
        setPopupType(MessagePopupType.CONFIRM);
    }

    const onClose = () => {
        setText('');
        setCallback(null);
        setOpen(false);
    }

    const onConfirm = () => {
        if (callback) callback.cbFn(true);
        onClose();
    }

    //TOdo-- add custom message
    return (
        <MessagePopupContext.Provider value={{
            success: successHandler,
            fail: failHandler,
            info: infoHandler,
            load: loadHandler,
            close: closeHandler,
            confirm: confirmHandler
        }}>
            <MessageModal
                open={open}
                onClose={onClose}
                popupType={popupType}
                text={text}
                onConfirm={onConfirm}
            />
            {children}
        </MessagePopupContext.Provider>
    )
}

export const useMessagePopup = () => React.useContext(MessagePopupContext);