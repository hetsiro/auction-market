import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';

import LoadingThreeDotsPulse from './PulseDots';
import { STATUS } from '../../../constants/status';
import './AuthLoading.module.css';
import { SnackAlert } from '../Alerts';

export const AuthLoading = () => {
  const { status, error } = useSelector((state) => state.auth);
  const checking = status === STATUS.CHECKING;

  return (
    <>
      <Modal
        open={checking}
        onClose={!checking}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <LoadingThreeDotsPulse />
      </Modal>
      {error && <SnackAlert />}
    </>
  );
};
