import React, { useContext } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { BsImageFill } from 'react-icons/bs';
import { FiMove } from 'react-icons/fi';
import ActivoContext from '../../../context/activos/activoContext';

export const ActivoControllers = ({ datosActivo }) => {
  const activoContext = useContext(ActivoContext);
  const {
    seleccionarActivoBaja,
    editarImagen,
    seleccionarActivo,
    seleccionarActivoTraslado,
  } = activoContext;

  const { id_activo } = datosActivo;

  const handleEditarActivo = () => {
    seleccionarActivo(id_activo);
  };
  const handleCambiarImagenActivo = () => {
    editarImagen(id_activo);
  };
  const handleTrasladarActivo = () => {
    seleccionarActivoTraslado(id_activo);
  };
  const handleEliminarActivo = () => {
    seleccionarActivoBaja(id_activo);
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        title="Cambiar imagen activo"
        onClick={() => handleCambiarImagenActivo()}
      >
        <i className=" me-1">
          <BsImageFill />
        </i>
      </button>

      <button
        className="btn btn-success mx-2"
        title="Editar activo"
        onClick={() => handleEditarActivo()}
      >
        <i className=" me-1">
          <FaPencilAlt />
        </i>
      </button>
      <button
        className="btn btn-secondary me-2"
        title="Trasladar activo"
        onClick={() => handleTrasladarActivo()}
      >
        <i className=" me-1">
          <FiMove />
        </i>
      </button>
      <button
        className="btn btn-danger"
        title="Dar baja a activo"
        onClick={() => handleEliminarActivo()}
      >
        <i className=" me-1">
          <FaTrashAlt />
        </i>
      </button>
    </div>
  );
};
