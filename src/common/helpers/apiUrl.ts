export default function getApiUrl() {
  // return process.env.NODE_ENV !== "development"
  //   ? process.env.REACT_APP_API_PRODUCTION
  //   : process.env.REACT_APP_API_LOCAL;
  return process.env.REACT_APP_API_DEV;
}
