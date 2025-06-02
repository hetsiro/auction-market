import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

export const TypographyDebug = () => {
  const theme = useTheme();

  useEffect(() => {
    console.log('Typography Variants:', theme.typography);
  }, [theme]);

  return null;
};
