import { FilterInput } from "components/FilterInput";
import { SearchButton } from "components/SearchButton";
import { useCandidates } from "features/candidates/useCandidates";
import React, { FC, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Candidates, GetCandidateDetailRequest, CandidateTrack } from "types";
import "./Candidate.css";
import { useSelector } from "react-redux"
import { RootState } from 'app/rootReducer';
import { buildUrlWithParams } from "utils/commonutils";
import { candidates as candidatesServices } from "api/candidates";
import { CANDIDATE_PORTAL_URL } from "utils/constants";

export const CandidateFilters: FC = () => {
  const [
    {
      loading,
      detailFilterRequest,
      getAllCandidatesAssociatedByExpert,
      getCandidateTrackList,
      resetTrackList,
      candidates,
      trackList,
    },
  ] = useCandidates();
  const { handleSubmit, register, getValues } = useForm<any>({
    defaultValues: detailFilterRequest,
  });

  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;


  useEffect(() => {
    resetTrackList();
    getAllCandidatesAssociatedByExpert();
  }, []);

  const handleCandidateChange = () => {
    const candidateId = getValues("candidateId");
    const candidateObj = candidates.filter((elem: Candidates) => {
      return elem.candidateId == candidateId;
    });
    getCandidateTrackList(candidateObj[0]);
  };

  const handleCandidateFilter = async ({ candidateId, trackId }: GetCandidateDetailRequest) => {
    if (candidateId !== '' && trackId !== '') {
      let response: any = await candidatesServices.getCandidateAuthorizationToken({ candidateId, expertId });
      response = response?.data;
      if (response) {
        const { authorizationToken: token } = response.output;
        const urlParams = {
          candidateId,
          trackid: trackId,
          authorizationToken: token,
          lpflowtype: "enroll"
        }
        const url = buildUrlWithParams(CANDIDATE_PORTAL_URL, urlParams);
        window.open(url);
      }
    }
  };

  return (
    <div className="filterWrapper">
      <div className="titleHead">{"Candidate Simulation"}</div>

      <Form
        style={{ padding: "10px" }}
        onSubmit={handleSubmit(handleCandidateFilter)}
      >
        <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
          <Col md={9} lg={9} sm={12} className="d-flex pl-0">
            <Col className="mr-0 pr-0" md={4} lg={4} sm={10}>
              <FilterInput
                ref={register}
                name="candidateId"
                as="select"
                placeholder="Candidate"
                onChange={handleCandidateChange}
              >
                <option value={""}>
                  {candidates.length == 0 ? "Loading..." : "Select Candidate"}
                </option>
                {candidates?.map((data: Candidates, index) => (
                  <option key={index + "candidateId"} value={data.candidateId}>
                    {data.candidateName} ({data.candidateEmail})
                  </option>
                ))}
              </FilterInput>
            </Col>
            <Col className="mr-0 pr-0" md={4} lg={4} sm={10}>
              <FilterInput
                ref={register}
                name="trackId"
                disabled={trackList.length == 0}
                as="select"
                placeholder="Track"
              >
                <option value={""}>{"Select Candidate Track"}</option>
                {trackList?.map((data: CandidateTrack, index) => (
                  <option key={index} value={data.candidateTrackId}>
                    {data.title}
                  </option>
                ))}
              </FilterInput>
            </Col>
            <Col md={4} lg={4} sm={10}>
              <SearchButton
                disabled={loading}
                type="submit"
                style={{ width: "200px" }}
              >
                {"Go to Candidate Track"}
              </SearchButton>
            </Col>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
