import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingCart } from './';
import { ItemCart } from './ItemCart';
import {
  setCartTotalItems,
  updateCartPrice,
} from '../../../store/cart/CartSlice';

export const DrawerCart = ({ handleMobileMenuClose }) => {
  const { totalPrice, totalItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCartPrice());
    dispatch(setCartTotalItems());
  }, []);

  const DrawerList = (
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

  return (
    <>
      <MenuItem
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: 2,
          alignItems: 'center',
        }}
        onClick={() => {
          setOpen(true);
          handleMobileMenuClose();
        }}
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
        <p>Cart</p>
      </MenuItem>

      <IconButton
        sx={{ display: { xs: 'none', md: 'block' } }}
        size="large"
        aria-label="show cart counts"
        onClick={() => setOpen(true)}
        color="inherit"
      >
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};
