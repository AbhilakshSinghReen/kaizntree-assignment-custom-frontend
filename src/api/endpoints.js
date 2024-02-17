const apiEndpoints = {
  organizations: {
    getAll: () => "/organizations/",
  },
  auth: {
    register: () => "/auth/register/",
    login: () => "/auth/login/",
    refreshToken: () => "/auth/token/refresh/",
  },
};

export default apiEndpoints;
