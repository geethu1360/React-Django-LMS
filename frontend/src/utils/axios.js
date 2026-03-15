import axios from "axios";
import { setAuthUser, isAccessTokenExpired } from "./auth";
import Cookie from "js-cookie";

const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookie.get("access_token");
    const refreshToken = Cookie.get("refresh_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Only try to refresh if the token is expired AND it's NOT a login/refresh request
    if (
      isAccessTokenExpired(accessToken) &&
      refreshToken &&
      !config.url.includes("token/refresh")
    ) {
      try {
        // Use a standard axios call here, NOT apiInstance, to avoid the loop
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/user/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        setAuthUser(response.data.access, response.data.refresh);
        config.headers.Authorization = `Bearer ${response.data.access}`;
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Optional: Cookie.remove("access_token"); window.location.href = "/login";
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  },
);

export default apiInstance;
