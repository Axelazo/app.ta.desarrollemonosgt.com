import { useToast } from "@chakra-ui/react";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

function useApi() {
  const toast = useToast();

  let isToastShowing = false;

  const baseUrl = "http://localhost:3000/";
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const request = <T>(config: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<T>(config)
        .then((response: AxiosResponse<T>) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          console.error(error.message);
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_CONNECTION_REFUSED"
          ) {
            // Check if a toast is already showing, if not, show one
            if (!isToastShowing) {
              isToastShowing = true;

              toast({
                title: "Conexión rechazada",
                description:
                  "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
                status: "error",
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                  isToastShowing = false; // Reset the flag when toast is closed
                },
              });
            }
          }
          reject(error);
        });
    });
  };

  const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      method: "get",
      url,
      ...config,
    });
  };

  const post = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "post",
      url,
      data,
      ...config,
    });
  };

  const put = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return request<T>({
      method: "put",
      url,
      data,
      ...config,
    });
  };

  const remove = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({
      method: "delete",
      url,
      ...config,
    });
  };

  return { get, post, put, remove };
}

export default useApi;
