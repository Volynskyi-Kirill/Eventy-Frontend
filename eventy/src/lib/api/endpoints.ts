const BASE_PATHS = {
  AUTH: '/auth',
  USERS: '/users',
};

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${BASE_PATHS.AUTH}/register`,
    LOGIN: `${BASE_PATHS.AUTH}/login`,
    GOOGLE: `${BASE_PATHS.AUTH}/google`,
  },
  USERS: {
    BASE: BASE_PATHS.USERS,
    ME: `${BASE_PATHS.USERS}/me`,
    UPLOAD_AVATAR: `${BASE_PATHS.USERS}/avatar`,
  },
};
