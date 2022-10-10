import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AlertaContext from '../../context/alertas/alertaContext';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import ActivoContext from '../../context/activos/activoContext';
import BajaContext from '../../context/bajas/bajaContext';

export const ModalRegistrarBajaActivo = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const activoContext = useContext(ActivoContext);
  const { activoBaja, mensaje, limpiarActivoBaja, eliminarActivo } =
    activoContext;

  const bajaContext = useContext(BajaContext);
  const { registrarBaja } = bajaContext;

  const [descripcion_activo, setDescripcion_activo] = useState('');

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (activoBaja) {
      setDescripcion_activo(activoBaja[0].descripcion_activo);
    }
  }, [mensaje, activoBaja]);

  const initialForm = {
    motivo_baja: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { motivo_baja } = formValues;

  const resetForm = () => {
    setDescripcion_activo('');
  };

  const handleRegistrarBaja = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (motivo_baja.trim() === '') {
      mostrarAlerta('El campo motivo es obligatorio', 'danger');
      return;
    }

    if (motivo_baja.length < 5) {
      mostrarAlerta('Introduzca motivo válido', 'danger');
      return;
    }

    Swal.fire({
      icon: 'warning',
      html: `<h3>¿Desea eliminar el activo <b> ${activoBaja[0].descripcion_activo}</b>? </h3>
      <p>No podrá revertir la acción</p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#28A754',
    }).then((result) => {
      if (result.isConfirmed) {
        if (activoBaja[0].id_persona) {
          Swal.fire({
            icon: 'error',
            title: 'Debe desvincular el activo para registrar su baja',
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          registrarBaja({
            motivo_baja,
            id_activo: activoBaja[0].id_activo,
          });
          eliminarActivo(activoBaja[0].id_activo);
          Swal.fire({
            icon: 'success',
            title: 'Baja realizada exitosamente',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    resetForm();
    if (activoBaja) limpiarActivoBaja();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Registar Baja"
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
          <form className="row g-2" onSubmit={handleRegistrarBaja}>
            {activoBaja ? (
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
              </>
            ) : null}
            <div className=" col-12">
              <label htmlFor="motivo_baja" className="form-label">
                Motivo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="motivo_baja"
                name="motivo_baja"
                placeholder="Ingrese el motivo de la baja"
                autoComplete="off"
                value={motivo_baja}
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
