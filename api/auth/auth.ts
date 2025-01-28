import axios from '../axios';
import type { LoginForm, RegisterForm } from '../validation/authValidation';
import type {
  ForgotPasswordResponse,
  LoginResponse,
  RegisterResponse,
  VerifyRegisterCodeResponse,
} from './auth.types';

export const loginUser = async (body: LoginForm) => {
  console.log(body)
  const { data } = await axios.post<LoginResponse>(`login`, body);

  return data;
};

export const registerUser = async (body: RegisterForm) => {
  const { data } = await axios.post<RegisterResponse>(`register`, {
    ...body,
  });

  return data;
};

export const verifyRegisterCode = async (payload: {
  token: string;
  code: string;
}) => {
  const { data } = await axios.post<VerifyRegisterCodeResponse>(
    `register/validate-code`,
    payload,
  );

  return data;
};

export const resendRegisterCode = async (email: string) => {
  const { data } = await axios.post<VerifyRegisterCodeResponse>(
    `register/resend-validate-code`,
    {
      email,
    },
  );

  return data;
};

export const forgotPassword = async (emailOrUsername: string) => {
  const { data } = await axios.post<ForgotPasswordResponse>(
    `/v1/forgot-password`,
    {
      email: emailOrUsername,
    },
  );

  return data;
};

export const verifyForgotPasswordCode = async (
  code: string,
  forgotToken: string,
) => {
  const { data } = await axios.post(`/v1/forgot-password/validate-code`, {
    code,
    token: forgotToken,
  });

  return data;
};

export const resetPassword = async (
  password: string,
  confirmPassword: string,
  forgotToken: string,
  forgotCode: string,
) => {
  const { data } = await axios.post(`/v1/reset-password`, {
    password,
    confirmPassword,
    token: forgotToken,
    code: forgotCode,
  });

  return data;
};
