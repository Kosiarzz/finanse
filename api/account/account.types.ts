export type getAccountsResponse = {
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
