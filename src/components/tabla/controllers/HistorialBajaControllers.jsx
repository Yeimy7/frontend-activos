import React, { useContext } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import AsignacionContext from '../../../context/asignaciones/asignacionContext';

export const HistorialBajaControllers = ({ datosBaja }) => {
  // const asignacionContext = useContext(AsignacionContext);
  // const { eliminarAsignacion, seleccionarAsignacion } = asignacionContext;

  const { id_baja } = datosBaja;
  const handleGenerarPdfBaja = () => {
    console.log('aca el acta de baja de activo')
  };
  return (
    <div>
      <button
        className="btn btn-danger me-2"
        title="Generar acta de baja de activo"
        onClick={() => handleGenerarPdfBaja()}
      >
        <i className=" me-1">
          <FaFilePdf />
        </i>
      </button>
    </div>
  );
};
