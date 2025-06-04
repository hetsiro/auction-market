import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';

import { STATUS } from '../../../constants';
import {
  addToCart,
  setCartTotalItems,
  updateCartPrice,
} from '../../../store/cart/CartSlice';
import { startUpdatingCartToDB } from '../../../store/cart/cartThunks';

export function ItemButton({ item }) {
  const { items, status } = useSelector((state) => state.cart);
  const checking = status === STATUS.CHECKING;
  const success = status === STATUS.SUCCESS;

  const theme = useTheme();

  const dispatch = useDispatch();

  const buttonSx = {
    bgcolor: theme.palette.secondary.main,
    // color: 'white',
    ...(success && {
      '&:hover': {
        bgcolor: theme.palette.secondary.light,
      },
    }),
    width: '100%',
  };

  const handleButtonClick = () => {
    dispatch(addToCart(item));
    dispatch(startUpdatingCartToDB());
    dispatch(updateCartPrice());
    dispatch(setCartTotalItems());
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative', width: '100%' }}>
        <Button
          size="large"
          variant="contained"
          sx={buttonSx}
          disabled={checking}
          onClick={handleButtonClick}
        >
          ADD TO CART
        </Button>
        {checking && (
          <CircularProgress
            size={24}
            sx={{
              color: theme.palette.secondary.main,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
