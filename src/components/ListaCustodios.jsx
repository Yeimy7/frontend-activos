import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
    limpiarListaCustodios,
    custodio,
    establecerCustodio,
  } = listaContext;

  const [listaDatos, setListaDatos] = useState([]);

  useEffect(() => {
    obtenerCustodios();
    obtenerPorCustodio(custodio);
  }, [custodio]);

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
