import {
  Box,
  CircularProgress,
  LinearProgress,
  Modal,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { STATUS } from '../../constants/status';

export const Loading = () => {
  const { status } = useSelector((state) => state.app);

  const firstLoading = status === STATUS.FIRST_LOADING;
  const checking = status === STATUS.CHECKING;

  return (
    <>
      {!firstLoading ? (
        <Modal open={checking} onClose={!checking}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress
              size={100}
              thickness={3}
              sx={{ color: '#FFFFFF' }}
            />
          </Box>
        </Modal>
      ) : (
        <Modal open={firstLoading} onClose={!firstLoading}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: 'white',
              gap: 4,
            }}
          >
            <Typography
              variant="h4"
              color="primary"
              fontWeight={500}
              sx={{
                fontSize: { xs: 25, sm: 35, md: 45 },
              }}
            >
              Auction Market
            </Typography>
            <LinearProgress color="primary" sx={{ width: '60%' }} />
          </Box>
        </Modal>
      )}
    </>
  );
};
