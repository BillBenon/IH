import 'highlight.js/styles/darcula.css';
import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js';
import { DeltaStatic } from 'quill';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

hljs.configure({
  languages: [
    'javascript',
    'ruby',
    'python',
    'csharp',
    'java',
    'js',
    'jsx',
    'jsp',
    'cs',
  ],
});
export const defaultRTEStyle: React.CSSProperties = {
  border: '0.5px solid #ccc',
  borderRadius: '5px',
  width: '-webkit - fill - available',
  fontFamily: 'Lato',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  color: '#000000',
};

export const quillOptions = {
  formats: [
    'header',
    'font',
    'background',
    'color',
    'code',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'script',
    'align',
    'direction',
    'link',
    'image',
    'code-block',
    'formula',
    'video',
  ],
  editorModules: {
    syntax: {
      highlight: (text: any) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ font: [] }], // font family
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
      ['bold', 'italic', 'underline'], // toggled buttons ** other options 'strike'
      [{ color: [] }, { background: [] }], // dropdown with defaults
      [{ list: 'ordered' }, { list: 'bullet' }], // lists
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ align: [] }], // text align
      ['clean'], // remove formatting
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
    ],
  },
};

export const StyledRTE = styled.div<{
  enableToolbaroOnFocus?: boolean;
  customStyles?: React.CSSProperties;
  doNotAllowCopy?: boolean;
}>`
  .quill {
    box-shadow: ${(props) =>
    props.customStyles?.boxShadow
      ? props.customStyles.boxShadow
      : '0px 2px 15px rgba(0, 0, 0, 0.25)'};
  }
  .ql-container.ql-snow {
    border: 0 !important;
  }
  .ql-picker-label {
    padding: 0;
  }
  .ql-editor {
    user-select: ${(props) => (props.doNotAllowCopy ? 'none' : 'text')};
    resize: ${(props) =>
    props.customStyles?.resize ? props.customStyles?.resize : 'vertical'};
    height: ${(props) =>
    props.customStyles?.height ? props.customStyles?.height : '300px'};
    min-height: 70px;
    overflow-y: auto;
  }
  .ql-toolbar.ql-snow {
    text-align: left;
    height: auto;
    display: ${(props) => (props.enableToolbaroOnFocus ? 'none' : 'block')};
  }
  .ql-disabled {
    background: #f3f3f3;
  }
`;

export const blurWrapper = (
  uniqueRTEid: string,
  disabled?: boolean,
  enableToolbaroOnFocus?: boolean
) => {
  let okayToCallBlur = true;
  const _RTEinstance = document.getElementById(uniqueRTEid);
  const qlPickerLabels =
    _RTEinstance?.getElementsByClassName('ql-picker-label') || [];
  const clipBoardEl = _RTEinstance?.getElementsByClassName('ql-clipboard')[0];
  for (let i = 0; i < qlPickerLabels.length; i++) {
    if (
      document.activeElement === qlPickerLabels[i] ||
      document.activeElement === clipBoardEl
    ) {
      if (!disabled) {
        okayToCallBlur = false;
      }
    }
  }
  if (enableToolbaroOnFocus && okayToCallBlur) {
    const toolBarElem = _RTEinstance?.getElementsByClassName('ql-toolbar')[0];
    toolBarElem?.setAttribute('style', 'display: none;');
  }
};

export const onChangeWrapper = (
  data: string,
  delta: DeltaStatic,
  source: string,
  callback: Function
) => {
  if (source === 'user') {
    callback();
  }
};

export const processInput = (value: string) => {
  return value
    ? value.replace(/\n{2,}/g, '<br/><br/>').replace(/\n{1,}/g, '<br/>')
    : '';
};

export const focusWrapper = (
  uniqueRTEid: string,
  enableToolbaroOnFocus: boolean,
  disabled?: boolean
) => {
  if (disabled) return;
  if (enableToolbaroOnFocus) {
    const _RTEinstance = document.getElementById(uniqueRTEid);
    const toolBarElem = _RTEinstance?.getElementsByClassName('ql-toolbar')[0];
    toolBarElem?.setAttribute('style', 'display: block;');
  }
};

interface RTEProps {
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: any;
  name: string;
  error?: any;
  id: string;
  control?: Control;
  onChangeCallback?: any;
  valueHack?: boolean;
  onFocus?: any;
}

const RichTextEditor = ({
  control,
  name,
  error,
  defaultValue,
  disabled,
  onChangeCallback,
  placeholder,
  id,
  valueHack,
  onFocus,
}: RTEProps) => {
  return (
    <Controller
      control={control}
      name={name}
      error={error}
      defaultValue={defaultValue}
      render={({ onChange, value }: any) => (
        <StyledRTE
          enableToolbaroOnFocus={true}
          customStyles={{ boxShadow: 'none', height: '80px' }}
        >
          <ReactQuill
            theme="snow"
            id={id}
            readOnly={!!disabled}
            value={valueHack && defaultValue ? defaultValue : value}
            modules={quillOptions.editorModules}
            formats={quillOptions.formats}
            placeholder={placeholder}
            style={defaultRTEStyle}
            onBlur={() => blurWrapper(id, disabled, true)}
            onFocus={() => {
              focusWrapper(id, true, disabled);
              onFocus && onFocus();
            }}
            onChange={(data: string, delta: DeltaStatic, source: string) =>
              onChangeWrapper(data, delta, source, () =>
                onChangeCallback ? onChangeCallback(data) : onChange(data)
              )
            }
          />
        </StyledRTE>
      )}
    />
  );
};

export default RichTextEditor;
