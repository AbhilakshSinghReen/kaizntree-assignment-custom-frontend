import axios from "axios";

const urlParser = new URL(window.location.href);
const urlOrigin = urlParser.origin;

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

if (!process.env.REACT_APP_API_BASE_URL) {
  apiBaseUrl = urlOrigin + "/api/ocr";
  // console.warn(`Environment variable REACT_APP_API_BASE_URL not defined, will default to ${apiBaseUrl}`);
}

apiBaseUrl = "http://localhost:8000/api/dashboard";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export default axiosInstance;
