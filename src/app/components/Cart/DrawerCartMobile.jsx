import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, MenuItem } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startUpdatingCartToDB } from '../../../store/cart/cartThunks';
import { DrawerList } from './DrawerList';

export const DrawerCartMobile = ({ handleMobileMenuClose }) => {
  const { items, totalItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items && open === false) {
      dispatch(startUpdatingCartToDB(items));
    }
  }, [open]);

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

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <DrawerList />
      </Drawer>
    </>
  );
};
