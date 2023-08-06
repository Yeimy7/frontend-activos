import React, { useContext } from 'react';
import EdificioContext from '../context/edificios/edificioContext';
import PisoContext from '../context/pisos/pisoContext';
import { Piso } from './Piso';

export const ListaPisos = () => {
  const edificiosContext = useContext(EdificioContext);
  const { pisosEdificio } = edificiosContext;

  // Obtener las pisos del edificio
  const pisosContext = useContext(PisoContext);
  const { pisos } = pisosContext;
  
  //Si no hay edificio seleccionado
  if (!pisosEdificio) return <h5 className='text-center fs-6 text-muted'>Seleccione un edificio</h5>;


  return (
    <>
      <ul className="col justify-content-md-center p-0">
        {!pisos || pisos.length === 0 ? (
          <p className="text-center fs-6 text-muted">
            No existen pisos 
          </p>
        ) : (
          pisos?.map((piso) => <Piso piso={piso} key={piso.id_piso} />)
        )}
      </ul>
    </>
  );
};
