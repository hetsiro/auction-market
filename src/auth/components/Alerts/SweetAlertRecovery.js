import Swal from 'sweetalert2';

export const SweetAlertRecovery = (data) => {
  return Swal.fire({
    title: '<strong>Recovery Link</strong>',
    icon: 'success',
    html: `<a href="${data}">Click here</a> to recover your password.`,
  });
};
