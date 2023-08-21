import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { asignacionColumns } from '../components/tabla/columns/Columns';
import { ModalRegistrarAsignacion } from '../components/modals/ModalRegistrarAsignacion';
import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmAsignacion = () => {
  const activoContext = useContext(ActivoContext);
  const { activosAsignados, mensaje, obtenerActivosAsignados } = activoContext;

  const [modalCrearAsignacion, setModalCrearAsignacion] = useState(false);
  const [itemsAsignacion, setItemsAsignacion] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.type)
    }
    obtenerActivosAsignados();
  }, [mensaje]);

  useLayoutEffect(() => {
    setItemsAsignacion(activosAsignados);
  }, [activosAsignados]);

  const [buscarAsignacion, setBuscarAsignacion] = useState('');

  const handleInputChange = (e) => {
    setBuscarAsignacion(e.target.value);
    filtrarAsignaciones(e.target.value);
  };

  const filtrarAsignaciones = (val) => {
    const items = activosAsignados?.filter((asignacion) =>
      asignacion.descripcion_activo.toLowerCase().includes(val.toLowerCase())
    );
    setItemsAsignacion(items);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>
                Asignación de activos
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCrearAsignacion(true)}
                >
                  Asignar
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarAsignacion
        stateModal={modalCrearAsignacion}
        setStateModal={setModalCrearAsignacion}
      />
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
                  name="buscarAsignacion"
                  value={buscarAsignacion}
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
              {!itemsAsignacion || itemsAsignacion.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen asignaciones registradas
                </p>
              ) : (
                <Tabla data={itemsAsignacion} columns={asignacionColumns} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
