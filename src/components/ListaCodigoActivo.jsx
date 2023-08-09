import React, { useContext } from 'react';
import { CodigoActivo } from './CodigoActivo';
import ActivoContext from '../context/activos/activoContext';

export const ListaCodigoActivos = () => {
  const activoContext = useContext(ActivoContext);
  const { codigoActivos } = activoContext;

  //Si no hay edificio seleccionado
  if (!codigoActivos) return <h5 className='text-center fs-6 text-muted'>Seleccione un activo</h5>;

  return (
    <>
      <ul className="col justify-content-md-center p-0">
        {!codigoActivos || codigoActivos.length === 0 ? (
          <p className="text-center fs-6 text-muted">
            Seleccione un activo 
          </p>
        ) : (
          codigoActivos?.map((codigoActivo) => <CodigoActivo activo={codigoActivo} key={codigoActivo.id_activo} />)
        )}
      </ul>
    </>
  );
};
