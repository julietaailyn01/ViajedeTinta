declare type HttpMethods = "get" | "post" | "put" | "delete" | "patch";

export const useCustomInstance = <T>(): ((config: {
  url: string;
  method: Uppercase<HttpMethods> | Lowercase<HttpMethods>;
  params?: any;
  headers?: Record<string, string>;
  data?: BodyType<unknown>;
  signal?: AbortSignal;
  responseType?: string;
}) => Promise<T>) => {
  return (config: {
    url: string;
    method: Uppercase<HttpMethods> | Lowercase<HttpMethods>;
    params?: any;
    headers?: Record<string, string>;
    data?: BodyType<unknown>;
    signal?: AbortSignal;
  }) => {
    const promise = fetch(
      `${
        config.url.startsWith("http")
          ? config.url
          : "http://localhost:5062" + config.url
      }` +
        (config.params ? "?" : "") +
        new URLSearchParams(config.params),
      {
        method: config.method,
        ...(config.data ? { body: JSON.stringify(config.data) } : {}),
        signal: config.signal,
        headers: {
          Accept: "application/json",
          "X-CSRF": "1",
          ...config.headers,
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        const data = response.status === 204 ? "" : await response.json();
        return data as T;
      } else if (response.status === 400 || response.status === 404) {
        const errorData = await response.json();
        throw errorData;
      } else if (response.status === 401) {
        document.location.reload();
        return undefined as unknown as T; // Solo para satisfacer el tipo
      } else {
        throw response;
      }
    });

    return promise;
  };
};

export default useCustomInstance;

// Types opcionales
export type ErrorType<ErrorData> = ErrorData;
export type BodyType<BodyData> = BodyData;
