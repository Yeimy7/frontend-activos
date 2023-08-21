import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import { useForm } from '../../hooks/useForm';
import ActivoContext from '../../context/activos/activoContext';
import DevolucionContext from '../../context/devolucion/devolucionContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarDevolucion = ({ stateModal, setStateModal }) => {
  const activoContext = useContext(ActivoContext);
  const { activoADevolver, limpiarActivoADevolver, desvincularActivo } =
    activoContext;

  const devolucionContext = useContext(DevolucionContext);
  const { registrarDevolucion, mensaje_devolucion } = devolucionContext;

  const [descripcion_activo, setDescripcion_activo] = useState('');
  const [empleado, setEmpleado] = useState('');

  useEffect(() => {
    if (mensaje_devolucion) {
      muestraMensaje(mensaje_devolucion.msg, mensaje_devolucion.type);
    }
    if (activoADevolver) {
      setDescripcion_activo(activoADevolver[0].descripcion_activo);
      setEmpleado(
        `${activoADevolver[0].nombres} ${activoADevolver[0].apellidos}`
      );
    }
  }, [mensaje_devolucion, activoADevolver]);

  const initialForm = {
    motivo_devolucion: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { motivo_devolucion } = formValues;

  const resetForm = () => {
    setDescripcion_activo('');
    setEmpleado('');
  };

  const handleRegistrarDevolucion = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (motivo_devolucion.trim() === '') {
      muestraMensaje('El campo motivo es obligatorio', 'error');
      return;
    }

    if (motivo_devolucion.length < 5) {
      muestraMensaje('Introduzca motivo válido', 'error');
      return;
    }

    registrarDevolucion({
      motivo_devolucion,
      fecha_asignacion: activoADevolver[0].fecha_asig_empleado,
      id_activo: activoADevolver[0].id_activo,
      id_persona: activoADevolver[0].id_persona,
    });
    desvincularActivo({ id_activo: activoADevolver[0].id_activo });
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    resetForm();
    if (activoADevolver) limpiarActivoADevolver();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Registar Devolución"
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form className="row g-2" onSubmit={handleRegistrarDevolucion}>
            {activoADevolver ? (
              <>
                <div className=" col-12">
                  <label htmlFor="descripcion_activo" className="form-label">
                    Activo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descripcion_activo"
                    name="descripcion_activo"
                    autoComplete="off"
                    disabled
                    value={descripcion_activo}
                    onChange={(e) => {
                      setDescripcion_activo(e.target.value);
                    }}
                  />
                </div>
                <div className=" col-12">
                  <label htmlFor="empleado" className="form-label">
                    Empleado
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="empleado"
                    name="empleado"
                    autoComplete="off"
                    disabled
                    value={empleado}
                    onChange={(e) => {
                      setEmpleado(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : null}
            <div className=" col-12">
              <label htmlFor="motivo_devolucion" className="form-label">
                Motivo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="motivo_devolucion"
                name="motivo_devolucion"
                placeholder="Ingrese el motivo de la devolución"
                autoComplete="off"
                value={motivo_devolucion}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  Registrar
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
