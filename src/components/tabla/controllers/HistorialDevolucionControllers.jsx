import React, { useContext } from 'react';
import { FaFilePdf, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import AsignacionContext from '../../../context/asignaciones/asignacionContext';

export const HistorialDevolucionControllers = ({ datosDevolucion }) => {
  // const asignacionContext = useContext(AsignacionContext);
  // const { eliminarAsignacion, seleccionarAsignacion } = asignacionContext;

  const { id_activo } = datosDevolucion;
  const handleGenerarPdfDevolucion = () => {
    console.log('aca el acta de devolucion')
  };
  return (
    <div>
      <button
        className="btn btn-danger me-2"
        title="Generar acta de devolucion"
        onClick={() => handleGenerarPdfDevolucion()}
      >
        <i className=" me-1">
          <FaFilePdf />
        </i>
      </button>
    </div>
  );
};
