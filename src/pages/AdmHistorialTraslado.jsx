import React, { useContext, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { historialTrasladoColumns } from '../components/tabla/columns/Columns';
import TrasladoContext from '../context/traslados/trasladoContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmHistorialTraslado = () => {
  const trasladoContext = useContext(TrasladoContext);
  const { traslados, mensaje_traslado, obtenerTraslados} = trasladoContext;

  const [itemsHistorialTraslado, setItemsHistorialTraslado] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje_traslado) {
      muestraMensaje(mensaje_traslado.msg, mensaje_traslado.type)
    }
    obtenerTraslados();
  }, [mensaje_traslado]);

  useLayoutEffect(() => {
    setItemsHistorialTraslado(traslados);
    }, [traslados]);

  const [buscarTraslado, setBuscarTraslado] = useState('');

  const handleInputChange = (e) => {
    setBuscarTraslado(e.target.value);
    filtrarTraslados(e.target.value);
  };

  const filtrarTraslados = (val) => {
    const items = traslados?.filter((traslado) =>
      traslado['activo.descripcion_activo']
        .toLowerCase()
        .includes(val.toLowerCase())
    );
    setItemsHistorialTraslado(items);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>Historial de traslados</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar activo</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese la descripcion del activo"
                  name="buscarTraslado"
                  value={buscarTraslado}
                  onChange={handleInputChange}
                />
                <button
                  className="btn btn-light"
                  type="button"
                  id="button-addon2"
                >
                  <i className="">
                    <FaSearch />
                  </i>
                </button>
              </div>
            </div>
            <div className="card-body table-responsive">
              {!itemsHistorialTraslado ||
              itemsHistorialTraslado.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen traslados registrados
                </p>
              ) : (
                <Tabla
                  data={itemsHistorialTraslado}
                  columns={historialTrasladoColumns}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
