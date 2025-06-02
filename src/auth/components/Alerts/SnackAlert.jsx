import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthError } from '../../../store/auth/AuthSlice';

export function SnackAlert() {
  const [open, setOpen] = useState(true);
  const { error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(setAuthError(null));
  };

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
