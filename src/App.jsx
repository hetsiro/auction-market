import { CssBaseline, ThemeProvider } from '@mui/material';

import { AppRouter } from './router';
import { theme } from './theme/theme';
import './styles.css';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </>
  );
}
