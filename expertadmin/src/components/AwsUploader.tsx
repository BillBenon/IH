import { RootState } from 'app/rootReducer';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { evaluationPlatformExpertAdminService as expPlatSer } from 'services/evaluationPlatformAdmin';
import { convertHttpsToHttpFromUrl } from 'utils/commonutils';

import ImageUpload from './Uploader/ImageUpload';

type AwsUploaderProps = {
  onUpload: Function;
  url?: string;
  directory: string;
};

export const AwsUploader = ({
  onUpload,
  url: imageurl,
  directory,
}: AwsUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [url, setURL] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;

  const handleClick = (file: any) => {
    handleUpload(file);
  };

  const handleUpload = (file: any) => {
    setLoading(true);
    const newFileName = file.name.replace(/ /g, '');
    const reader = new FileReader();

    const handleActionAfterUpload = (err?: any) => {
      setLoading(false);
      if (err) {
        setError(true);
        alert('Failed with error: ' + err);
        return;
      }
      const location = directory + '/' + file.name;
      setError(false);
      setURL(location);
      onUpload(location);
    }

    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as any);
      expPlatSer.getS3SignedInCredentials({
        path: directory + '/' + newFileName, expertId
      }).then((res) => {
        const bucketUrl = res.data.output.url;
        axios.put(bucketUrl, buffer)
          .then(() => {
            handleActionAfterUpload();
          }).catch(err => {
            console.log(err);
            axios.put(convertHttpsToHttpFromUrl(bucketUrl), buffer)
              .then(() => {
                handleActionAfterUpload();
              }).catch(err => {
                handleActionAfterUpload(err);
              })
          })
      }).catch(err => {
        handleActionAfterUpload(err);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    setURL(imageurl);
  }, [imageurl]);
  return (
    <ImageUpload
      fileInputRef={fileInput}
      url={url}
      error={error}
      isLoading={loading}
      onFileUpload={handleClick}
      expertId={expertId}
    />
  );
};
