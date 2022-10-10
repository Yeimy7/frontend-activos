import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AlertaContext from '../../context/alertas/alertaContext';
// import EmpleadoContext from '../../context/empleados/empleadoContext';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import ActivoContext from '../../context/activos/activoContext';
import DevolucionContext from '../../context/devolucion/devolucionContext';
// import CargoContext from '../../context/cargos/cargoContext';

export const ModalRegistrarDevolucion = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const activoContext = useContext(ActivoContext);
  const {
    activoADevolver,
    mensaje,
    limpiarActivoADevolver,
    desvincularActivo,
  } = activoContext;

  const devolucionContext = useContext(DevolucionContext);
  const { registrarDevolucion } = devolucionContext;

  const [descripcion_activo, setDescripcion_activo] = useState('');
  const [empleado, setEmpleado] = useState('');

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (activoADevolver) {
      setDescripcion_activo(activoADevolver[0].descripcion_activo);
      setEmpleado(
        `${activoADevolver[0].nombres} ${activoADevolver[0].apellidos}`
      );
    }
  }, [mensaje, activoADevolver]);

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
      mostrarAlerta('El campo motivo es obligatorio', 'danger');
      return;
    }

    if (motivo_devolucion.length < 5) {
      mostrarAlerta('Introduzca motivo válido', 'danger');
      return;
    }

    registrarDevolucion({
      motivo_devolucion,
      fecha_asignacion: activoADevolver[0].fecha_asig_empleado,
      id_activo: activoADevolver[0].id_activo,
      id_persona: activoADevolver[0].id_persona,
    });
    desvincularActivo({ id_activo: activoADevolver[0].id_activo });
    Swal.fire({
      icon: 'success',
      title: 'Devolucion realizada exitosamente',
      showConfirmButton: false,
      timer: 1500,
    });
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
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`} role="alert">
            {alerta.msg}
          </div>
        ) : null}
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
