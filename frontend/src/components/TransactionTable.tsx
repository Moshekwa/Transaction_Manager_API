import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExistingTransaction } from '../types/Transaction.ts';
import { useState } from 'react';
import EditTransactionModal from './EditTransactionModal.tsx';
import { useNavigate } from 'react-router-dom';

interface TransactionTableProps {
  transactions: ExistingTransaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };
  const [_, setRows] = useState<ExistingTransaction[]>(transactions);
  const [openEditTransaction, setOpenEditTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ExistingTransaction | null>(null);

  const handleView = (transaction: ExistingTransaction) => {
    navigate(`/transactions/${transaction.id}`);
  };

  const handleEdit = (transaction: ExistingTransaction) => {
    setSelectedTransaction(transaction);
    setOpenEditTransaction(true);
  };

  const handleDelete = async (id: number) => {
    try {
      console.log(`API call to delete transaction with ID: ${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleCloseEditTransaction = () => {
    setOpenEditTransaction(false);
    setSelectedTransaction(null);
  };

  const handleUpdateTransaction = (updatedTransaction: ExistingTransaction) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedTransaction.id ? updatedTransaction : row,
      ),
    );
    handleCloseEditTransaction();
  };

  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      type: 'string',
      flex: 1,
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      headerAlign: 'center',
    },
    { field: 'type', headerName: 'Type', flex: 1, headerAlign: 'center' },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '12px' }}>
          <Typography sx={{ marginRight: '4px' }}>R</Typography>
          <Typography sx={{ textAlign: 'right', width: '100%' }}>
            {Math.abs(params.value).toFixed(2)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Paper
        elevation={3}
        sx={{
          padding: '24px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'white',
        }}
      >
        <DataGrid
          rows={transactions}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{
            border: 0,
            backgroundColor: '#fff',
            marginTop: '16px',
            width: '100%',
          }}
        />
      </Paper>

      {selectedTransaction && (
        <EditTransactionModal
          open={openEditTransaction}
          onClose={handleCloseEditTransaction}
          transaction={selectedTransaction}
          onUpdate={handleUpdateTransaction}
        />
      )}
    </Box>
  );
}
