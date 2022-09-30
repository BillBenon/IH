import 'highlight.js/styles/darcula.css';
import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js';
import { DeltaStatic } from 'quill';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';


hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'csharp', 'java', 'js', 'jsx', 'jsp', 'cs'],
});
const defaultStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '5px',
    width: '-webkit - fill - available',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    color: '#000000',
}

interface RTEProps {
    value: string;
    disabled: boolean;
    id: string;
    placeholder?: string;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    customStyles?: React.CSSProperties;
}

const quillOptions = {
    formats: [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ],
    editorModules: {
        syntax: {
            highlight: (text: any) => hljs.highlightAuto(text).value,
        },
        toolbar: [
            [{ 'font': [] }],   // font family
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
            ['bold', 'italic', 'underline'],    // toggled buttons ** other options 'strike'
            [{ 'color': [] }, { 'background': [] }],    // dropdown with defaults
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // lists
            [{ 'indent': '-1' }, { 'indent': '+1' }],   // outdent/indent
            [{ 'align': [] }],  // text align
            ['clean'],  // remove formatting
            ['link', 'image', 'video'],
            ['blockquote', 'code-block']
        ]
    }
}

const StyledRTE = styled.div<{ customStyles?: React.CSSProperties }>`
    .quill{
        border: ${props => props.customStyles?.border ? props.customStyles.border : '1px solid rgba(0, 0, 0, 0.25) !important'};
    }
    .ql-container.ql-snow{
        border: ${props => props.customStyles?.border ? props.customStyles.border : '0 !important'};
    }
    .ql-picker-label{
        padding: 0;
    }
    .ql-editor{
        border-bottom: ${props => props.customStyles?.borderBottom || ''};
        resize: ${props => props.customStyles?.resize || 'vertical'};
        height: ${props => props.customStyles?.height || '300px'};
        min-height: ${props => props.customStyles?.minHeight || '70px'};
        overflow-y: auto;
        direction: ltr !important;
    }
    .ql-toolbar.ql-snow{
        text-align: left;
        height: auto;
    }
    .ql-disabled{
        background: ${props => props.customStyles?.background || '#f3f3f3'};
    }
    .ql-snow .ql-tooltip{
        left: 0 !important;
    }
`

const RichTextEditor = (props: RTEProps) => {
    const [rteValue, setRTEValue] = useState<string>();
    const uniqueRTEid = `rte-${props.id}`
    const blurWrapper = () => {
        if (!props.onBlur)
            return;
        let okayToCallBlur = true;
        if (!props.disabled) {
            let _RTEinstance = document.getElementById(uniqueRTEid);
            let qlPickerLabels = _RTEinstance?.getElementsByClassName('ql-picker-label') || [];
            let clipBoardEl = _RTEinstance?.getElementsByClassName('ql-clipboard')[0]
            for (let i = 0; i < qlPickerLabels.length; i++) {
                if (document.activeElement === qlPickerLabels[i] || document.activeElement === clipBoardEl) {
                    okayToCallBlur = false;
                }
            }
        }
        if (!props.disabled && okayToCallBlur)
            props.onBlur && props.onBlur()
    }

    const onChangeWrapper = (data: string, delta: DeltaStatic, source: string) => {
        if (source === 'user') {
            setRTEValue(data);
            props.onChange(data)
        }
    }

    const processInput = (value: string) => {
        return value ?
            value
                .replace(/\n{2,}/g, '<br/><br/>')
                .replace(/\n{1,}/g, '<br/>')
            : ''
    }

    useEffect(() => {
        setRTEValue(processInput(props.value));
    }, [props.value])

    return <StyledRTE customStyles={props.customStyles}>
        <ReactQuill
            id={uniqueRTEid}
            style={defaultStyle}
            onBlur={blurWrapper}
            onFocus={props.onFocus}
            theme={'snow'}
            readOnly={props.disabled}
            onChange={onChangeWrapper}
            modules={props.disabled ? { toolbar: null } : quillOptions.editorModules}
            formats={quillOptions.formats}
            value={rteValue}
            placeholder={props.placeholder} />
    </StyledRTE>
}

export default RichTextEditor;