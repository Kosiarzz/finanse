import axios from '../axios';
import type { getTransactionsResponse } from './transaction.types';

export const getTransactions = async (id: number) => {

  const { data } = await axios.get<getTransactionsResponse>(`transaction/account/${id}`, {
    timeout: 5000
  });

  return data;
};
