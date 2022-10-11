import React, { useContext } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import AsignacionContext from '../../../context/asignaciones/asignacionContext';

export const HistorialTrasladoControllers = ({ datosTraslado }) => {
  // const asignacionContext = useContext(AsignacionContext);
  // const { eliminarAsignacion, seleccionarAsignacion } = asignacionContext;

  const { id_traslado } = datosTraslado;
  const handleGenerarPdfTraslado = () => {
    console.log('aca el acta de traslado de activo')
  };
  return (
    <div>
      <button
        className="btn btn-danger me-2"
        title="Generar acta de traslado de activo"
        onClick={() => handleGenerarPdfTraslado()}
      >
        <i className=" me-1">
          <FaFilePdf />
        </i>
      </button>
    </div>
  );
};
