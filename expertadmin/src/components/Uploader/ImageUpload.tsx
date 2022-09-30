import { Check } from '@styled-icons/boxicons-regular/Check';
import { IconContainer } from 'components/IconContainer';
import React, { RefObject, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FileDrop } from 'react-file-drop';
import { evaluationPlatformExpertAdminService as expPlatSer } from 'services/evaluationPlatformAdmin';

import {
  Button,
  DnDWrapper,
  FileNameWrapper,
  Font14,
  Font18,
  ImageWrapper,
  UploadWrapper,
} from './ImageUploadStyled';

type Props = {
  onFileUpload: (file: any) => void;
  url?: string;
  error: boolean;
  isLoading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  expertId: string;
};

const ImageUpload = ({
  onFileUpload,
  url,
  error,
  isLoading,
  fileInputRef,
  expertId
}: Props) => {
  const [file, setFile] = useState<any>();
  const [fileUrl, setFileUrl] = useState<any>(url);

  const onTargetClick = () => {
    fileInputRef && fileInputRef.current && fileInputRef.current.click();
  };

  const onFileInputChange = (event: any): void => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const handleFileUpload = (event: any) => {
    if (!file) return;
    event.stopPropagation();
    onFileUpload(file);
  };

  useEffect(() => {
    setFileUrl(url);
    if (url) setFile(undefined);
  }, [url]);


  const updateSrc = () => {
    if (!fileUrl) return;
    expPlatSer.getSignedURLToGETFile({
      path: fileUrl, expertId
    }).then(res => {
      setFileUrl(res.data.output.url);
    })
  }

  return (
    <DnDWrapper>
      <FileDrop
        onTargetClick={onTargetClick}
        onDrop={(files) => {
          if (files && files[0]) {
            setFile(files[0]);
          }
        }}
      >
        <div className="d-flex w-100">
          {fileUrl && (
            <ImageWrapper>
              <img height={'100px'} src={fileUrl} onError={updateSrc} />
            </ImageWrapper>
          )}
          <UploadWrapper className="d-flex w-100 justify-content-center">
            <div>
              <Font18>Drag and drop a file or click here to upload</Font18>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  theme={{
                    color:
                      (!error && !fileUrl) || file
                        ? 'rgba(0, 0, 0, 0.48)'
                        : !error
                          ? '#16AB6B'
                          : '#E25252',
                  }}
                  disabled={!file}
                  type="button"
                  className="d-flex"
                  onClick={handleFileUpload}
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
                  {(error || fileUrl) && !file && (
                    <IconContainer
                      style={{ fontSize: '20px' }}
                      color={'#16AB6B'}
                      icon={Check}
                    />
                  )}
                  {fileUrl && !file ? 'Uploaded' : 'Upload file'}
                </Button>
              </div>
              <FileNameWrapper>
                {file && <Font14>{file.name}</Font14>}
              </FileNameWrapper>
              <input
                onChange={onFileInputChange}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                name="ImageUploader"
                id="ImageUploader"
              />
            </div>
          </UploadWrapper>
        </div>
      </FileDrop>
    </DnDWrapper>
  );
};

export default ImageUpload;
