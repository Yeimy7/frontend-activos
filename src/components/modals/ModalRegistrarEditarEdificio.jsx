import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import EdificioContext from '../../context/edificios/edificioContext';
import Swal from 'sweetalert2';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarEdificio = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context

  const edificioContext = useContext(EdificioContext);
  const {
    mensaje,
    edificio,
    registrarEdificio,
    limpiarEdificio,
    actualizarEdificio,
  } = edificioContext;

  const [form, setForm] = useState({
    nombre_edificio: '',
  });

  useEffect(() => {
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.categoria)
    }
    if (edificio) {
      setForm({
        nombre_edificio: edificio[0].nombre_edificio,
      });
    }
  }, [mensaje, edificio]);

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setForm({ nombre_edificio: '' });
  };

  const handleCreateEdificio = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (form.nombre_edificio.trim() === '') {
      muestraMensaje('Los campos * son obligatorios', 'error')
      return;
    }
    if (form.nombre_edificio && form.nombre_edificio.length < 3) {
      muestraMensaje('Introduzca un nombre válido', 'error')
      return;
    }
    registrarEdificio({
      nombre_edificio: form.nombre_edificio,
    });
    reset();
  };
  const handleEditEdificio = (e) => {
    e.preventDefault();
    if (form.nombre_edificio && form.nombre_edificio.length < 2) {
      muestraMensaje('Introduzca datos validos', 'error');
      return;
    }
    if (edificio[0].nombre_edificio !== form.nombre_edificio) {
      actualizarEdificio({
        id_edificio: edificio[0].id_edificio,
        nombre_edificio: form.nombre_edificio,
      });
      Swal.fire({
        icon: 'success',
        title: 'Edificio editado correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    if (edificio) limpiarEdificio();
  };
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${edificio ? 'Editar edificio' : 'Registrar edificio'}`}
      size="50"
      btnClose={false}
    >
      <div className="container">

        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={edificio ? handleEditEdificio : handleCreateEdificio}
          >
            <div className=" col-12">
              <label htmlFor="nombre_edificio" className="form-label">
                Nombre<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_edificio"
                name="nombre_edificio"
                placeholder="Ingrese el nombre del edificio"
                autoComplete="off"
                value={form.nombre_edificio}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {edificio ? 'Editar' : 'Registrar'}
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
