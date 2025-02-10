import {create} from 'zustand';

const useTransactionStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  removeTransaction: (transactionId) => set((state) => ({
    transactions: state.transactions.filter(transaction => transaction.id !== transactionId)
  }))
}));

export default useTransactionStore;
