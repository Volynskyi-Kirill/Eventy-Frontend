const BASE_PATHS = {
  AUTH: '/auth',
  USERS: '/users',
  EVENTS: '/events',
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
  EVENTS: {
    CREATE: BASE_PATHS.EVENTS,
    GET_ALL: BASE_PATHS.EVENTS,
    GET_BY_ID: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
    UPDATE: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
    DELETE: (id: number) => `${BASE_PATHS.EVENTS}/${id}`,
  },
};
