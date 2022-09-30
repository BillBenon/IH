import { post } from '../utilities';
import { IPDF } from 'types/PDF';
const API_PREFIX = 'evaluationPlatform';

const downloadPDF = (payload : IPDF) =>{
  return post(`${API_PREFIX}/getCandidateInfoPDF`, payload, {}, false, {responseType : 'arraybuffer'});
}

export const pdfService = {
  downloadPDF
};
