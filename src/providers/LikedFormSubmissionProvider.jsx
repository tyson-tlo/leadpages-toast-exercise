import { createContext, useContext, useEffect, useState } from "react";
import useFetchLikedSubmissions from "../hooks/useFetchLikedSubmissions";

const LikedFormSubmissionContext = createContext();

export default function LikedFormSubmissionProvider({ children }) {
  const [likedFormSubmissions, setLikedFormSubmissions] = useState([]);

  const fetchLikedFormSubmissions = useFetchLikedSubmissions({
    onSuccess: (response) => setLikedFormSubmissions(response.formSubmissions),
  });

  useEffect(() => {
    fetchLikedFormSubmissions();
  }, []);

  const value = {
    likedFormSubmissions,
    fetchLikedFormSubmissions,
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
