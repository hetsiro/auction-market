import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';

import LoadingThreeDotsPulse from '../../../auth/components/Loading/PulseDots';
import { STATUS } from '../../../constants/status';

export const LoadingCart = () => {
  const { status } = useSelector((state) => state.cart);
  const checking = status === STATUS.CHECKING;

  return (
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
  );
};
