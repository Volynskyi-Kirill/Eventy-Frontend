export interface AuthSuccessResponse {
  access_token: string;
}

export interface ApiErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
