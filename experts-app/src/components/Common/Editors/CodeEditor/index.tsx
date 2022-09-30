import React from 'react'
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-github';
import "ace-builds/src-noconflict/ext-language_tools"


import styled from 'styled-components';

interface ICodeEditorProps {
    code: any
    codeType: any
    disabled: boolean
    id: string
    onFocus?: any
    onChange?: any
    onBlur?: any,
}

const StyledDiv = styled.div`
    text-align: start;
    .ace_cursor{
        display: ${(props: any) => props.disabled ? 'none' : 'block'} !important
    }
    .ace_content{
        cursor: ${(props: any) => props.disabled ? 'default' : 'text'} !important
    }
    .editor{
        resize: vertical;
        overflow: hidden;
        min-height: 70px;
        width: auto !important;
        box-shadow: 0px 0px 15px rgba(0,0,0,0.25);
    }
`

const CodeEditor: React.FC<ICodeEditorProps> = (props) => {
    return (
        <StyledDiv {...props}>
            <AceEditor
                onBlur={props.onBlur}
                className='editor'
                style={{ height: '300px' }}
                mode={props.codeType}
                theme='github'
                onChange={props.onChange}
                value={props.code}
                showPrintMargin={false}
                name={`code-${props.id}`}
                onFocus={props.onFocus}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 2,
                    fontSize: 14
                }}
                readOnly={props.disabled}
                editorProps={{
                    $blockScrolling: true,
                }}
            />
        </StyledDiv>
    )
}

export default CodeEditor