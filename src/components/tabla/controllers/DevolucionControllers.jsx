import React, { useContext } from 'react';
import { TbUnlink } from 'react-icons/tb';
import ActivoContext from '../../../context/activos/activoContext';

export const DevolucionControllers = ({ datosDevolucion }) => {
  const activoContext = useContext(ActivoContext);
  const {  seleccionarActivoADevolver } = activoContext;

  const { id_activo } = datosDevolucion;
  const handleHabilitarDevolucion = () => {
    seleccionarActivoADevolver(id_activo)
  };
  return (
    <div>
      <button
        className="btn btn-danger btn-sm me-2 "
        title="Desvincular activo"
        onClick={() => handleHabilitarDevolucion()}
      >
        <i className=" me-1">
          <TbUnlink />
        </i>
        Desvincular
      </button>
    </div>
  );
};
