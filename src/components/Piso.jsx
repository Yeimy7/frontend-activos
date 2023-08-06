import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import AmbienteContext from '../context/ambientes/ambienteContext';
import PisoContext from '../context/pisos/pisoContext';

export const Piso = ({ piso }) => {
  //Obtener la funcion del context de piso
  const pisosContext = useContext(PisoContext);
  const { eliminarPiso, seleccionarPiso, seleccionarAmbientesPiso } =
    pisosContext;

  //Obtener la funcion del context de ambiente
  const ambientesContext = useContext(AmbienteContext);
  const { obtenerAmbientes, limpiarAmbiente } = ambientesContext;

  //Funcion que se ejecuta cuando el usuario presiona eliminar piso
  const pisoEliminar = (id) => {
    Swal.fire({
      icon: 'warning',
      html: `<h1>¿Desea eliminar el piso ${piso.codigo_piso}? </h1>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPiso(id);
        Swal.fire({
          icon: 'success',
          title: 'Piso eliminado',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  //Agrega una piso actual cuando el usuario desea editarla
  const seleccionarPisoActual = (piso) => {
    seleccionarPiso(piso.id_piso);
  };

  const handleObtenerAmbientes = () => {
    seleccionarAmbientesPiso(piso.id_piso);
    limpiarAmbiente();
    obtenerAmbientes(piso);
  };
  return (
    <div className="container my-2">
      <li className="card p-2 cursor" onClick={handleObtenerAmbientes}>
        <div className="row d-flex justify-content-md-between">
          <div className="col col-lg-4">
            <p>{piso.codigo_piso}</p>
          </div>
          <div className="col col-md-auto">
            <button
              type="button"
              className="btn btn-success me-1"
              onClick={() => seleccionarPisoActual(piso)}
            >
              <i className=" me-1">
                <FaPencilAlt />
              </i>
            </button>
            <button
              type="button"
              className="btn btn-danger me-1"
              onClick={() => pisoEliminar(piso.id_piso)}
            >
              <i className=" me-1">
                <FaTrashAlt />
              </i>
            </button>
          </div>
        </div>
      </li>
    </div>
  );
};
