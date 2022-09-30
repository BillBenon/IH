import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import hljs from 'highlight.js'
import 'highlight.js/styles/darcula.css'

import 'react-quill/dist/quill.snow.css';

const defaultStyle: React.CSSProperties = {
    border: 'none',
    borderRadius: '0.5em',
    width: '-webkit - fill - available',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '20px',
    color: '#000000',
}

interface RTEProps {
    questionTitle?: string;
    value: string;
    disabled: boolean;
    id: string;
    placeholder?: string;
    onChange?: any;
    onFocus?: any;
    onBlur?: any;
    customStyles?: {
        boxShadow?: string;
        background?: string;
        color?: string;
        resize?: string;
        height?: string;
        maxHeight?: string;
        minHeight?: string;
        border?: string;
    };
    doNotAllowCopy?: boolean;
}

const StyledRTE = styled.div<{ customStyles?: any, doNotAllowCopy?: boolean }>`
    .quill{
        box-shadow: ${props => props.customStyles?.boxShadow ? props.customStyles.boxShadow : '0px 2px 15px rgba(0, 0, 0, 0.25)'};
    }
    .ql-snow.ql-toolbar {
        display: block;
        background: ${props => props.customStyles?.background ? props.customStyles.background : '#eaecec'};
        color: ${props => props.customStyles?.color ? props.customStyles.color : 'black'}
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
    }
    .ql-picker-label{
        outline: none !important;
    }
    .ql-container.ql-snow{
        border: ${props => props.customStyles?.border ? props.customStyles.border : '0 !important'};
    }
    .ql-picker-label{
        padding: 0;
    }
    .ql-editor{
        user-select: ${props => props.doNotAllowCopy ? 'none' : 'text'};
        resize: ${props => props.customStyles?.resize ? props.customStyles?.resize : 'vertical'};
        height: ${props => props.customStyles?.height ? props.customStyles?.height : '300px'};
        max-height: ${props => props.customStyles?.maxHeight ? props.customStyles?.maxHeight : 'auto'};
        min-height ${props => props.customStyles?.minHeight ? props.customStyles?.minHeight : '70px'};
        overflow-y: auto;
        background: ${props => props.customStyles?.background ? props.customStyles?.background : 'none'}; 
    }
    .ql-toolbar.ql-snow{
        text-align: left;
        height: auto;
    }
    .ql-disabled{
        background:  ${props => props.customStyles?.background ? props.customStyles.background : '#f3f3f3'};;
        color: ${props => props.customStyles?.color ? props.customStyles.color : 'black'}
    }
    .ReactModal__Content.ReactModal__Content--after-open{
        height: 80% !important;
        overflow: hidden;
        flex-direction: column !important;
    }
    .ql-draw:focus{
        outline: none;
    }
    .ReactModalPortal{
        overflow: hidden !important;
    }
    .ql-formats:focus{
        outline: none !important;
    }
    .question__title>span{
        font-size: 0.7rem;
    }
`


hljs.configure({
    languages: ['javascript', 'java', 'python', 'golang', 'ruby', 'csharp', 'typescript', 'mysql', 'css'],
})

const quillOptions = {
    formats: [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ],
    editorModules: {
        syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        toolbar: [
            [{ 'font': [] }],   // font family
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
            ['bold', 'italic', 'underline'],    // toggled buttons ** other options 'strike'
            [{ 'color': [] }, { 'background': [] }],    // dropdown with defaults
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],  // lists
            [{ 'indent': '-1' }, { 'indent': '+1' }],   // outdent/indent
            [{ 'align': [] }],  // text align
            ['code-block'],
            ['link', 'image', 'video'],
            ['clean'],  // remove formatting
        ]
    }
}

const RichTextEditor = (props: RTEProps) => {
    const uniqueRTEid = `rte-${props.id}`;

    const blurWrapper = () => {
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

    return <StyledRTE
        key={uniqueRTEid}
        customStyles={props.customStyles}
        doNotAllowCopy={props.doNotAllowCopy}>
        <ReactQuill
            key={uniqueRTEid}
            id={uniqueRTEid}
            style={defaultStyle}
            onBlur={blurWrapper}
            onFocus={props.onFocus}
            theme={'snow'}
            readOnly={props.disabled}
            onChange={props.onChange}
            modules={props.disabled ? { toolbar: null } : quillOptions.editorModules}
            formats={quillOptions.formats}
            value={props.value || ''}
            placeholder={props.placeholder}
        />
    </StyledRTE>
}

export default RichTextEditor;