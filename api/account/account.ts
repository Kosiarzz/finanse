import axios from '../axios';
import { AccountForm } from '../validation/accountValidation';
import type { getAccountsResponse, postAccountResponse, putAccountResponse } from './account.types';

export const getAccounts = async (token: string) => {

  const { data } = await axios.get<getAccountsResponse>('account', {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const postAccount = async (body: AccountForm, token: string) => {

  const { data } = await axios.post<postAccountResponse>('account', body, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 5000,
  });

  return data;
};

export const updateAccount = async (body: AccountForm, token: string) => {

  const { data } = await axios.put<putAccountResponse>(`account/${body.id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 5000,
  });

  return data;
};

export const deleteAccount = async (id: number, token: string) => {

  const { data } = await axios.delete<postAccountResponse>(`account/${id}`, {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};