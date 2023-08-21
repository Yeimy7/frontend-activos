import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AreaContext from '../../context/areas/areaContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarArea = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const areaContext = useContext(AreaContext);
  const { area, registrarArea, limpiarArea, actualizarArea } =
    areaContext;

  const [form, setForm] = useState({
    nombre_area: '',
    codigo_area: '',
  });

  useEffect(() => {
    if (area) {
      setForm({
        nombre_area: area[0].nombre_area,
        codigo_area: area[0].codigo_area,
      });
    }
  }, [area]);

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setForm({ nombre_area: '', codigo_area: '' });
  };

  const handleCrearArea = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (form.nombre_area.trim() === '' || form.codigo_area.trim() === '') {
      muestraMensaje('Los campos * son obligatorios', 'error')
      return;
    }
    if (form.nombre_area.length < 3) {
      muestraMensaje('Introduzca nombre de área válido', 'error')
      return;
    }
    if (form.codigo_area.length < 2) {
      muestraMensaje('Introduzca un código de área válido', 'error')
      return;
    }
    registrarArea({
      nombre_area: form.nombre_area,
      codigo_area: form.codigo_area,
    });
    reset();
  };
  const handleEditarArea = (e) => {
    e.preventDefault();
    if (form.nombre_area && form.nombre_area.length < 3) {
      muestraMensaje('Introduzca nombre de área válido', 'error')
      return;
    }
    if (form.codigo_area && form.codigo_area.length < 2) {
      muestraMensaje('Introduzca código válido', 'error')
      return;
    }
    if (
      area[0].nombre_area !== form.nombre_area ||
      area[0].codigo_area !== form.codigo_area
    ) {
      actualizarArea({
        id_area: area[0].id_area,
        nombre_area: form.nombre_area,
        codigo_area: form.codigo_area,
      });
    }
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    if (area) limpiarArea();
  };
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${area ? 'Editar área' : 'Registrar área'}`}
      size="50"
      btnClose={false}
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={area ? handleEditarArea : handleCrearArea}
          >
            <div className=" col-12">
              <label htmlFor="nombre_area" className="form-label">
                Nombre de área <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre_area"
                name="nombre_area"
                placeholder="Ingrese nombre de área"
                autoComplete="off"
                value={form.nombre_area}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="codigo_area" className="form-label">
                Código de área <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="codigo_area"
                name="codigo_area"
                placeholder="Ingrese el código del área"
                autoComplete="off"
                value={form.codigo_area}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {area ? 'Editar' : 'Registrar'}
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
