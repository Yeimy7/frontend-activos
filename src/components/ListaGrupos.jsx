import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
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
    mensaje,
    limpiarListaGrupos,
  } = listaContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [id_grupo, setId_grupo] = useState('');

  const [listaDatos, setListaDatos] = useState([]);

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerGrupos();
    obtenerPorGrupo(id_grupo);
  }, [mensaje, id_grupo]);

  useLayoutEffect(() => {
    setListaDatos(listaGrupos);
  }, [listaGrupos]);

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
                    setId_grupo(e.target.value);
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