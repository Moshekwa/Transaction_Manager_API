import { Container, Typography, Box, Button } from '@mui/material';
import AddTransactionModal from '../components/AddTransactionModal.tsx';
import TransactionTable from '../components/TransactionTable.tsx';
import { useState, useEffect } from 'react';
import { ExistingTransaction } from '../types/Transaction.ts';
import Paper from '@mui/material/Paper';
// import axios from 'axios';
import { AddCircleOutline } from '@mui/icons-material';
import '../App.css';
import httpService from '../services/HttpService.tsx';

function HomePage() {
  const [open, setOpenAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState<ExistingTransaction[]>([]);

  const rows: ExistingTransaction[] = [
    {
      id: 1,
      amount: 75.5,
      date: '2023-10-26',
      type: 'debit',
      description: 'Weekly grocery run that has been because of groceries',
    },
    {
      id: 2,
      amount: 3000.0,
      date: '2023-10-25',
      type: 'credit',
      description: 'Monthly salary',
    },
    {
      id: 3,
      amount: 120.0,
      date: '2023-10-24',
      type: 'debit',
      description: 'New shoes',
    },
    {
      id: 4,
      amount: 50.0,
      date: '2023-10-23',
      type: 'credit',
      description: 'Returned item',
    },
    {
      id: 5,
      amount: 45.75,
      date: '2023-10-22',
      type: 'debit',
      description: 'Dinner with friends',
    },
    {
      id: 6,
      amount: 15.2,
      date: '2023-10-21',
      type: 'credit',
      description: 'Savings account interest',
    },
    {
      id: 7,
      amount: 150.0,
      date: '2023-10-20',
      type: 'debit',
      description: 'Electricity and water bill',
    },
    {
      id: 8,
      amount: 500.0,
      date: '2023-10-19',
      type: 'credit',
      description: 'Project completion payment',
    },
    {
      id: 9,
      amount: 7.8,
      date: '2023-10-18',
      type: 'debit',
      description: 'Morning coffee',
    },
    {
      id: 10,
      amount: 200.0,
      date: '2023-10-17',
      type: 'credit',
      description: 'Performance bonus',
    },
    {
      id: 11,
      amount: 60.0,
      date: '2023-10-16',
      type: 'debit',
      description: 'Fuel refill',
    },
    {
      id: 12,
      amount: 80.0,
      date: '2023-10-15',
      type: 'debit',
      description: 'Web development course',
    },
    {
      id: 13,
      amount: 30.0,
      date: '2023-10-14',
      type: 'credit',
      description: 'Birthday gift',
    },
    {
      id: 14,
      amount: 55.0,
      date: '2023-10-13',
      type: 'debit',
      description: 'Monthly phone service',
    },
    {
      id: 15,
      amount: 110.0,
      date: '2023-10-12',
      type: 'credit',
      description: 'Dividend payment',
    },
  ];

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response: ExistingTransaction[] = await httpService.getTransactions();
      setTransactions(response);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  fetchData();
     setTransactions(rows);
},);

  const handleOpenAddTransaction = () => setOpenAddTransaction(true);
  const handleCloseAddTransaction = () => setOpenAddTransaction(false);

  const handleAddTransaction = (newTransaction: ExistingTransaction) => {
    setTransactions([...transactions, newTransaction]);
    handleCloseAddTransaction();
  };

  function calculateBalance(transactions: ExistingTransaction[]): number {
    return transactions.reduce((balance, transaction) => {
      if (transaction.type === 'credit') {
        return balance + transaction.amount;
      } else {
        return balance - transaction.amount;
      }
    }, 0);
  }

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(calculateBalance(transactions)); // Calculate balance when transactions change
  }, [transactions]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom justifySelf={'center'}>
        Banking Transaction Manager
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: '24px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'beige',
          marginBottom: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6">Balance: R{balance.toFixed(2)}</Typography>
          <Button
            variant="contained"
            className="primary-button"
            onClick={handleOpenAddTransaction}
          >
            <AddCircleOutline />
            Add Transaction
          </Button>
        </Box>
      </Paper>
      <AddTransactionModal
        open={open}
        onClose={handleCloseAddTransaction}
        onAdd={handleAddTransaction}
      />
      <TransactionTable transactions={transactions} />
    </Container>
  );
}

export default HomePage;
