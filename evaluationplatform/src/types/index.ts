export * from './Question';
export * from './CandidateTrack';
export * from './Capability';
export * from './Expert';
export * from './Feedback';
export * from './QuestionAnswer';
export * from './Track';
export * from './User';
export * from './EvaluationPlatform';
export * from './Candidate';
export * from './Metadata';

declare global {
  interface Window {
    store: any;
    Tawk_API: any;
    browserInfo: any;
    currentIP: any;
    enableLogging: any;
  }
}