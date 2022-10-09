import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AlertaContext from '../../context/alertas/alertaContext';
import Swal from 'sweetalert2';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import ActivoContext from '../../context/activos/activoContext';

export const ModalRegistrarAsignacion = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const empleadoContext = useContext(EmpleadoContext);
  const { obtenerEmpleados, empleados } = empleadoContext;

  const activoContext = useContext(ActivoContext);
  const {
    activosNoAsignados,
    mensaje,
    obtenerActivosNoAsignados,
    asignarActivo,
  } = activoContext;

  const [id_activo, setId_activo] = useState('');
  const [id_persona, setId_persona] = useState('');

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerActivosNoAsignados();
    obtenerEmpleados();
  }, [mensaje]);
  const reset = () => {
    setId_activo('');
    setId_persona('');
  };

  const handleCrearAsignacion = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (id_activo.trim() === '' || id_persona.trim() === '') {
      mostrarAlerta('Ambos campos son obligatorios', 'danger');
      return;
    }
    asignarActivo({
      id_activo,
      id_persona,
    });
    Swal.fire({
      icon: 'success',
      title: 'Asignacion realizada exitosamente',
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
    handleClose();
  };

  const handleClose = () => {
    setStateModal(false);
    reset();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Registrar asignacion"
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
          <form className="row g-2" onSubmit={handleCrearAsignacion}>
            {activosNoAsignados ? (
              <div className="col-12">
                <label htmlFor="activo" className="form-label">
                  Activo <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="activo"
                  aria-label="Default select example"
                  defaultValue={''}
                  onChange={(e) => {
                    setId_activo(e.target.value);
                  }}
                >
                  <option value={''}>Seleccione activo</option>
                  {activosNoAsignados.map((activo, index) => (
                    <option key={index} value={activo.id_activo}>
                      {activo.descripcion_activo}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {empleados ? (
              <div className="col-12">
                <label htmlFor="empleado" className="form-label">
                  Empleado <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="empleado"
                  aria-label="Default select example"
                  defaultValue={'Seleccione empleado'}
                  onChange={(e) => {
                    setId_persona(e.target.value);
                  }}
                >
                  <option value={''}>Seleccione empleado</option>
                  {empleados.map((empleado, index) => (
                    <option key={index + 1000000} value={empleado.id_persona}>
                      {`${empleado.nombres} ${empleado.apellidos}`}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  Asignar
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
