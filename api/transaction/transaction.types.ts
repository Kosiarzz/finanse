export type getTransactionsResponse = {
  id: number;
  name: string;
  amount: number;
  is_expenditure: boolean;
  bill_id: number | null;
  account_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  user: User;
};

export type postTransactionResponse = {
  id: number;
  name: string;
  amount: number;
  is_expenditure: boolean;
  bill_id: number | null;
  account_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export type putTransactionResponse = {
  id: number;
  name: string;
  amount: number;
  is_expenditure: boolean;
  bill_id: number | null;
  account_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export interface User {
  id: number;
  username: string;
}
