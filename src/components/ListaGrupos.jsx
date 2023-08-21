import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ListaContext from '../context/listas/listaContext';
import { Tabla } from '../components/tabla/Tabla';
import { porCustodios } from '../components/tabla/columns/Columns';

export const ListaGrupos = () => {
  const listaContext = useContext(ListaContext);
  const {
    obtenerGrupos,
    grupos,
    obtenerPorGrupo,
    listaGrupos,
    limpiarListaGrupos,
    grupo,
    establecerGrupo,
  } = listaContext;

  const [listaDatos, setListaDatos] = useState([]);

  useEffect(() => {
    obtenerGrupos();
    obtenerPorGrupo(grupo);
  }, [grupo]);

  useLayoutEffect(() => {
    setListaDatos(listaGrupos);
  }, [listaGrupos]);

  const handleEstablecerGrupo = (e) => {
    establecerGrupo(e.target.value);
  };
  return (
    <div>
      <div className="card card-success">
        <div className="card-header">
          <div className="card-title">Busca grupo contable</div>
          <div className="input-group">
            {grupos ? (
              <div className="col-12">
                <select
                  className="form-select"
                  id="grupos"
                  aria-label="Default select example"
                  defaultValue={'Seleccione grupo'}
                  onChange={(e) => {
                    handleEstablecerGrupo(e);
                  }}
                >
                  <option value={'Seleccione grupo'}>Seleccione grupo</option>
                  {grupos.map((grupo) => (
                    <option key={grupo.id_grupo} value={`${grupo.id_grupo}`}>
                      {grupo.descripcion_g}
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
