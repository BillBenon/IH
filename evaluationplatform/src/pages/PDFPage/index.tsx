import React from 'react';
import styled from 'styled-components';
import { useLoader } from 'context/loaderDots';
import { DEFAULT_TOKEN } from 'utilities/constants';
import { pdfService } from 'services';
import { IPDF } from 'types/PDF';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { FilePdf } from '@styled-icons/fa-regular';
import { getValueBrowserStorage } from 'services/browserStorageService';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .description-text {
    font-size: 18px;
    color: grey;
  }

  .download-pdf-btn {
    margin-top: 20px;
  }
`;

export const PDFPage = (props:any) => {
  const {PDFFromTreeSideBar} = props;
  const loader = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
  const trackName = candidateInfo?.lastCandidateSavedSetting?.lastCandidateTrackWorkedOn;

  const getPayload = () => {
    const candidateTrackId = getValueBrowserStorage('candidateTrackId') || '';
    const payload: IPDF = {
      token: DEFAULT_TOKEN,
      candidateTrackId: candidateTrackId,
      feedback: true,
      questionWithAnswer: true,
    };
    return payload;
  };

  const downloadPDF = () => {
    loader.showLoader();
    const payload = getPayload();
    pdfService.downloadPDF(payload).then((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = trackName + '-' + candidateInfo?.fullname + '.pdf';
      link.click();
      loader.hideLoader();
    }).catch(err => {
      loader.hideLoader();
      enqueueSnackbar(err.message, {
          variant: 'error',
          autoHideDuration: 2500,
      });
  })
};

  return (
    <>
      {trackName && !PDFFromTreeSideBar &&
        <StyledContainer>
        <div className="description-text">
          Download your submitted answers and feedback as PDF for the track <strong>{`${trackName}`}</strong>{' '}
        </div>
        <button type="button" onClick={() => downloadPDF()} className="text--white text--bold download-pdf-btn">
          {' '}
          Download
        </button>
        </StyledContainer>
      }
      {
        <span>
          {!!PDFFromTreeSideBar && <FilePdf title={`Download your submitted answers and feedback as PDF for the track ${trackName}`}  className="pdfIcon"  onClick={()=>downloadPDF()}/>}
        </span>
      }
    </>
  );
};
