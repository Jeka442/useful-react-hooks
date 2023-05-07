import { useEffect, useRef, useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export const usePoster = <TResponse = any, TRequest = any, Terror = any>(
  poster: (
    data: TRequest,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<TResponse>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Terror | undefined>(undefined);
  const [response, setResponse] = useState<
    AxiosResponse<TResponse> | undefined
  >(undefined);

  const isAlive = useRef(true);
  useEffect(() => {
    return () => {
      isAlive.current = false;
    };
  }, []);

  const Post = (data: TRequest, config?: AxiosRequestConfig) => {
    if (data) setResponse(undefined);
    if (error) setError(undefined);
    setIsLoading(true);
    poster(data, config)
      .then((data) => {
        if(!isAlive.current)return;
        if (data) {
          setResponse(data);
        } else {
          // setError();
        }
        setIsLoading(false);
      })
      .catch((err) => {
        if (isAlive.current) setIsLoading(false);
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
