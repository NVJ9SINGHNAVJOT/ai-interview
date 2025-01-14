const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER as string;

// auth endpoints
export const authEndPoints = {
  SIGNUP: BASE_URL_SERVER + "/auths/signup",
  OTP: BASE_URL_SERVER + "/auths/otp",
  LOGIN: BASE_URL_SERVER + "/auths/login",
  CHECK_USER: BASE_URL_SERVER + "/auths/check-user",
  // LOGOUT: BASE_URL_SERVER + "/auths/logout",
};

// query endpoints
export const queryEndPoints = {
  CREATE_QUERY: BASE_URL_SERVER + "/queries/create",
};
