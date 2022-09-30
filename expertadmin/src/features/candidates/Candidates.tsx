import { CandidateFilters } from "containers/Candidate/CandidateFilters";
import { CandidateUpdatePlan } from "containers/Candidate/CandidateUpdatePlan";
import React, { FC } from "react";

const Candidates: FC = () => {
  return (
    <>
      <CandidateFilters></CandidateFilters>
      <CandidateUpdatePlan></CandidateUpdatePlan>
    </>
  );
};

export default Candidates;
