import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { STATUS } from '../../../constants';
import {
  setCartTotalItems,
  updateCartPrice,
  updateCartQuantity,
} from '../../../store/cart/CartSlice';
import { startUpdatingCartToDB } from '../../../store/cart/cartThunks';
import { useDebounce } from '../../hooks/useDebounce';

export const ItemCart = () => {
  const { items, status } = useSelector((state) => state.cart);
  const checking = status === STATUS.CHECKING;
  const [item, setItem] = useState(null);
  const debouncedItem = useDebounce(item, 1500);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    const newQuantity = item.quantity + 1;
    setItem({ ...item, quantity: newQuantity });
  };

  const handleRemove = (item) => {
    const newQuantity = item.quantity - 1;
    setItem({ ...item, quantity: newQuantity });
  };

  const handleDelete = (item) => {
    const newQuantity = 0;
    setItem({ ...item, quantity: newQuantity });
  };

  const handleItemQuantity = (event, item) => {
    const parsedInput = parseInt(event.target.value);

    if (parsedInput < 1 || isNaN(parsedInput)) {
      setItem({ ...item, quantity: 1 });
      return;
    }

    setItem({ ...item, quantity: parsedInput });
  };

  useEffect(() => {
    if (item) dispatch(updateCartQuantity(item));
  }, [item]);

  useEffect(() => {
    if (!item) return;
    dispatch(updateCartPrice());
    dispatch(setCartTotalItems());
    dispatch(startUpdatingCartToDB(items));
  }, [debouncedItem]);

  return (
    <>
      {items.length === 0 && (
        <Box
          sx={{
            margin: 'auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <ProductionQuantityLimitsIcon
            color="error"
            sx={{ fontSize: '80px' }}
          />
          <Typography variant="h6">Empty Cart</Typography>
        </Box>
      )}
      {items.map((item) => {
        return (
          <Grid
            key={item.product.id}
            container
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
              backgroundColor: 'white',
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
              borderRadius: 5,
              m: 1,
            }}
          >
            <Grid
              p={1}
              size={3}
              component="img"
              src={item.product.thumbnail}
            ></Grid>
            <Grid p={1} size={3}>
              <Typography
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  whiteSpace: 'normal', // permite saltos de línea
                  overflowWrap: 'break-word', // rompe la palabra si es muy larga
                }}
              >
                {item.product.title}
              </Typography>
            </Grid>
            <Grid p={1} size={2}>
              <Typography
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  whiteSpace: 'normal', // permite saltos de línea
                  overflowWrap: 'break-word', // rompe la palabra si es muy larga
                }}
              >
                ${item.product.price}
              </Typography>
            </Grid>
            <Grid
              p={1}
              size={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                id={item.product.id}
                disabled={checking}
                value={item.quantity}
                onChange={(event) => handleItemQuantity(event, item)}
                type="number"
                size="small"
                slotProps={{
                  input: {
                    sx: {
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                    },
                  },
                }}
                sx={{
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                  },
                  '& input[type=number]::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                  '& input[type=number]::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                }}
              />
            </Grid>
            <Grid
              p={1}
              size={2}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton onClick={() => handleAdd(item)} size="small">
                <AddCircleIcon
                  color="primary"
                  sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                />
              </IconButton>
              <IconButton onClick={() => handleRemove(item)} size="small">
                <RemoveCircleIcon
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  }}
                />
              </IconButton>
              <IconButton onClick={() => handleDelete(item)} size="small">
                <CancelIcon
                  sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                  color="error"
                />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};
