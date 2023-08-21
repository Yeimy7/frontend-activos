import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import { useForm } from '../../hooks/useForm';
import CargoContext from '../../context/cargos/cargoContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarEmpleado = ({ stateModal, setStateModal }) => {

  const cargoContext = useContext(CargoContext);
  const { obtenerCargos, cargos, mensaje_cargo } = cargoContext;

  const empleadoContext = useContext(EmpleadoContext);
  const {
    empleado,
    registrarEmpleado,
    limpiarEmpleado,
    actualizarEmpleado,
  } = empleadoContext;

  const [fecha_incorporacion, setFecha_incorporacion] = useState('');
  const [descripcion_cargo, setDescripcion_cargo] = useState('');

  useEffect(() => {
    if (mensaje_cargo) {
      muestraMensaje(mensaje_cargo.msg, mensaje_cargo.type)
    }
    if (empleado) {
      setFecha_incorporacion(empleado[0].fecha_incorporacion);
      setDescripcion_cargo(empleado[0]['cargo.descripcion_cargo']);
    }
    if (!empleado) {
      obtenerCargos();
    }
  }, [mensaje_cargo, empleado]);

  const initialForm = {
    nombres: '',
    apellidos: '',
    ci: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { nombres, apellidos, ci } = formValues;

  const handleInputChangeFecha = ({ target }) => {
    setFecha_incorporacion(target.value);
  };

  const resetForm = () => {
    setFecha_incorporacion('');
    setDescripcion_cargo('');
  };

  const handleCrearEmpleado = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (
      nombres.trim() === '' ||
      apellidos.trim() === '' ||
      ci.trim() === '' ||
      descripcion_cargo.trim() === ''
    ) {
      muestraMensaje('Los campos * son obligatorios', 'error')
      return;
    }

    if (
      nombres.length < 2 ||
      apellidos.length < 3 ||
      ci.length < 5 ||
      (fecha_incorporacion && fecha_incorporacion.length < 8) ||
      descripcion_cargo.length < 2
    ) {
      muestraMensaje('Introduzca datos válidos', 'error');
      return;
    }
    registrarEmpleado({
      nombres,
      apellidos,
      ci,
      fecha_incorporacion,
      descripcion_cargo,
    });
    resetForm();
    reset();
    handleClose();
  };

  const handleEditarEmpleado = (e) => {
    e.preventDefault();
    if (fecha_incorporacion && fecha_incorporacion.length < 8) {
      muestraMensaje('Introduzca una fecha válida', 'error');
      return;
    }
    if (
      fecha_incorporacion !== empleado.fecha_incorporacion ||
      descripcion_cargo !== empleado['cargo.descripcion_cargo']
    ) {
      actualizarEmpleado({
        id_persona: empleado[0].id_persona,
        fecha_incorporacion: fecha_incorporacion,
        descripcion_cargo: descripcion_cargo,
      });
    }
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    resetForm();
    if (empleado) limpiarEmpleado();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${empleado ? 'Editar empleado' : 'Registrar empleado'}`}
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={empleado ? handleEditarEmpleado : handleCrearEmpleado}
          >
            {!empleado ? (
              <>
                {' '}
                <div className=" col-12">
                  <label htmlFor="nombres" className="form-label">
                    Nombres <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombres"
                    name="nombres"
                    placeholder="Ingrese nombres"
                    autoComplete="off"
                    value={nombres}
                    onChange={handleInputChange}
                  />
                </div>
                <div className=" col-12">
                  <label htmlFor="apellidos" className="form-label">
                    Apellidos <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Ingrese apellidos"
                    autoComplete="off"
                    value={apellidos}
                    onChange={handleInputChange}
                  />
                </div>
                <div className=" col-12">
                  <label htmlFor="ci" className="form-label">
                    CI <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ci"
                    name="ci"
                    placeholder="Ingrese CI"
                    autoComplete="off"
                    value={ci}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : null}
            <div className=" col-12">
              <label htmlFor="fecha_incorporacion" className="form-label">
                Fecha de Incorporación
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_incorporacion"
                name="fecha_incorporacion"
                placeholder="Ingrese fecha de incorporacion"
                autoComplete="off"
                value={fecha_incorporacion}
                onChange={handleInputChangeFecha}
              />
            </div>
            {cargos ? (
              <div className="col-12">
                <label htmlFor="descripcion_cargo" className="form-label">
                  Cargo <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="descripcion_cargo"
                  aria-label="Default select example"
                  defaultValue={descripcion_cargo}
                  onChange={(e) => {
                    setDescripcion_cargo(e.target.value);
                  }}
                >
                  <option value="">Seleccione cargo</option>
                  {cargos.map((cargo, index) => (
                    <option key={index} value={cargo.descripcion_cargo}>
                      {cargo.descripcion_cargo}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {empleado ? 'Editar' : 'Registrar'}
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
