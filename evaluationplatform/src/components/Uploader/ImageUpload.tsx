import { Check } from '@styled-icons/boxicons-regular/Check';
import { IconContainer } from '../Common/IconContainer';
import React, { RefObject, useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { FileDrop } from 'react-file-drop';

import {
  DnDWrapper,
  FileNameWrapper,
  Font14,
  Font18,
  UploadWrapper,
} from './ImageUploadStyled';

type Props = {
  onFileUpload: (file: any) => void;
  url?: string;
  error: boolean;
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
};

const ImageUpload = ({
  onFileUpload,
  url,
  error,
  isLoading,
  fileInputRef,
}: Props) => {

  const onTargetClick = () => {
    fileInputRef && fileInputRef.current && fileInputRef.current.click();
  };

  const onFileInputChange = (event: any): void => {
    if (event.target.files[0]) {
      const files = event.target.files;
      event.stopPropagation();
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files?: FileList) => {
    if (!files) return;
    onFileUpload(files);
  };

  return (
    <div className="w-60 m-2">
      <DnDWrapper>
        <FileDrop
          onTargetClick={onTargetClick}
          onDrop={(files) => {
            if (files && files[0]) {
              handleFileUpload(files);
            }
          }}
        >
          <div className="p-3 d-flex w-100">
            <UploadWrapper className="d-flex w-100 justify-content-center">
              <div className="text-align-center">
                <Font18>Drag and drop supporting files here to upload</Font18>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    style={{ pointerEvents: "none" }}
                    variant={'primary'}
                    type="button"
                    className="d-flex align-items-center"
                  >
                    {isLoading && (
                      <Spinner
                        className="mr-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {(error || url) && (
                      <IconContainer
                        style={{ fontSize: '30px' }}
                        color={'#FFF'}
                        icon={Check}
                      />
                    )}
                    {'Or click to select'}
                  </Button>
                </div>
                <input
                  onChange={onFileInputChange}
                  multiple
                  ref={fileInputRef}
                  type="file"
                  accept="*"
                  className="hidden"
                  name="FileUploader"
                  id="FileUploader"
                />
              </div>
            </UploadWrapper>
          </div>
        </FileDrop>
      </DnDWrapper>
    </div>
  );
};

export default ImageUpload;
