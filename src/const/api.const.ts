
export const HEADER_DEFAULT = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": "true",
  // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
};

export const TIMEOUT = 30000;

// HTTP Status
export const STT_OK = 200;
export const STT_CREATED = 201;
export const STT_BAD_REQUEST = 400;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_NOT_FOUND = 404;
export const STT_UNPROCESSABLE_ENTITY = 422;
export const STT_INTERNAL_SERVER = 500;
export const STT_BAD_GATEWAY = 502;
export const STT_NETWORK_PROBLEM = 0;


//headers
export const UPDATE_DATA_FILE_HEADER = {
  headers: {accept: "*/*", "content-type": "application/json; charset=utf-8"},
};
export const UPDATE_USER_HEADER = {
  headers: { accept: "*/*", "content-type": "application/json; charset=utf-8" },
};

export interface ResponseLogin {
  data: {
    access_token: string;
    body: String| undefined;
  };
  body:String
  statusCodeValue: number;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface RequestRegist{
  employeeid: String,
  employeename: String,
  email: String,
  phone: String,
  password: String
}

//ROUTERS
export const LOGIN = "/api/employee/login";
export const REGISTER = "/api/employee/register";
export const LOGOUT = "/api/employee/logout";
// @ts-ignore
export const CHECK_TOKEN_EXPIRED = (token:any) => `/api/auth/check-token-expired?token=${token}`;
export const SEND_PASSWORD_RESET = `api/auth/password/reset`;
export const REGISTER_PASSWORD = (token: string | string[]) =>
  `/api/v1/UsrReg;token=${token}`;
export const USER_REGISTER = (urlPrefix: string) =>
  `/api/v1/UsrReg?urlPrefix=${encodeURIComponent(
    urlPrefix
  )}&pathSuffix=medipurse`;
export const SEND_MAIL_RESET_PASSWORD = "api/auth/password/email";

export const GET_PROFILE =  "/api/employee/current-employee";
export const UPDATE_PROFILE = "/api/employee/update-profile"
export const GET_LIST_USER =  "/api/users";
export const GET_DETAIL_USER = (id: number) => `/api/users/${id}`;

export const UPDATE_USER = (id: number) => `/api/users/${id}`;
export const DELETE_USER = (id: number) => `/api/users/${id}`;

//Employee

export const GET_EMPLOYEE_LIST =  "/api/employee/list";
export const GET_EMPLOYEE_DETAIL = (id: number) => `/api/employee/${id}`;
export const GET_DETAIL_TEACHER = (id: number) => `/api/teachers/${id}`;
export const UPDATE_TEACHER = (id: number) => `/api/teachers/${id}`;
export const EXPORT_EXCEL =  "/api/employee/export-excel";
export const EXPORT_CSV =  "/api/employee/export-csv";
//product
export const GET_PRODUCT_LIST =  "/api/product/list";
export const CREATE_PRODUCT = "/api/product/add";
export const DELETE_PRODUCT =  (id: number) => `/api/product/delete/${id}`;


//AddCart
export const ADD_TO_CART =  `/api/cart/add`;
export const LIST_CART_ITEM =  `/api/cart/cart-items`;

//order:
export const PURCHASE_ORDER =  `/api/cart/purchaseOrder`;
export const GET_ORDER_LIST =  "/api/orders/list";