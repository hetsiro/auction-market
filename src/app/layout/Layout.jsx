import { Box } from '@mui/material';

export const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f7f9fb',
        minWidth: '320px',
      }}
    >
      <Box
        className="animate__animated animate__fadeIn"
        sx={{
          display: 'flex',
          minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
          py: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          width: '90%',
          maxWidth: '1280px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
