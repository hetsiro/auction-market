import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { startRecoveryPassword } from '../../../store/auth/authThunks';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

export const RecoveryForm = () => {
  const formik = useFormik({
    initialValues: {
      email: 'test@test.com',
      password: 'Test123.',
    },
    validationSchema: validationSchema,
    onSubmit: ({ email }) => {
      dispatch(startRecoveryPassword(email));
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigateToRegister = () => {
    navigate('/register');
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 2,
      }}
    >
      <Typography variant="h5">Password Recovery</Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
      >
        Recover your password
      </Button>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleNavigateToRegister}
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          {isXs ? 'Login' : 'Go to Login'}
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleNavigateToRegister}
          sx={{ backgroundColor: theme.palette.primary.light }}
        >
          {isXs ? 'Register' : 'GO TO REGISTER'}
        </Button>
      </Box>
    </Box>
  );
};
