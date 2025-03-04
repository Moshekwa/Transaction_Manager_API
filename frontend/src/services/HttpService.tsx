import axios from 'axios';
import { ExistingTransaction, NewTransaction } from '../types/Transaction.ts';
import API_URL from '../config/Config.tsx';

const httpService = {
  getTransactions: async (): Promise<ExistingTransaction[]> => {
    try {
      const response = await axios.get<ExistingTransaction[]>(`${API_URL}/api/transactions`);
      return response.data;
    } catch (err) {
      console.error('Error fetching transactions:', err);
      throw err;
    }
  },

  getTransaction: async (id: number): Promise<ExistingTransaction> => {
    try {
      const response = await axios.get<ExistingTransaction>(`${API_URL}/api/transactions/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching transaction:', err);
      throw err;
    }
  },

  createTransaction: async (transactionData: NewTransaction): Promise<ExistingTransaction> => {
    try {
      const response = await axios.post<ExistingTransaction>(`${API_URL}/api/transactions`, transactionData);
      return response.data;
    } catch (err) {
      console.error('Error creating transaction:', err);
      throw err;
    }
  },

  updateTransaction: async (id: number, transactionData: NewTransaction): Promise<ExistingTransaction> => {
    try {
      const response = await axios.put<ExistingTransaction>(`${API_URL}/api/transactions/${id}`, transactionData);
      return response.data;
    } catch (err) {
      console.error('Error updating transaction:', err);
      throw err;
    }
  },

  deleteTransaction: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/api/transactions/${id}`);
    } catch (err) {
      console.error('Error deleting transaction:', err);
      throw err;
    }
  },
};

export default httpService;