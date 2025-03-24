const BASE_PATHS = {
  AUTH: '/auth',
  USERS: '/users',
  EVENTS: '/events',
  CATEGORIES: '/categories',
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
    BY_EMAIL: `${BASE_PATHS.USERS}/by-email`,
  },
  EVENTS: {
    CREATE: BASE_PATHS.EVENTS,
    GET_ALL: BASE_PATHS.EVENTS,
    GET_BY_ID: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
    UPDATE: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
    DELETE: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
    UPLOAD_IMAGE: `${BASE_PATHS.EVENTS}/upload-image`,
  },
  CATEGORIES: {
    GET_ALL: BASE_PATHS.CATEGORIES,
  },
};
