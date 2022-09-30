import { RootState } from 'app/rootReducer';
// import { BucketItem, Client } from 'minio';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { evaluationPlatformExpertAdminService as expPlatSer } from 'services/evaluationPlatformAdmin';
import { StorageClient } from 'utils/constants';
import { ImagePicker, ImagePickerObject } from './ImagePicker';

type IS3ImagePicker = {
    handleImageClick: Function;
}

export const S3ImagePicker = ({ handleImageClick }: IS3ImagePicker) => {
    const [images, setImages] = useState<ImagePickerObject[]>([]);
    const { TRACKLOGODIRECTORY } = StorageClient;
    const expert = useSelector((state: RootState) => state.auth.expert);
    const { expertId } = expert!;

    useEffect(() => {
        if (!images.length) {
            const img = images.slice();
            expPlatSer.getS3FolderFiles({ path: TRACKLOGODIRECTORY, expertId })
                .then((res) => {
                    res.data.output.files.map((url: string, index: number) => {
                        img.push({
                            label: '' + img.length,
                            id: url + index,
                            background: url,
                            onClick: () => handleImageClick(url),
                        });
                    })
                    setImages(img);
                })
                .catch(e => {
                    console.log('failed loading images from aws', e);
                })
        }
    }, []);
    return <>
        {!!images.length && <ImagePicker items={images} />}
    </>;
};
