import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ModalRegistrarEditarEmpleado } from '../components/modals/ModalRegistrarEditarEmpleado';
import { Tabla } from '../components/tabla/Tabla';
import { empleadoColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
import EmpleadoContext from '../context/empleados/empleadoContext';
import { useLayoutEffect } from 'react';

export const AdmEmpleado = () => {
  const empleadoContext = useContext(EmpleadoContext);
  const { empleados, empleado, mensaje, obtenerEmpleados } = empleadoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [modalCrearEmpleado, setModalCrearEmpleado] = useState(false);
  const [itemsEmpleado, setItemsEmpleado] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (empleado) {
      setModalCrearEmpleado(true);
    }
    obtenerEmpleados();
  }, [mensaje,empleado]);

  useLayoutEffect(() => {
    setItemsEmpleado(empleados);
  }, [empleados]);

  const [buscarEmpleado, setBuscarEmpleado] = useState('');

  const handleInputChange = (e) => {
    setBuscarEmpleado(e.target.value);
    filtrarEmpleados(e.target.value);
  };

  const filtrarEmpleados = (val) => {
    const items = empleados?.filter((empleado) =>
      empleado.nombres.toLowerCase().includes(val.toLowerCase())
    );
    setItemsEmpleado(items);
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
              <h1>
                Gestión empleado
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCrearEmpleado(true)}
                >
                  Nuevo
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarEmpleado
        stateModal={modalCrearEmpleado}
        setStateModal={setModalCrearEmpleado}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar empleado</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre del empleado"
                  name="buscarEmpleado"
                  value={buscarEmpleado}
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
              {!itemsEmpleado || itemsEmpleado.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen empleados registrados
                </p>
              ) : (
                <Tabla data={itemsEmpleado} columns={empleadoColumns} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
