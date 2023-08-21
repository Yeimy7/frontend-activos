import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { historialDevolucionColumns } from '../components/tabla/columns/Columns';
import { useLayoutEffect } from 'react';
import DevolucionContext from '../context/devolucion/devolucionContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmHistorialDevolucion = () => {
  const devolucionContext = useContext(DevolucionContext);
  const { devoluciones, mensaje_devolucion, obtenerDevoluciones} = devolucionContext;

  const [itemsHistorialDevolucion, setItemsHistorialDevolucion] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje_devolucion) {
      muestraMensaje(mensaje_devolucion.msg, mensaje_devolucion.type)
    }
    obtenerDevoluciones();
  }, [mensaje_devolucion]);

  useLayoutEffect(() => {
    setItemsHistorialDevolucion(devoluciones);
  }, [devoluciones]);

  const [buscarDevolucion, setBuscarDevolucion] = useState('');

  const handleInputChange = (e) => {
    setBuscarDevolucion(e.target.value);
    filtrarDevoluciones(e.target.value);
  };

  const filtrarDevoluciones = (val) => {
    const items = devoluciones?.filter((devolucion) =>
      devolucion['activo.descripcion_activo'].toLowerCase().includes(val.toLowerCase())
    );
    setItemsHistorialDevolucion(items);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>Historial de devolución</h1>
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
                  name="buscarDevolucion"
                  value={buscarDevolucion}
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
              {!itemsHistorialDevolucion ||
              itemsHistorialDevolucion.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen devoluciones registradas
                </p>
              ) : (
                <Tabla
                  data={itemsHistorialDevolucion}
                  columns={historialDevolucionColumns}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
