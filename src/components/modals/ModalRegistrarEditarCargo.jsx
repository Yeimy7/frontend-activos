import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import CargoContext from '../../context/cargos/cargoContext';
import AreaContext from '../../context/areas/areaContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarCargo = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context

  const areaContext = useContext(AreaContext);
  const { obtenerAreas, areas, mensaje } = areaContext;

  const cargoContext = useContext(CargoContext);
  const {
    cargo,
    registrarCargo,
    limpiarCargo,
    actualizarCargo,
  } = cargoContext;

  const [descripcion_cargo, setDescripcion_cargo] = useState('');
  const [nombre_area, setNombre_area] = useState('');

  useEffect(() => {
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.type)
    }
    if (cargo) {
      setDescripcion_cargo(cargo[0].descripcion_cargo);
      setNombre_area(cargo[0]['area.nombre_area']);
    }
    if (!cargo) {
      obtenerAreas();
    }
  }, [mensaje, cargo]);

  const handleInputChange = ({ target }) => {
    setDescripcion_cargo(target.value);
  };

  const reset = () => {
    setDescripcion_cargo('');
    setNombre_area('Seleccione área');
  };

  const handleCrearCargo = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (nombre_area.trim() === '' || descripcion_cargo.trim() === '') {
      muestraMensaje('Los campos * son obligatorios', 'error')
      return;
    }

    if (descripcion_cargo.length < 3) {
      muestraMensaje('Introduzca un cargo válido', 'error')
      return;
    }
    registrarCargo({
      descripcion_cargo,
      nombre_area,
    });
    reset();
    handleClose();
  };

  const handleEditarCargo = (e) => {
    e.preventDefault();
    if (descripcion_cargo && descripcion_cargo.length < 3) {
      muestraMensaje('Introduzca cargo válido', 'error')
      return;
    }
    if (cargo[0].descripcion_cargo !== descripcion_cargo) {
      actualizarCargo({
        id_cargo: cargo[0].id_cargo,
        descripcion_cargo: descripcion_cargo,
      });
      handleClose();
    }
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    if (cargo) limpiarCargo();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${cargo ? 'Editar cargo' : 'Registrar cargo'}`}
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={cargo ? handleEditarCargo : handleCrearCargo}
          >
            <div className=" col-12">
              <label htmlFor="descripcion_cargo" className="form-label">
                Descripción del cargo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion_cargo"
                name="descripcion_cargo"
                placeholder="Ingrese descripción del cargo"
                autoComplete="off"
                value={descripcion_cargo}
                onChange={handleInputChange}
              />
            </div>
            {!cargo && areas ? (
              <div className="col-12">
                <label htmlFor="nombre_area" className="form-label">
                  Nombre de área <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="nombre_area"
                  aria-label="Default select example"
                  defaultValue={'Seleccione área'}
                  onChange={(e) => {
                    setNombre_area(e.target.value);
                  }}
                >
                  <option value={'Seleccione área'}>Seleccione área</option>
                  {areas.map((area, index) => (
                    <option key={index} value={area.nombre_area}>
                      {area.nombre_area}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {cargo ? 'Editar' : 'Registrar'}
                </button>
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={handleClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
