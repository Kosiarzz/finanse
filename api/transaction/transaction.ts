import axios from '../axios';
import type { getTransactionsResponse, postTransactionResponse } from './transaction.types';
import type { TransactionForm } from '../validation/transactionValidation';

export const getTransactions = async (id: number, token: string) => {

  const { data } = await axios.get<getTransactionsResponse>(`transaction/account/${id}`, {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const postTransaction = async (body: TransactionForm, token: string) => {

  const { data } = await axios.post<postTransactionResponse>('transaction', body, {
    headers: { Authorization: `Bearer ${token}` },
    timeout: 5000,
  });

  return data;
};

export const deleteTransaction = async (id: number, token: string) => {

  const { data } = await axios.delete<postTransactionResponse>(`transaction/${id}`, {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};