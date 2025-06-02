import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingCart } from './';
import { STATUS } from '../../../constants/status';
import {
  setCartTotalItems,
  updateCartPrice,
  updateCartQuantity,
} from '../../../store/cart/CartSlice';
import { startUpdatingCartToDB } from '../../../store/cart/cartThunks';
import { useDebounce } from '../../hooks';

export function DrawerCart({ handleMobileMenuClose }) {
  const { items, totalPrice, totalItems, status } = useSelector(
    (state) => state.cart
  );
  const checking = status === STATUS.CHECKING;
  const [open, setOpen] = useState(false);
  const [inputsQuantity, setInputsQuantity] = useState({});
  const debouncedInputsQuantity = useDebounce(inputsQuantity, 1500);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    const newQuantity = item.quantity + 1;

    setInputsQuantity((inputsQuantity) => {
      return {
        ...inputsQuantity,
        [item.product.id]: newQuantity,
      };
    });

    dispatch(
      updateCartQuantity({ product: item.product, quantity: newQuantity })
    );
  };

  const handleRemove = (item) => {
    const newQuantity = item.quantity - 1;

    setInputsQuantity((inputsQuantity) => {
      return {
        ...inputsQuantity,
        [item.product.id]: newQuantity,
      };
    });

    dispatch(
      updateCartQuantity({ product: item.product, quantity: newQuantity })
    );
  };

  const handleDelete = (item) => {
    const newQuantity = 0;

    setInputsQuantity((inputsQuantity) => ({
      ...inputsQuantity,
      [item.product.id]: newQuantity,
    }));

    dispatch(
      updateCartQuantity({ product: item.product, quantity: newQuantity })
    );
  };

  const handleItemQuantity = (event, item) => {
    const parsedInput = parseInt(event.target.value);

    if (parsedInput < 1 || isNaN(parsedInput)) {
      setInputsQuantity((inputsQuantity) => ({
        ...inputsQuantity,
        [item.product.id]: 1,
      }));

      dispatch(updateCartQuantity({ product: item.product, quantity: 1 }));
      return;
    }

    setInputsQuantity((inputsQuantity) => ({
      ...inputsQuantity,
      [item.product.id]: parsedInput,
    }));

    dispatch(
      updateCartQuantity({ product: item.product, quantity: parsedInput })
    );
  };

  useEffect(() => {
    items.forEach((item) => {
      setInputsQuantity((inputsQuantity) => ({
        ...inputsQuantity,
        [item.product.id]: item.quantity,
      }));
    });
  }, [items]);

  useEffect(() => {
    dispatch(updateCartPrice());
    dispatch(setCartTotalItems());
    dispatch(startUpdatingCartToDB(items));
  }, [debouncedInputsQuantity]);

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
                  value={inputsQuantity[item.product.id]}
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
}
