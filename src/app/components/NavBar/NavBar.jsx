import { Logout } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonBase } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { STATUS } from '../../../constants';
import { setAppStatus } from '../../../store/app/AppSlice';
import { authLogout } from '../../../store/auth/AuthSlice';
import { resetCart } from '../../../store/cart/CartSlice';
import { DrawerCart } from '../Cart';
import { DrawerCartMobile } from '../Cart/DrawerCartMobile';

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputSearch = inputRef.current.value;
    if (inputSearch === '') return;
    navigate(`/search/?q=${inputSearch}`);
  };

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(setAppStatus(STATUS.FIRST_LOADING));
    dispatch(resetCart());
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <DrawerCartMobile handleMobileMenuClose={handleMobileMenuClose} />
      <MenuItem
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: 2,
          alignItems: 'center',
        }}
        onClick={() => {
          handleMobileMenuClose();
        }}
      >
        <AccountCircle />
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: 2,
          alignItems: 'center',
        }}
        onClick={() => {
          handleMobileMenuClose();
          dispatch(authLogout());
        }}
      >
        <Logout />
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, minWidth: '320px' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{
              backgroundColor: 'primary.ultraLight',
              borderRadius: '100%',
              display: 'inline-flex',
              mr: 2,
            }}
            onClick={handleNavigateToHome}
          >
            <Box
              component="img"
              src="/van.png"
              sx={{
                height: { xs: '24px', sm: '32px' },
              }}
            />
          </IconButton>
          <ButtonBase onClick={handleNavigateToHome}>
            <Typography
              variant="h5"
              fontWeight={700}
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'white',
                mx: 3,
              }}
            >
              Auction Market
            </Typography>
          </ButtonBase>
          <Search onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              inputRef={inputRef}
              placeholder="Laptop, Apple..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <DrawerCart />
            <IconButton
              size="large"
              aria-label="account of current user"
              onClick={() => {}}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="authLogout current user"
              onClick={handleLogout}
              color="inherit"
            >
              <Logout />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
