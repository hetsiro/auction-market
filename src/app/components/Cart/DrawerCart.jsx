import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startUpdatingCartToDB } from '../../../store/cart/cartThunks';
import { DrawerList } from './DrawerList';

export const DrawerCart = () => {
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
        <DrawerList />
      </Drawer>
    </>
  );
};
