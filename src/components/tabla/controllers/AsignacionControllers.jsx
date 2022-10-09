import React, { useContext } from 'react';
import { FaFilePdf, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import AsignacionContext from '../../../context/asignaciones/asignacionContext';

export const AsignacionControllers = ({ datosAsignacion }) => {
  // const asignacionContext = useContext(AsignacionContext);
  // const { eliminarAsignacion, seleccionarAsignacion } = asignacionContext;

  const { id_activo } = datosAsignacion;
  const handleGenerarPdfAsignacion = () => {
    console.log('aca el acta de asignacion')
  };
  return (
    <div>
      <button
        className="btn btn-danger me-2"
        title="Generar acta de asignacion"
        onClick={() => handleGenerarPdfAsignacion()}
      >
        <i className=" me-1">
          <FaFilePdf />
        </i>
      </button>
    </div>
  );
};
