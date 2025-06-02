import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Inter, Roboto',
  },
  palette: {
    primary: {
      main: '#0061c7',
      light: '#00c7ff',
      ultraLight: '#daf5f6',
      dark: '#023047',
    },
    secondary: {
      main: '#edb1ff',
      light: '#f4cfff',
      ultraLight: '#f7dcff',
      dark: 'purple',
    },
  },
});
