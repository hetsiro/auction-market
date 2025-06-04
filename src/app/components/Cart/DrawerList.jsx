import { Box, Typography } from '@mui/material';
import { ItemCart } from './ItemCart';
import { LoadingCart } from './LoadingCart';
import { useSelector } from 'react-redux';

export const DrawerList = () => {
  const { totalPrice } = useSelector((state) => state.cart);

  return (
    <Box
      sx={{
        backgroundColor: '#f7f9fb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { xs: '100vw', sm: '600px' },
        minWidth: '320px',
        height: '100%',
      }}
      role="presentation"
    >
      <Box
        sx={{
          minHeight: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'secondary.dark',
          color: 'white',
          fontWeight: 500,
        }}
      >
        <Typography variant="h5" fontWeight={500} color="white">
          Cart
        </Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, backgroundColor: '#f7f9fb' }}
        display="flex"
        flexDirection="column"
      >
        <ItemCart />
      </Box>
      <Box
        sx={{
          minHeight: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'secondary.dark',
          color: 'white',
          fontWeight: 500,
        }}
      >
        <Typography variant="h5" fontWeight={500} color="white">
          Total: ${totalPrice}
        </Typography>
      </Box>
      <LoadingCart />
    </Box>
  );
};
