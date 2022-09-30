import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { getModalDefaultSettings } from "utilities";
import { Button, Col, Form, Row } from "react-bootstrap";
import { candidateService } from "services/candidate";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  closeCandidateReportModal: () => void;
}

const CandidateReportModal = (props: Modal.Props & Props) => {
  const [state, setState] = useState({
    candidate: "",
    candidateTrack: "",
    reportUrl: "",
  });
  const [loadingState, setLoadingState] = useState({
    candidate: false,
    candidateTrack: false,
    submit:false
  });
  const [candidates, setCandidates] = useState<any>([]);
  const [candidateTracks, setCandidateTracks] = useState<any>([]);
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);

  useEffect(() => {
    async function fetchCandidatesData() {
      setLoadingState({ ...loadingState, candidate: true });
      const response = await candidateService.getAllCandidates(expertId);
      if (response.apiStatus === "SUCCESS") {
        setCandidates(response.output);
        setLoadingState({ ...loadingState, candidate: false });
      }
    }
    fetchCandidatesData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertId]);

  const fetchCandidateTrack = async (candidateId: string) => {
    setLoadingState({ ...loadingState, candidateTrack: true });
    const response = await candidateService.getCandidateTrack(candidateId);
    if (response.apiStatus === "SUCCESS") {
      setCandidateTracks(response.output);
      setLoadingState({ ...loadingState, candidateTrack: false });
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "candidate":
        const candidateId = e.target.value;
        setState({ ...state, [name]: value });
        candidateId && fetchCandidateTrack(candidateId);
        break;
      case "candidateTrack":
        const reportUrl =
          e.target[e.target.selectedIndex].getAttribute("data-report-url");
        setState({ ...state, [name]: value, reportUrl: reportUrl ?? "" });
        break;
      case "reportUrl":
        setState({ ...state, [name]: value });
        break;
    }
  };

  const handleSave = async () => {
    setLoadingState({ ...loadingState, submit: true });
    const response = await candidateService.saveCandidateReportLink({
      candidateTrackId: state.candidateTrack,
      reportUrl: state.reportUrl,
      expertId
    });
    if (response.apiStatus === "SUCCESS") {
      toast.success("Candidate report link saved successfully");
      setLoadingState({ ...loadingState, submit: false });
      props.closeCandidateReportModal();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isOpen}
      style={{
        ...getModalDefaultSettings("80%"),
      }}
    >
      <div style={{ width: "100%" }}>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2em",
            fontSize: "20px",
            textDecoration: "underline",
            fontWeight: "bold",
            marginBottom: "1em",
          }}
        >
          Add URL of Candidate Feedback Report
        </span>
        <Form style={{ padding: "10px 0", maxWidth: "80%", margin: "auto" }}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label
              column
              sm="4"
              className="row no-gutters justify-content-md-end justify-content-sm-start"
            >
              Select Candidate:
            </Form.Label>
            <Col sm="8">
              <select
                name="candidate"
                value={state.candidate}
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                <option value="">
                  {loadingState.candidate ? "Loading..." : "Select Candidate:"}
                </option>
                {candidates.map((candidate: any) => (
                  <option
                    key={candidate.candidateId}
                    value={candidate.candidateId}
                  >
                    {`${candidate.candidateName} (${candidate.candidateEmail})`}
                  </option>
                ))}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label
              column
              sm="4"
              className="row no-gutters justify-content-md-end justify-content-sm-start"
            >
              Select Candidate Track:
            </Form.Label>
            <Col sm="8">
              <select
                name="candidateTrack"
                value={state.candidateTrack}
                className="form-control"
                onChange={(e) => handleChange(e)}
              >
                <option value="">{loadingState.candidateTrack
                ? "Loading..."
                : "Select Candidate Track:"}</option>
                {candidateTracks.map((candidateTrack: any) => (
                  <option
                    key={candidateTrack.candidateTrackId}
                    value={candidateTrack.candidateTrackId}
                    data-report-url={candidateTrack.reportUrl}
                  >
                    {candidateTrack.trackTitle}
                  </option>
                ))}
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label
              column
              sm="4"
              className="row no-gutters justify-content-md-end justify-content-sm-start"
            >
              Candidate Report Link:
            </Form.Label>
            <Col sm="8">
              <input
                className="form-control"
                name="reportUrl"
                placeholder="Enter report link here"
                value={state.reportUrl}
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col sm="4"></Col>
            <Col sm="8">
              <Row className="justify-content-center">
                <Button
                  className="btn-sm mr-2 btn-secondary pointer"
                  onClick={() => props.closeCandidateReportModal()}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-sm pointer"
                  onClick={handleSave}
                  disabled={!state.candidateTrack}
                >
                  {loadingState.submit ? "Loading..." : "Submit"}
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default CandidateReportModal;
