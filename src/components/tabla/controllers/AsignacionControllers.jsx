import React, { useContext } from 'react';
import { FaFilePdf} from 'react-icons/fa';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/axios';

export const AsignacionControllers = ({ datosAsignacion }) => {
  const { id_activo } = datosAsignacion;
  const handleGenerarPdfAsignacion = async () => {
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando acta de Asignación de Activo...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/asignados/pdf',
        { id_activo },
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      //PARA GUARDAR DIRECTAMENTE EL PDF (Pero antes debes instalar file-saver):
      // saveAs(pdfBlob, 'listaActivos.pdf');
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
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
