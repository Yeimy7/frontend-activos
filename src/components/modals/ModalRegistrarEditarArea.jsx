import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AlertaContext from '../../context/alertas/alertaContext';
import AreaContext from '../../context/areas/areaContext';
import Swal from 'sweetalert2';

export const ModalRegistrarEditarArea = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const areaContext = useContext(AreaContext);
  const { mensaje, area, registrarArea, limpiarArea, actualizarArea } =
    areaContext;

  const [form, setForm] = useState({
    nombre_area: '',
    codigo_area: '',
  });

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (area) {
      setForm({
        nombre_area: area[0].nombre_area,
        codigo_area: area[0].codigo_area,
      });
    }
  }, [mensaje, area]);

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
      mostrarAlerta('Los campos * son obligatorios', 'danger');
      return;
    }
    if (form.nombre_area.length < 3) {
      mostrarAlerta('Introduzca nombre de área válido', 'danger');
      return;
    }
    if (form.codigo_area.length < 2) {
      mostrarAlerta('Introduzca un código de área válido', 'danger');
      return;
    }
    registrarArea({
      nombre_area: form.nombre_area,
      codigo_area: form.codigo_area,
    });
    Swal.fire({
      icon: 'success',
      title: 'Área creada exitosamente',
      showConfirmButton: false,
      timer: 1500,
    });
    reset();
  };
  const handleEditarArea = (e) => {
    e.preventDefault();
    if (form.nombre_area && form.nombre_area.length < 3) {
      mostrarAlerta('Introduzca nombre de área válido', 'danger');
      return;
    }
    if (form.codigo_area && form.codigo_area.length < 2) {
      mostrarAlerta('Introduzca código válido', 'danger');
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
      Swal.fire({
        icon: 'success',
        title: 'Área editada correctamente',
        showConfirmButton: false,
        timer: 1500,
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
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`} role="alert">
            {alerta.msg}
          </div>
        ) : null}
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
