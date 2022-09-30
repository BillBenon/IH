import React, { useEffect, useRef, useState } from 'react';
import { evaluationPlatformService } from 'services';

import ImageUpload from './ImageUpload';
import axios from 'axios';
import { convertHttpsToHttpFromUrl } from 'utilities/commonUtils';

type AwsUploaderProps = {
  onUpload: Function;
  url?: string;
  directory: string;
  candidateTrackId: string
};

export const AwsUploader = ({
  onUpload,
  url: imageurl,
  directory,
  candidateTrackId
}: AwsUploaderProps) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [url, setURL] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (file: any) => {
    handleUpload(file);
  };

  const handleUpload = (files: any) => {
    if (!files) return
    setLoading(true);
    if (files && Object.keys(files).length) {
      for (let i = 0; i < Object.keys(files).length; i++) {
        const file = files[i];
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

          // Getting SignedInCredentials
          evaluationPlatformService.getS3SignedInCredentials({
            path: `${directory}/${newFileName}`, candidateTrackId
          }).then((res) => {
            let bucketUrl = res.output.url;
            // Uploading to bucket
            axios.put(bucketUrl, buffer)
              .then((res) => {
                handleActionAfterUpload();
              }).catch(err => {
                console.log(err);
                axios.put(convertHttpsToHttpFromUrl(bucketUrl), buffer)
                  .then((res) => {
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
      }
    }
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
    />
  );
};
