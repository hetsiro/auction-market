import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as yup from 'yup';

import { startResetPassword } from '../../../store/auth/authThunks';

const validationSchema = yup.object({
  password: yup
    .string('Enter your password')
    .min(8, 'Must be at least 8 characters long')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[\d\W]/, 'Must contain at least one number or symbol')
    .required('Password is required'),

  passwordRepeat: yup
    .string()
    .required('Please repeat your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const ResetPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      password: 'Test123.',
      passwordRepeat: 'Test123.',
    },
    validationSchema: validationSchema,
    onSubmit: ({ password }) => {
      dispatch(startResetPassword({ password, token }));
    },
  });

  const { token } = useParams();
  const dispatch = useDispatch();

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
      <Typography variant="h5">New Password</Typography>
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        fullWidth
        id="passwordRepeat"
        name="passwordRepeat"
        label="Repeat Password"
        type="password"
        value={formik.values.passwordRepeat}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)
        }
        helperText={
          formik.touched.passwordRepeat && formik.errors.passwordRepeat
        }
      />
      <Button
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
      >
        Recover
      </Button>
    </Box>
  );
};
