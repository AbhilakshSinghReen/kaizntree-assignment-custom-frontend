const apiEndpoints = {
  organizations: {
    getAll: () => "/organizations/",
  },
  auth: {
    register: () => "/auth/register/",
    login: () => "/auth/login/",
    refreshToken: () => "/auth/token/refresh/",
  },
  models: {
    getAll: (modelName) => `/${modelName}`,
    getSingle: (modelName, id) => `/${modelName}/${id}`,
    create: (modelName) => `/${modelName}`,
    updateSingle: (modelName, id) => `/${modelName}/${id}`,
    deleteSingle: (modelName, id) => `/${modelName}/${id}`,
  },
};

export default apiEndpoints;
