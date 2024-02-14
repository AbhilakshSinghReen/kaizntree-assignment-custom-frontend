import apiEndpoints from "./endpoints";

import axiosInstance from "./axiosInstance";

function generateSuccessResponse(fields) {
  return {
    success: true,
    ...fields,
  };
}

function generateErrorResponse(error) {
  const errorResponse = {
    success: false,
  };

  if (!error?.response) {
    errorResponse.errorMessage = "Could not connect to server.";
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
        return await axiosInstance.get(apiEndpoints.organizations.getAll);
      });
    },
  },
};

export default apiServices;
