import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ActivoContext from '../context/activos/activoContext';

export const CodigoActivo = ({ activo }) => {

  // //Obtener la funcion del context de activo
  const activoContext = useContext(ActivoContext);
  const { eliminarCodigoActivo } = activoContext;

  //Funcion que se ejecuta cuando el usuario presiona eliminar codigo activo
  const handleEliminarCodigo = (activo) => {
    eliminarCodigoActivo(activo);
  };


  return (
    <div className="container my-2">
      <li className="card p-2 cursor">
        <div className="row d-flex justify-content-md-between">
          <div className="col col-lg-2">
            <p>{activo.codigo_activo}</p>
          </div>
          <div className="col col-lg-6">
            <p>{activo.descripcion_activo}</p>
          </div>
          <div className="col col-md-auto">
            <button
              type="button"
              className="btn btn-danger me-1"
              onClick={() => handleEliminarCodigo(activo)}
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
