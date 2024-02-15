import apiEndpoints from "./endpoints";

import axiosInstance from "./axiosInstance";

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
  console.log(error.response.data);

  if (!error?.response) {
    errorResponse.errorMessage = "Could not connect to server.";
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
          },
        };

        return await axiosInstance.post(apiEndpoints.auth.login(), JSON.stringify(requestBody), requestConfig);
      });
    },
  },
};

export default apiServices;
