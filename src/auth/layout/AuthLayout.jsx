import { Box } from '@mui/material';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'primary.dark',
        height: '100vh',
      }}
    >
      <Box
        className="animate__animated animate__fadeIn"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          p: 4,
          borderRadius: 5,
          width: '90%',
          maxWidth: '768px',
          minWidth: '320px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
