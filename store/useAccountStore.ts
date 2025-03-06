import {create} from 'zustand';

const useAccountStore = create((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
  addAccount: (account) => set((state) => ({
    accounts: [account, ...state.accounts]
  })),
  updateAccount: (updatedAccount) => set((state) => ({
    accounts: state.accounts.map((account) =>
      account.id === updatedAccount.id ? updatedAccount : account
    ),
  })),
  removeAccount: (accountId) => set((state) => ({
    accounts: state.accounts.filter(account => account.id !== accountId)
  }))
}));

export default useAccountStore;
