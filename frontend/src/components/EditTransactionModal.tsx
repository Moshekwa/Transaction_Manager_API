import { Modal, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ExistingTransaction, NewTransaction } from '../types/Transaction';
import TransactionModal from './TransactionModal';
import axios from 'axios';

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: ExistingTransaction;
  onUpdate: (updatedTransaction: ExistingTransaction) => void;
}

const EditTransactionModal = ({
  open,
  onClose,
  transaction,
  onUpdate,
}: EditTransactionModalProps) => {
  const handleSave = async (updatedTransaction: NewTransaction) => {
    try {
      const response = await axios.put(
        `/api/transactions/${transaction.id}`,
        updatedTransaction,
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Error updating transaction. Please try again.');
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
        <TransactionModal
          open={open}
          onClose={onClose}
          transaction={transaction}
          onSave={handleSave}
        />
        <ToastContainer />
      </Box>
    </Modal>
  );
};

export default EditTransactionModal;
