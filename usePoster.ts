import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const usePoster = <TResponse = any, TRequest = any, Terror = any>(
  poster: (data: TRequest, config?:AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Terror | undefined>(undefined);
  const [response, setResponse] = useState<AxiosResponse<TResponse> | undefined>(undefined);

  const Post = (data: TRequest, config?:AxiosRequestConfig) => {
    if (data) setResponse(undefined);
    if (error) setError(undefined);

    setIsLoading(true);
    poster(data, config)
      .then((data) => {
        if (data) {
          setIsLoading(false);
          setResponse(data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };
  return {
    data: response?.data,
    response: response,
    error,
    isLoading,
    Post,
  };
};





