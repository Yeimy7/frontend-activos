import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import ListaContext from '../context/listas/listaContext';
import { Tabla } from '../components/tabla/Tabla';
import { porCustodios } from '../components/tabla/columns/Columns';

export const ListaEntidades = () => {
  const listaContext = useContext(ListaContext);
  const {
    obtenerEntidades,
    entidades,
    obtenerPorEntidad,
    listaEntidades,
    mensaje,
    limpiarListaEntidades,
    entidad,
    establecerEntidad,
  } = listaContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [listaDatos, setListaDatos] = useState([]);

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerEntidades();
    obtenerPorEntidad(entidad);
  }, [mensaje, entidad]);

  useLayoutEffect(() => {
    setListaDatos(listaEntidades);
  }, [listaEntidades]);

  const handleEstablecerEntidad = (e) => {
    establecerEntidad(e.target.value);
  };
  return (
    <div>
      <div className="card card-success">
        <div className="card-header">
          <div className="card-title">Busca entidad</div>
          <div className="input-group">
            {entidades ? (
              <div className="col-12">
                <select
                  className="form-select"
                  id="entidades"
                  aria-label="Default select example"
                  defaultValue={'Seleccione entidad'}
                  onChange={(e) => {
                    handleEstablecerEntidad(e);
                  }}
                >
                  <option value={'Seleccione entidad'}>
                    Seleccione entidad
                  </option>
                  {entidades.map((entidad) => (
                    <option
                      key={entidad.id_proveedor}
                      value={`${entidad.id_proveedor}`}
                    >
                      {entidad.razon_social}
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
