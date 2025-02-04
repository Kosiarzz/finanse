// * Error
export type EndpointError = {
    message: string;
    errors?: Record<string, unknown>;
  };
  
  //* Login
  export type LoginResponse = {
    id: number;
    username: string;
    name: string;
    surname: string;
    tutorialCompleted: boolean;
    accessToken: string;
  };
  
  //* Register
  export type RegisterResponse = {
    message: string;
    token: string;
  };
  
  //* Verify Register code
  export type VerifyRegisterCodeResponse = {
    message: string;
  };
  
  //* Forgot password
  
  export type ForgotPasswordResponse = {
    message: string;
    token: string;
  };
  