import Swal from 'sweetalert2';

export const SweetAlertRecoverySuccess = (data) => {
  return Swal.fire({
    title: '<strong>Password Changed successfully</strong>',
    icon: 'success',
    html: `<a href="${data}">Login</a>`,
  });
};
