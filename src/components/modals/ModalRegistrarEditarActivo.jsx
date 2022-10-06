import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import AlertaContext from '../../context/alertas/alertaContext';
import ActivoContext from '../../context/activos/activoContext';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import ProveedorContext from '../../context/proveedores/proveedorContext';

export const ModalRegistrarEditarActivo = ({ stateModal, setStateModal }) => {
  // Extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const proveedorContext = useContext(ProveedorContext);
  const { obtenerProveedores, proveedores } = proveedorContext;

  const activoContext = useContext(ActivoContext);
  const {
    mensaje,
    activo,
    registrarActivo,
    limpiarActivo,
    actualizarActivo,
    obtenerAuxiliares,
    obtenerGrupos,
    obtenerAmbientes,
    auxiliares,
    grupos,
    ambientes,
  } = activoContext;

  const [fecha_ingreso, setFecha_ingreso] = useState('');
  const [descripcion_activo, setDescripcion_activo] = useState('');
  const [codigo_ambiente, setCodigo_ambiente] = useState('');
  const [descripcion_aux, setDescripcion_aux] = useState('');
  const [descripcion_g, setDescripcion_g] = useState('');
  const [razon_social, setRazon_social] = useState('');

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (activo) {
      setFecha_ingreso(activo[0].fecha_ingreso);
      setDescripcion_activo(activo[0].descripcion_activo);
    }
    if (!activo) {
      obtenerAmbientes();
      obtenerAuxiliares();
      obtenerGrupos();
      obtenerProveedores();
    }
  }, [mensaje, activo]);

  const initialForm = {
    codigo_activo: '',
    costo: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { codigo_activo, costo } = formValues;

  const handleInputChangeFecha = ({ target }) => {
    setFecha_ingreso(target.value);
  };
  const handleInputChangeDescripcionActivo = ({ target }) => {
    setDescripcion_activo(target.value);
  };
  const resetForm = () => {
    setFecha_ingreso('');
    setDescripcion_activo('');
    setCodigo_ambiente('');
    setDescripcion_aux('');
    setDescripcion_g('');
    setRazon_social('');
  };

  const handleCrearActivo = (e) => {
    e.preventDefault();
    // Validar que no hayan campos vacios
    if (
      codigo_activo.trim() === '' ||
      fecha_ingreso.trim() === '' ||
      costo.trim() === '' ||
      descripcion_activo.trim() === '' ||
      codigo_ambiente.trim() === '' ||
      descripcion_aux.trim() === '' ||
      descripcion_g.trim() === '' ||
      razon_social.trim() === ''
    ) {
      mostrarAlerta('Los campos * son obligatorios', 'danger');
      return;
    }

    if (codigo_activo.length < 2 || costo < 5) {
      mostrarAlerta('Introduzca datos válidos', 'danger');
      return;
    }

    registrarActivo({
      codigo_activo,
      fecha_ingreso,
      descripcion_activo,
      costo,
      codigo_ambiente,
      descripcion_aux,
      descripcion_g,
      razon_social,
    });
    if (!mensaje) {
      Swal.fire({
        icon: 'success',
        title: 'Activo creado exitosamente',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `${mensaje.msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    handleClose();
  };

  const handleEditarActivo = (e) => {
    e.preventDefault();
    if (fecha_ingreso && fecha_ingreso.length < 10) {
      mostrarAlerta('Introduzca una fecha válida', 'danger');
      return;
    }
    if (descripcion_activo && descripcion_activo.length < 3) {
      mostrarAlerta('Introduzca una descripción válida', 'danger');
      return;
    }
    if (
      fecha_ingreso !== activo[0].fecha_ingreso ||
      descripcion_activo !== activo[0].descripcion_activo
    ) {
      actualizarActivo({
        id_activo: activo[0].id_activo,
        fecha_ingreso: fecha_ingreso,
        descripcion_activo: descripcion_activo,
      });
    }

    Swal.fire({
      icon: 'success',
      title: 'Activo editado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    handleClose();
  };
  const handleClose = () => {
    setStateModal(false);
    reset();
    resetForm();
    if (activo) limpiarActivo();
  };

  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title={`${activo ? 'Editar activo' : 'Registrar activo'}`}
      size={activo ? '50' : '75'}
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
            onSubmit={activo ? handleEditarActivo : handleCrearActivo}
          >
            {!activo ? (
              <>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="grupo" className="form-label">
                      Grupo contable: <span className="text-danger">*</span>
                    </label>
                    {grupos ? (
                      <select
                        className="form-select"
                        id="grupo"
                        name="grupo"
                        defaultValue={descripcion_g}
                        onChange={(e) => {
                          setDescripcion_g(e.target.value);
                        }}
                      >
                        <option value="">Seleccione el grupo</option>
                        {grupos.map((grupo, index) => (
                          <option
                            key={1000000 + index}
                            value={grupo.descripcion_g}
                          >
                            {grupo.descripcion_g}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                  <div className="col">
                    <label htmlFor="auxiliar" className="form-label">
                      Auxiliar: <span className="text-danger">*</span>
                    </label>
                    {auxiliares ? (
                      <select
                        className="form-select"
                        id="auxiliar"
                        name="auxiliar"
                        defaultValue={descripcion_aux}
                        onChange={(e) => {
                          setDescripcion_aux(e.target.value);
                        }}
                      >
                        <option value="">Seleccione el auxiliar</option>
                        {auxiliares.map((auxiliar, index) => (
                          <option key={index} value={auxiliar.descripcion_aux}>
                            {auxiliar.descripcion_aux}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="codigo_activo" className="form-label">
                      Código: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigo_activo"
                      name="codigo_activo"
                      placeholder="Ingrese código"
                      autoComplete="off"
                      value={codigo_activo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="ambiente" className="form-label">
                      Ambiente: <span className="text-danger">*</span>
                    </label>
                    {ambientes ? (
                      <select
                        className="form-select"
                        id="ambiente"
                        name="ambiente"
                        defaultValue={codigo_ambiente}
                        onChange={(e) => {
                          setCodigo_ambiente(e.target.value);
                        }}
                      >
                        <option value="">Seleccione el ambiente</option>
                        {ambientes.map((ambiente, index) => (
                          <option
                            key={10000 + index}
                            value={ambiente.codigo_ambiente}
                          >
                            {`${ambiente.tipo_ambiente} ${ambiente.codigo_ambiente}`}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                </div>
              </>
            ) : null}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="fecha_ingreso" className="form-label">
                  Fecha de ingreso: <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="codigo"
                  name="fecha_ingreso"
                  value={fecha_ingreso}
                  onChange={handleInputChangeFecha}
                />
              </div>
              {!activo ? (
                <>
                  <div className="col">
                    <label htmlFor="costo" className="form-label">
                      Costo Bs: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="costo"
                      name="costo"
                      placeholder="Ingrese costo"
                      autoComplete="off"
                      value={costo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="proveedor" className="form-label">
                      Proveedor: <span className="text-danger">*</span>
                    </label>
                    {proveedores ? (
                      <select
                        className="form-select"
                        id="proveedor"
                        name="proveedor"
                        defaultValue={razon_social}
                        onChange={(e) => {
                          setRazon_social(e.target.value);
                        }}
                      >
                        <option value="">Seleccione proveedor</option>
                        {proveedores.map((proveedor, index) => (
                          <option
                            key={100000 + index}
                            value={proveedor.razon_social}
                          >
                            {proveedor.razon_social}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="descripcion" className="form-label">
                  Descripción: <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Ingrese una descripción del activo"
                  autoComplete="off"
                  value={descripcion_activo}
                  onChange={handleInputChangeDescripcionActivo}
                />
              </div>
            </div>
            <div className="col-12 my-3">
              <div className="text-end">
                <button type="submit" className="btn btn-primary ">
                  {activo ? 'Editar' : 'Registrar'}
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
