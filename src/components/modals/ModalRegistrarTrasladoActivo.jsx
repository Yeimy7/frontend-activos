import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import { useForm } from '../../hooks/useForm';
import ActivoContext from '../../context/activos/activoContext';
import TrasladoContext from '../../context/traslados/trasladoContext';
import AmbienteContext from '../../context/ambientes/ambienteContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarTrasladoActivo = ({ stateModal, setStateModal }) => {
  const ambientesContext = useContext(AmbienteContext);
  const { todosAmbientes, obtenerTodosAmbientes, mensaje_ambiente } =
    ambientesContext;

  const activoContext = useContext(ActivoContext);
  const { activoTraslado, limpiarActivoTraslado, trasladarActivo } =
    activoContext;

  const trasladoContext = useContext(TrasladoContext);
  const { registrarTraslado, mensaje_traslado } = trasladoContext;

  const [descripcion_activo, setDescripcion_activo] = useState('');
  const [id_ambiente, setId_ambiente] = useState('');
  useEffect(() => {
    if (mensaje_ambiente) {
      muestraMensaje(mensaje_ambiente.msg, mensaje_ambiente.type);
    }
    if (mensaje_traslado) {
      muestraMensaje(mensaje_traslado.msg, mensaje_traslado.type);
    }
    if (activoTraslado) {
      setDescripcion_activo(activoTraslado[0].descripcion_activo);
    }
    obtenerTodosAmbientes();
  }, [mensaje_ambiente, activoTraslado, mensaje_traslado]);

  const initialForm = {
    motivo_traslado: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { motivo_traslado } = formValues;

  const resetForm = () => {
    setDescripcion_activo('');
    setId_ambiente('');
  };

  const handleRegistrarTraslado = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (motivo_traslado.trim() === '' || id_ambiente.trim() === '') {
      muestraMensaje('Ambos campos son obligatorios', 'error')
      return;
    }

    if (motivo_traslado.length < 5) {
      muestraMensaje('Introduzca motivo válido', 'error')
      return;
    }
    registrarTraslado({
      motivo_traslado,
      fecha_ocupacion_anterior: activoTraslado[0].fecha_asig_ambiente,
      id_activo: activoTraslado[0].id_activo,
      id_ambiente: activoTraslado[0].id_ambiente,
    });
    trasladarActivo({
      id_activo: activoTraslado[0].id_activo,
      id_ambiente: id_ambiente,
    });
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    resetForm();
    if (activoTraslado) limpiarActivoTraslado();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Registar Traslado"
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form className="row g-2" onSubmit={handleRegistrarTraslado}>
            {activoTraslado ? (
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
            {todosAmbientes ? (
              <div className="col-12">
                <label htmlFor="ambiente" className="form-label">
                  Nuevo ambiente <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="ambiente"
                  aria-label="Default select example"
                  defaultValue={''}
                  onChange={(e) => {
                    setId_ambiente(e.target.value);
                  }}
                >
                  <option value={''}>Seleccione nuevo ambiente</option>
                  {todosAmbientes.map((ambiente, index) => (
                    <option key={index} value={ambiente.id_ambiente}>
                      {`${ambiente.tipo_ambiente} ${ambiente.codigo_ambiente}`}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            <div className=" col-12">
              <label htmlFor="motivo_traslado" className="form-label">
                Motivo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="motivo_traslado"
                name="motivo_traslado"
                placeholder="Ingrese el motivo de la traslado"
                autoComplete="off"
                value={motivo_traslado}
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
