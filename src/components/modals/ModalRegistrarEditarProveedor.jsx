import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import ProveedorContext from '../../context/proveedores/proveedorContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarProveedor = ({
  stateModal,
  setStateModal,
}) => {

  const proveedorContext = useContext(ProveedorContext);
  const {
    proveedor,
    registrarProveedor,
    limpiarProveedor,
    actualizarProveedor,
  } = proveedorContext;

  const [form, setForm] = useState({
    razon_social: '',
    encargado: '',
    telefono: '',
  });

  useEffect(() => {
    if (proveedor) {
      setForm({
        razon_social: proveedor[0].razon_social,
        encargado: proveedor[0].encargado,
        telefono: proveedor[0].telefono,
      });
    }
  }, [ proveedor]);

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setForm({ razon_social: '', encargado: '', telefono: '' });
  };

  const handleCreateProvider = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (form.razon_social.trim() === '' || form.encargado.trim() === '') {
      muestraMensaje('Los campos * son obligatorios', 'error')
      return;
    }
    if (form.razon_social.length < 2) {
      muestraMensaje('Introduzca datos validos', 'error')
      return;
    }
    if (form.encargado.length < 3) {
      muestraMensaje('Introduzca datos validos', 'error');
      return;
    }
    if (form.telefono && form.telefono.length < 7) {
      muestraMensaje('Introduzca número de teléfono valido', 'error');
      return;
    }
    registrarProveedor({
      razon_social: form.razon_social,
      encargado: form.encargado,
      telefono: form.telefono || 0,
    });
    reset();
  };
  const handleEditProvider = (e) => {
    e.preventDefault();
    if (form.encargado && form.encargado.length < 2) {
      muestraMensaje('Introduzca datos validos', 'error');
      return;
    }
    if (form.telefono && form.telefono.length < 7) {
     muestraMensaje('Introduzca número de teléfono valido', 'error');
      return;
    }
    if (
      proveedor[0].encargado !== form.encargado ||
      proveedor[0].telefono !== form.telefono
    ) {
      actualizarProveedor({
        id_proveedor: proveedor[0].id_proveedor,
        encargado: form.encargado,
        telefono: form.telefono || 0,
      });
    }
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    if (proveedor) limpiarProveedor();
  };
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${proveedor ? 'Editar entidad' : 'Registrar entidad'}`}
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={proveedor ? handleEditProvider : handleCreateProvider}
          >
            <div className=" col-12">
              <label htmlFor="razon_social" className="form-label">
                Razón Social <span className="text-danger">*</span>
              </label>
              <input
                disabled={proveedor ? true : false}
                type="text"
                className="form-control"
                id="razon_social"
                name="razon_social"
                placeholder="Ingrese razón social"
                autoComplete="off"
                value={form.razon_social}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="encargado" className="form-label">
                Encargado <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="encargado"
                name="encargado"
                placeholder="Ingrese el nombre del encargado"
                autoComplete="off"
                value={form.encargado}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="telefono" className="form-label">
                Teléfono:
              </label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                placeholder="Ingrese el número de teléfono"
                autoComplete="off"
                value={form.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {proveedor ? 'Editar' : 'Registrar'}
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
