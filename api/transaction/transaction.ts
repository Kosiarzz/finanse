import axios from '../axios';
import type { getTransactionsResponse, postTransactionResponse, putTransactionResponse } from './transaction.types';
import type { TransactionForm } from '../validation/transactionValidation';

export const searchTransactions = async (query: any, token: string) => {

  const { data } = await axios.get<getTransactionsResponse>(`transaction/search/${query}`, {
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

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

export const updateTransaction = async (body: TransactionForm, token: string) => {

  const { data } = await axios.put<putTransactionResponse>(`transaction/${body.id}`, body, {
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