import Swal from 'sweetalert2'

export const handleModal = () => {
    Swal.fire({
        icon: 'info',
        title: 'Alerta',
        html: `<p>Hola mundo, <b>bonito</b> día</p>`
    })
};
export function handleError(message){
    return Swal.fire('Error', message, 'error')
}

export function showSuccess(message){
    return Swal.fire('Listo', message, 'success')
}