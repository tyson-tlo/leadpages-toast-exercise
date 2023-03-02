import { createContext, useContext } from "react";
import useFetchWithRetry from "../hooks/useFetchWithRetry";
import {
  fetchLikedFormSubmissions,
  saveLikedFormSubmission,
} from "../service/mockServer";

const LikedFormSubmissionContext = createContext();

export default function LikedFormSubmissionProvider({ children }) {
  const { data, fetchData: getLikedFormSubmissions } = useFetchWithRetry(
    fetchLikedFormSubmissions
  );
  const { fetchData: storeLikedFormSubmission } = useFetchWithRetry(
    saveLikedFormSubmission,
    { fetchOnInit: false, onSuccess: getLikedFormSubmissions }
  );

  const value = {
    likedFormSubmissions: data?.formSubmissions,
    getLikedFormSubmissions: getLikedFormSubmissions,
    storeLikedFormSubmission: storeLikedFormSubmission,
  };

  return (
    <LikedFormSubmissionContext.Provider value={value}>
      {children}
    </LikedFormSubmissionContext.Provider>
  );
}

export function useLikedFormSubmission() {
  return useContext(LikedFormSubmissionContext);
}
