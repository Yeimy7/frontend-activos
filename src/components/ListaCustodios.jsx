import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import ListaContext from '../context/listas/listaContext';
import { Tabla } from '../components/tabla/Tabla';
import { porCustodios } from '../components/tabla/columns/Columns';

export const ListaCustodios = () => {
  const listaContext = useContext(ListaContext);
  const {
    obtenerCustodios,
    custodios,
    obtenerPorCustodio,
    listaCustodios,
    mensaje,
    limpiarListaCustodios,
    custodio,
    establecerCustodio,
  } = listaContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  // const [id_custodio, setId_custodio] = useState('');

  const [listaDatos, setListaDatos] = useState([]);

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerCustodios();
    obtenerPorCustodio(custodio);
  }, [mensaje, custodio]);

  useLayoutEffect(() => {
    setListaDatos(listaCustodios);
  }, [listaCustodios]);

  const handleEstablecerCustodio = (e) => {
    establecerCustodio(e.target.value);
  };
  return (
    <div>
      <div className="card card-success">
        <div className="card-header">
          <div className="card-title">Busca custodio</div>
          <div className="input-group">
            {custodios ? (
              <div className="col-12">
                <select
                  className="form-select"
                  id="custodios"
                  aria-label="Default select example"
                  defaultValue={'Seleccione custodio'}
                  onChange={(e) => {
                    handleEstablecerCustodio(e);
                  }}
                >
                  <option value={'Seleccione custodio'}>
                    Seleccione custodio
                  </option>
                  {custodios.map((custodio) => (
                    <option
                      key={custodio.id_persona}
                      value={`${custodio.id_persona}`}
                    >
                      {`${custodio.nombres} ${custodio.apellidos}`}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
        </div>
        <div className="card-body table-responsive">
          {!listaDatos || listaDatos.length === 0 ? (
            <p className="text-center fs-6 text-muted">
              No existen datos encontrados
            </p>
          ) : (
            <Tabla data={listaDatos} columns={porCustodios} />
          )}
        </div>
      </div>
    </div>
  );
};
