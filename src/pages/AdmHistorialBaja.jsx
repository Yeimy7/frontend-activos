import React, { useContext, useEffect, useState } from 'react';
import { useLayoutEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { historialBajaColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
import BajaContext from '../context/bajas/bajaContext';

export const AdmHistorialBaja = () => {
  const bajaContext = useContext(BajaContext);
  const { bajas, mensaje, obtenerBajas} = bajaContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [itemsHistorialBaja, setItemsHistorialBaja] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerBajas();
  }, [mensaje]);

  useLayoutEffect(() => {
    setItemsHistorialBaja(bajas);
  }, [bajas]);

  const [buscarBaja, setBuscarBaja] = useState('');

  const handleInputChange = (e) => {
    setBuscarBaja(e.target.value);
    filtrarBajas(e.target.value);
  };

  const filtrarBajas = (val) => {
    const items = bajas?.filter((baja) =>
      baja['activo.descripcion_activo'].toLowerCase().includes(val.toLowerCase())
    );
    setItemsHistorialBaja(items);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`} role="alert">
            {alerta.msg}
          </div>
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>Historial de bajas</h1>
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
                  name="buscarBaja"
                  value={buscarBaja}
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
              {!itemsHistorialBaja ||
              itemsHistorialBaja.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen bajas registradas
                </p>
              ) : (
                <Tabla
                  data={itemsHistorialBaja}
                  columns={historialBajaColumns}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
