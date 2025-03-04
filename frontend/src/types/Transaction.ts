export interface NewTransaction {
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  description: string;
}

export interface ExistingTransaction extends NewTransaction {
  id: number;
}
