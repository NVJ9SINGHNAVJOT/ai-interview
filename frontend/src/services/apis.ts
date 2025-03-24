const BASE_URL_SERVER = process.env.REACT_APP_BASE_URL_SERVER as string;

// admin endpoints
export const adminEndPoints = {
  OTP: BASE_URL_SERVER + "/admins/otp",
  SIGNUP: BASE_URL_SERVER + "/admins/signup",
  LOGIN: BASE_URL_SERVER + "/admins/login",
};

// auth endpoints
export const authEndPoints = {
  OTP: BASE_URL_SERVER + "/auths/otp",
  SIGNUP: BASE_URL_SERVER + "/auths/signup",
  LOGIN: BASE_URL_SERVER + "/auths/login",
  CHECK_USER: BASE_URL_SERVER + "/auths/check-user",
};

// query endpoints
export const queryEndPoints = {
  CREATE_QUERY: BASE_URL_SERVER + "/queries/create",
};
