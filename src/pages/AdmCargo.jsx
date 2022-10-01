import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ModalRegistrarEditarCargo } from '../components/modals/ModalRegistrarEditarCargo';
import { Tabla } from '../components/tabla/Tabla';
import { cargoColumns } from '../components/tabla/columns/Columns';
// import { ColumnAdmCargo } from '../components/tabla/columns/ColumnAdmCargo';
import AlertaContext from '../context/alertas/alertaContext';
import CargoContext from '../context/cargos/cargoContext';
import { useLayoutEffect } from 'react';

export const AdmCargo = () => {
  const cargoContext = useContext(CargoContext);
  const { cargos, cargo, mensaje, obtenerCargos } = cargoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [modalCrearCargo, setModalCrearCargo] = useState(false);
  const [itemsCargo, setItemsCargo] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (cargo) {
      setModalCrearCargo(true);
    }
    obtenerCargos();
  }, [mensaje, cargo]);

  useLayoutEffect(() => {
    setItemsCargo(cargos);
  }, [cargos]);

  const [buscarCargo, setBuscarCargo] = useState('');

  const handleInputChange = (e) => {
    setBuscarCargo(e.target.value);
    filtrarCargos(e.target.value);
  };

  const filtrarCargos = (val) => {
    const items = cargos?.filter((cargo) =>
      cargo.descripcion_cargo.toLowerCase().includes(val.toLowerCase())
    );
    setItemsCargo(items);
  };

  const columns = cargoColumns;

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
                Gestión cargo
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCrearCargo(true)}
                >
                  Nuevo
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarCargo
        stateModal={modalCrearCargo}
        setStateModal={setModalCrearCargo}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar cargo</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre del cargo"
                  name="buscarCargo"
                  value={buscarCargo}
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
              {!itemsCargo || itemsCargo.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen cargos registrados
                </p>
              ) : (
                <Tabla data={itemsCargo} columns={columns} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
