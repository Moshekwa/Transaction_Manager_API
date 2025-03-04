import { Modal, Box } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ExistingTransaction, NewTransaction } from '../types/Transaction';
import TransactionModal from './TransactionModal';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (transactionData: ExistingTransaction) => void;
}

const AddTransactionModal = ({
  open,
  onClose,
  onAdd,
}: AddTransactionModalProps) => {
  const handleSave = async (transactionData: NewTransaction) => {
    try {
      const response = await axios.post<ExistingTransaction>(
        '/api/transactions',
        transactionData,
      );
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Error creating transaction. Please try again.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <TransactionModal open={open} onClose={onClose} onSave={handleSave} />
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;
