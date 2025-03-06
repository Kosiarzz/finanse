export type getAccountsResponse = {
  id: number;
  name: string;
  amount: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

export type postAccountResponse = {
  id: number;
  name: string;
  amount: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

export type putAccountResponse = {
  id: number;
  name: string;
  amount: number;
  owner_id: number;
  created_at: string;
  updated_at: string;
};

export interface User {
  id: number;
  username: string;
}