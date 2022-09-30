import { Download } from '@styled-icons/boxicons-regular';
import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";
import axios from 'axios';
import React from 'react';
import { evaluationPlatformService } from 'services';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { downloadFile, getFolderPathAfterDomainName, removeUnwantedTextFromFileName } from 'utilities/commonUtils';
import { IconContainer } from '../Common/IconContainer';
export type AttachmentPickerObject = {
  label: string;
  id: string;
  background: string;
  onClick: Function;
};

type ImagePickerProps = {
  activeItem?: string;
  headingText?: string;
  items: AttachmentPickerObject[];
  itemStyle?: any;
  onRemove?: Function;
  isReadOnly?: boolean;
};

export const AttachmentsList = (props: ImagePickerProps) => {
  const { items, isReadOnly } = props;
  const candidateTrackId = getValueBrowserStorage('candidateTrackId');

  const getResumeFromS3 = (url: string) => {
    let folderPath = getFolderPathAfterDomainName(url);
    evaluationPlatformService.getSignedURLToGETFile({
      candidateTrackId: candidateTrackId ? candidateTrackId : '',
      path: folderPath
    }).then(res => {
      downloadFile(res.output.url);
    })
  }

  const itemsJSX = items.map((section, index) => {
    return <li key={section.id + index}>
      <div className='d-flex align-items-center py-1'>
        <span className="mr-1">{removeUnwantedTextFromFileName(section.background)}</span>
        <a onClick={() => getResumeFromS3(section.background)}><IconContainer icon={Download} /></a>
        {!!props.onRemove && <IconContainer icon={CircleWithCross} color={'red'} onClick={() => props.onRemove && props.onRemove(index)} />}
      </div>
    </li>
  });

  return (
    <div className="w-40">
      <div className="h6">
        <span>{props.headingText ?? `${isReadOnly ? 'Submitted Attachments' : 'Your Attachments'}`}</span>
      </div>
      {(items && items.length) ? <ul>
        {itemsJSX}
      </ul> : <span className='text-muted small'>{'No files available'}</span>}
    </div>
  );
};
