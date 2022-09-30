import { combineReducers } from '@reduxjs/toolkit';
import addOrEditCapabilityReducer from 'features/addOrEditCapability/addOrEditCapabilitySlice';
import addOrEditExpertReducer from 'features/addOrEditExpert/addOrEditExpertSlice';
import addOrEditQuestionReducer from 'features/addOrEditQuestion/addOrEditQuestionSlice';
import addOrEditTrackReducer from 'features/addOrEditTrack/addOrEditTrackSlice';
import authReducer from 'features/auth/authSlice';
import capabilityReducer from 'features/capabilities/capabilitySlice';
import candidatesReducer from 'features/candidates/candidatesSlice';
import expertReducer from 'features/experts/expertSlice';
import homeSlice from 'features/home/homeSlice';
import questionReducer from 'features/questions/questionSlice';
import trackReducer from 'features/tracks/trackSlice';
import trackSettingsReducer from 'features/trackSettings/trackSettingsSlice';
import productReducer from 'features/products/productSlice';
import addOrEditProductReducer from 'features/addOrEditProducts/addOrEditProductSlice'
import toolsReducer from 'features/tools/toolsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeSlice,
  question: questionReducer,
  addOrEditQuestion: addOrEditQuestionReducer,
  capability: capabilityReducer,
  candidates: candidatesReducer,
  addOrEditCapability: addOrEditCapabilityReducer,
  track: trackReducer,
  addOrEditTrack: addOrEditTrackReducer,
  trackSettings: trackSettingsReducer,
  expert: expertReducer,
  addOrEditExpert: addOrEditExpertReducer,
  products: productReducer,
  addOrEditProducts: addOrEditProductReducer,
  tools: toolsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
