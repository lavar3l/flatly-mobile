import axios from "axios";
import { USER_STORAGE_KEY } from "../common/constants/userConstants";
import getApiUrl from "../common/helpers/apiUrl";

const AxiosInstance = axios.create({
  baseURL: "https://backend.flatly.online/api/v1/",
  timeout: 10000,
  maxBodyLength: 5000,
  maxContentLength: 5000,

  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

AxiosInstance.interceptors.request.use(
  (request: any) => {
    // const userStorage = localStorage.getItem(USER_STORAGE_KEY);
    // const userObject = userStorage ? JSON.parse(userStorage) : null;
    request.headers["Authentication"] = "31bba052-f238-408d-be4b-87e72648b77d"; //userObject?.value;
    return request;
  },
  (error) => {
    //(new ErrorService()).handle(error.response?.status, error.response?.data)
    throw error;
  }
);

AxiosInstance.interceptors.response.use(
  ({ data }: any) => data,
  (error: any) => {
    //(new ErrorService()).handle(error.response?.status, error.response?.data)
    throw error;
  }
);

export default AxiosInstance;
