import apiEndpoints from "./endpoints";

import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_EXPIRATION_MARGIN = 5; // seconds

function generateSuccessResponse(fields) {
  return {
    success: true,
    ...fields,
  };
}

function generateErrorResponse(error) {
  console.log("Error caught");
  const errorResponse = {
    success: false,
  };

  console.log(error.response);
  console.log(error.response?.data);

  if (!error?.response) {
    errorResponse.errorMessage = "Could not connect to server.";
  } else if (error.response?.data?.non_field_errors) {
    errorResponse.errors = {
      non_field_errors: error.response.data.non_field_errors,
    };
  } else {
    errorResponse.errorMessage = "Login failed.";
  }

  return errorResponse;
}

async function makeRequest(requestFunc) {
  try {
    const response = await requestFunc();
    return generateSuccessResponse({
      data: response.data,
    });
  } catch (error) {
    return generateErrorResponse(error);
  }
}

async function getBearerAuthHeader() {
  const savedAuthState = localStorage.getItem("auth");
  if (!savedAuthState) {
    // have to log in again
    return;
  }

  const authState = JSON.parse(savedAuthState);

  const decodedAccessToken = jwtDecode(authState.tokens.access);
  const isAccessTokenExpired = Date.now() + 1000 * ACCESS_TOKEN_EXPIRATION_MARGIN > 1000 * decodedAccessToken.exp;
  if (isAccessTokenExpired) {
    console.warn("Access token expired, refreshing ...");

    const tokenUpdateResponse = await makeRequest(async () => {
      const requestBody = {
        refresh: authState.tokens.refresh,
      };
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      return await axiosInstance.post(apiEndpoints.auth.refreshToken(), JSON.stringify(requestBody), requestConfig);
    });

    if (!tokenUpdateResponse.success) {
      // throw error saying failed to refresh token
    }

    authState.tokens.access = tokenUpdateResponse.data.access;
    localStorage.setItem("auth", JSON.stringify(authState));
  }

  return {
    Authorization: `Bearer ${authState.tokens.access}`,
  };
}

const apiServices = {
  organizations: {
    getAll: async () => {
      return await makeRequest(async () => {
        return await axiosInstance.get(apiEndpoints.organizations.getAll());
      });
    },
  },
  auth: {
    register: async (fullName, email, username, password, organizationId) => {
      return await makeRequest(async () => {
        const requestBody = {
          full_name: fullName,
          email: email,
          username: username,
          password: password,
          phone_number: "0000000000",
          organization_id: organizationId,
          role: "admin",
        };
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        return await axiosInstance.post(apiEndpoints.auth.register(), JSON.stringify(requestBody), requestConfig);
      });
    },
    login: async (username, password) => {
      return await makeRequest(async () => {
        const requestBody = {
          username: username,
          password: password,
        };
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.post(apiEndpoints.auth.login(), JSON.stringify(requestBody), requestConfig);
      });
    },
  },
  models: {
    getAll: async (modelName) => {
      return await makeRequest(async () => {
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.get(apiEndpoints.models.getAll(modelName), requestConfig);
      });
    },
    getSingle: async (modelName, id) => {
      return await makeRequest(async () => {
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.get(apiEndpoints.models.getSingle(modelName, id), requestConfig);
      });
    },
    create: async (modelName, requestBody) => {
      return await makeRequest(async () => {
        const endpoint = apiEndpoints.models.create(modelName);
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.post(endpoint, JSON.stringify(requestBody), requestConfig);
      });
    },
    updateSingle: async (modelName, id, requestBody) => {
      return await makeRequest(async () => {
        const endpoint = apiEndpoints.models.updateSingle(modelName, id);
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.put(endpoint, JSON.stringify(requestBody), requestConfig);
      });
    },
    deleteSingle: async (modelName, id) => {
      return await makeRequest(async () => {
        const requestConfig = {
          headers: {
            "Content-Type": "application/json",
            ...(await getBearerAuthHeader()),
          },
        };

        return await axiosInstance.delete(apiEndpoints.models.deleteSingle(modelName, id), requestConfig);
      });
    },
  },
};

export default apiServices;
