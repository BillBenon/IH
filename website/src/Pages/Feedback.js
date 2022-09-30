import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { post } from "../utils/axiosInstance";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export const Feedback = () => {
  const [feedbackResponse, setFeedbackResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const parsedQueryString = useQuery();

  useEffect(() => {
    async function changeCandidateStatus() {
      const payload = {
        token: "123",
        candidateId: parsedQueryString.get("candidateId"),
        jobId: parsedQueryString.get("jobId"),
        status:
          parsedQueryString.get("status") === "1"
            ? "VETTED_ACCEPTED"
            : "VETTED_REJECTED",
      };

      try {
        const result = await post("changeCandidateStatus", { ...payload });
        if (result?.data?.apiStatus) {
          setFeedbackResponse(true);
        }
      } finally {
        setLoading(false);
      }
    }

    changeCandidateStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!feedbackResponse && !loading) {
    return <h2 className="interview-heading">Oops! Something went wrong.</h2>;
  }

  return (
    <>
      {!loading && (
        <h2 className="interview-heading">
          {parsedQueryString.get("status") === "1"
            ? "Thanks for accepting the job interview."
            : "Thanks for giving the response."}
        </h2>
      )}
    </>
  );
};
