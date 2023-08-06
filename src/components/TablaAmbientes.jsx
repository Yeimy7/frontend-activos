import React, { useContext, useEffect } from 'react';
import AmbienteContext from '../context/ambientes/ambienteContext';
import PisoContext from '../context/pisos/pisoContext';
import { ColumnAdmAmbiente } from './tabla/columns/ColumnAdmAmbiente';
import { ColumnAdmArea } from './tabla/columns/ColumnAdmArea';

export const TablaAmbientes = () => {

  const pisosContext = useContext(PisoContext);
  const { ambientesPiso } = pisosContext;

  // Obtener las pisos del edificio
  const ambientesContext = useContext(AmbienteContext);
  const { ambientes } = ambientesContext;
  
  //Si no hay edificio seleccionado
  if (!ambientesPiso) return <h5 className='text-center fs-6 text-muted'>Seleccione un piso</h5>;


  return (
    <div className="col justify-content-md-center p-0">
      <div className="card table-responsive">
        {!ambientes || ambientes.length === 0 ? (
          <p className="text-center fs-6 text-muted">
            No existen ambientes
          </p>
        ) : (
          <table className="table table-hover  text-nowrap">
            <thead className="table-success">
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ambientes?.map((item) => (
                <ColumnAdmAmbiente key={item.id_ambiente} datosAmbiente={item} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
