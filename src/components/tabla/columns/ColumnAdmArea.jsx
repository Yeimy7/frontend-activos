import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AreaContext from '../../../context/areas/areaContext';

export const ColumnAdmArea = ({ datosArea }) => {
  const areaContext = useContext(AreaContext);
  const { eliminarArea, seleccionarArea } = areaContext;

  const { nombre_area, codigo_area } = datosArea;
  const handleEditarArea = () => {
    seleccionarArea(datosArea.id_area);
  };
  const handleEliminarArea = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar el área ${nombre_area}? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarArea(datosArea.id_area);
      }
    });
  };
  return (
    <tr>
      <td>{nombre_area}</td>
      <td>{codigo_area}</td>
      <td>
        <button
          className="btn btn-success me-2"
          title="Editar área"
          onClick={() => handleEditarArea()}
        >
          <i className=" me-1">
            <FaPencilAlt />
          </i>
        </button>
        <button
          className="btn btn-danger"
          title="Borrar área"
          onClick={() => handleEliminarArea()}
        >
          <i className=" me-1">
            <FaTrashAlt />
          </i>
        </button>
      </td>
    </tr>
  );
};
