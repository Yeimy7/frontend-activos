import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import EmpleadoContext from '../../../context/empleados/empleadoContext';

export const EmpleadoControllers = ({ datosEmpleado }) => {
  const empleadoContext = useContext(EmpleadoContext);
  const { eliminarEmpleado, seleccionarEmpleado } = empleadoContext;

  const { id_persona, nombres, apellidos } = datosEmpleado;
  const handleEditarEmpleado = () => {
    seleccionarEmpleado(id_persona);
  };
  const handleEliminarEmpleado = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar al empleado <b> ${nombres} ${apellidos}</b>? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEmpleado(id_persona);
        Swal.fire({
          icon: 'success',
          title: 'Empleado eliminado',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  return (
    <div>
      <button
        className="btn btn-success me-2"
        title="Editar empleado"
        onClick={() => handleEditarEmpleado()}
      >
        <i className=" me-1">
          <FaPencilAlt />
        </i>
      </button>
      <button
        className="btn btn-danger"
        title="Borrar empleado"
        onClick={() => handleEliminarEmpleado()}
      >
        <i className=" me-1">
          <FaTrashAlt />
        </i>
      </button>
    </div>
  );
};
