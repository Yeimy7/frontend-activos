import Swal from 'sweetalert2';

export const muestraMensaje = (msj, icon = 'success') => {
  Swal.fire({
    icon,
    html: `
    <p>${msj}</p>
      `,
    showConfirmButton: false,
    timer: 3000,
  });
};