import axios from '../axios';
import type { getAccountsResponse } from './account.types';

export const getAccounts = async (token: string) => {

  const { data } = await axios.get<getAccountsResponse>('account', {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};