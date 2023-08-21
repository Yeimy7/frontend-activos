import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import EdificioContext from '../context/edificios/edificioContext';
import PisoContext from '../context/pisos/pisoContext';
import AmbienteContext from '../context/ambientes/ambienteContext';
import { useEffect } from 'react';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const CardEdificio = ({ edificioData }) => {
  const edificioContext = useContext(EdificioContext);
  const {
    eliminarEdificio,
    seleccionarEdificio,
    seleccionarPisosEdificio,
    limpiarPisosEdificio,
  } = edificioContext;

  //Obtener la funcion del context de tarea
  const pisosContext = useContext(PisoContext);
  const { obtenerPisos, limpiarPiso, limpiarAmbientesPiso, mensaje_piso } =
    pisosContext;

  const ambientesContext = useContext(AmbienteContext);
  const { limpiarAmbiente, mensaje_ambiente } = ambientesContext;

  const { nombre_edificio } = edificioData;

  useEffect(() => {
    if (mensaje_piso) {
      muestraMensaje(mensaje_piso.msg, mensaje_piso.type);
    }
    if (mensaje_ambiente) {
      muestraMensaje(mensaje_ambiente.msg, mensaje_ambiente.type);
    }
  }, [mensaje_piso, mensaje_ambiente]);

  const handleUpdateEdificio = () => {
    seleccionarEdificio(edificioData.id_edificio);
  };
  const handleDeleteEdificio = () => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar el edificio ${nombre_edificio}? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEdificio(edificioData.id_edificio);
        limpiarPiso();
        limpiarAmbientesPiso();
        limpiarAmbiente();
        limpiarPisosEdificio();
      }
    });
  };

  const handleObtenerPisos = () => {
    seleccionarPisosEdificio(edificioData.id_edificio);
    limpiarPiso();
    limpiarAmbiente();
    limpiarAmbientesPiso();
    obtenerPisos(edificioData);
  };

  return (
    <div className="col-12 col-sm-12 col-md d-flex justify-content-evenly p-1">
      <div className="card text-bg-light">
        <div
          className="card-header text-muted border-bottom-0 text-bg-light cursor"
          onClick={handleObtenerPisos}
        >
          <span className="badge text-bg-secondary">Edificio</span>
        </div>
        <div className="card-body pt-0 cursor" onClick={handleObtenerPisos}>
          <div className="row">
            <div className="col-12">
              <h2 className="lead">
                <b>{nombre_edificio}</b>
              </h2>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="text-end">
            <button
              className="btn btn-success ms-1 "
              onClick={() => handleUpdateEdificio()}
            >
              <i className=" me-1">
                <FaPencilAlt />
              </i>
            </button>
            <button
              className="btn btn-danger ms-1"
              onClick={() => handleDeleteEdificio()}
            >
              <i className=" me-1">
                <FaTrashAlt />
              </i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
