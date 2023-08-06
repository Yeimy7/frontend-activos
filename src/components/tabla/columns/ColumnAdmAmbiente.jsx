import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AmbienteContext from '../../../context/ambientes/ambienteContext';

export const ColumnAdmAmbiente = ({ datosAmbiente }) => {
  const ambientesContext = useContext(AmbienteContext);
  const { eliminarAmbiente, seleccionarAmbiente } = ambientesContext;

  const { codigo_ambiente, tipo_ambiente } = datosAmbiente;
  
  const handleEditarAmbiente = () => {
    seleccionarAmbiente(datosAmbiente.id_ambiente);
  };
  const handleEliminarAmbiente = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar el ambiente ${codigo_ambiente}? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarAmbiente(datosAmbiente.id_ambiente);
        Swal.fire({
          icon: 'success',
          title: 'Ambiente eliminado',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  return (
    <tr>
      <td>{codigo_ambiente}</td>
      <td>{tipo_ambiente}</td>
      <td>
        <button
          className="btn btn-success me-2"
          title="Editar área"
          onClick={() => handleEditarAmbiente()}
        >
          <i className=" me-1">
            <FaPencilAlt />
          </i>
        </button>
        <button
          className="btn btn-danger"
          title="Borrar área"
          onClick={() => handleEliminarAmbiente()}
        >
          <i className=" me-1">
            <FaTrashAlt />
          </i>
        </button>
      </td>
    </tr>
  );
};
