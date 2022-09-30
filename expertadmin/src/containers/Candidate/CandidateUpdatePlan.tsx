import { FilterInput } from "components/FilterInput";
import { SearchButton } from "components/SearchButton";
import { useCandidates } from "features/candidates/useCandidates";
import React, { FC, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Candidates, CandidateTrack, UpdateCandidatePlan } from "types";
import "./Candidate.css";

export const CandidateUpdatePlan: FC = () => {
  const [
    {
      loading,
      detailFilterRequest,
      getAllCandidatesAssociatedByExpert,
      getAllUpdateCandidatePlan,
      getUpgradeCandidateTrackList,
      resetTrackList,
      candidates,
      upgradeCandidateTrackList,
    },
  ] = useCandidates();
  const { handleSubmit, register, getValues, setValue } = useForm<any>({
    defaultValues: detailFilterRequest,
  });

  const [currentPlan, setCurrentPlan] = useState<any>({});
  const [apiMessage, setAPIMessage] = useState<any>("");

  useEffect(() => {
    resetTrackList();
    getAllCandidatesAssociatedByExpert();
  }, []);

  const handleCandidateChange = () => {
    const candidateId = getValues("candidateId");
    const candidateObj = candidates.filter((elem: Candidates) => {
      return elem.candidateId === candidateId;
    });
    getUpgradeCandidateTrackList(candidateObj[0]);
    setCurrentPlan(candidateObj[0]?.tracks[0]);
    setValue("trackId", "");
    setAPIMessage("");
  };

  const handleTrackChange = () => {
    const trackId = getValues("trackId");
    const currentTrack = upgradeCandidateTrackList.find(
      (t) => t.trackId === trackId
    );
    setCurrentPlan(currentTrack);
    setAPIMessage("");
  };

  const handleUpdateCandidatePlan = async (request: UpdateCandidatePlan) => {
    const { candidateId, trackId } = request;
    const currentTrack = upgradeCandidateTrackList.find(
      (t) => t.trackId === trackId
    );
    if (currentTrack) {
      const candidateObj = {
        candidateTrackId: currentTrack.candidateTrackId,
        candidateId,
        trackId,
      };
      const result: any = await getAllUpdateCandidatePlan(candidateObj);
      setAPIMessage(result?.payload?.data?.apiMessage);
    }
  };

  return (
    <div className="updatePlanWrapper">
      <div className="titleHead">
        {"Upgrade Candidate to Contract (Unlimited)"}
      </div>

      <Form
        style={{ padding: "10px" }}
        onSubmit={handleSubmit(handleUpdateCandidatePlan)}
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
                disabled={upgradeCandidateTrackList.length === 0}
                as="select"
                placeholder="Track"
                onChange={handleTrackChange}
              >
                <option value={""}>{"Select Candidate Track"}</option>
                {upgradeCandidateTrackList?.map((data: CandidateTrack, index) => (
                  <option key={index} value={data.trackId}>
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
                {"Upgrade to Contract"}
              </SearchButton>
            </Col>
          </Col>
        </Row>
        {apiMessage ? (
          <div className="updatePlan">{apiMessage}</div>
        ) : (
          !!(currentPlan && currentPlan.plan) && (
            <div className="updatePlan">{`Candidate Current Plan is "${currentPlan?.plan}" and Status is "${currentPlan?.planState}"`}</div>
          )
        )}
      </Form>
    </div>
  );
};
