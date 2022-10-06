import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { BsImageFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import ActivoContext from '../../../context/activos/activoContext';

export const ActivoControllers = ({ datosActivo }) => {
  const activoContext = useContext(ActivoContext);
  const {  eliminarActivo, editarImagen, seleccionarActivo } =
    activoContext;

  const { id_activo } = datosActivo;

  const handleEditarActivo = () => {
    seleccionarActivo(id_activo);
  };
  const handleCambiarImagenActivo = () => {
    editarImagen(id_activo);
  };
  const handleEliminarActivo = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h3>¿Desea eliminar el activo <b> ${datosActivo.descripcion_activo}</b>? </h3>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarActivo(id_activo);
        Swal.fire({
          icon: 'success',
          title: 'Activo eliminado',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        title="Cambiar imagen activo"
        onClick={() => handleCambiarImagenActivo()}
      >
        <i className=" me-1">
          <BsImageFill />
        </i>
      </button>

      <button
        className="btn btn-success mx-2"
        title="Editar activo"
        onClick={() => handleEditarActivo()}
      >
        <i className=" me-1">
          <FaPencilAlt />
        </i>
      </button>
      <button
        className="btn btn-danger"
        title="Dar baja a activo"
        onClick={() => handleEliminarActivo()}
      >
        <i className=" me-1">
          <FaTrashAlt />
        </i>
      </button>
    </div>
  );
};
