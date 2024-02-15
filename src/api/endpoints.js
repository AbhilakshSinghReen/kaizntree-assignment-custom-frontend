const apiEndpoints = {
  organizations: {
    getAll: () => "/organizations/",
  },
  auth: {
    register: () => "/auth/register/",
    login: () => "/auth/login/",
  },
};

export default apiEndpoints;
