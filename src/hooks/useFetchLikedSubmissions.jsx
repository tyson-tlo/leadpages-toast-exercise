import { useState } from "react";
import { fetchLikedFormSubmissions } from "../service/mockServer";
import useRetry from "./useRetry";

const defaultOptions = {
  onSuccess: () => {},
  onFailure: () => {},
};

export default function useFetchLikedSubmissions(options = defaultOptions) {
  const { retry } = useRetry();

  const fetchData = () =>
    retry(fetchLikedFormSubmissions)
      .then((response) => options.onSuccess(response))
      .catch((error) => options.onFailure(error));

  return fetchData;
}
