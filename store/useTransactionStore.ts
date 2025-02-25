import {create} from 'zustand';

const useTransactionStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions]
  })),
  updateTransaction: (updatedTransaction) => set((state) => ({
    transactions: state.transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ),
  })),
  removeTransaction: (transactionId) => set((state) => ({
    transactions: state.transactions.filter(transaction => transaction.id !== transactionId)
  }))
}));

export default useTransactionStore;
