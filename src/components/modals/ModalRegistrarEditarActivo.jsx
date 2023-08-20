import React, { useState, useContext, useEffect } from 'react';
import { Modal } from './Modal';
import ActivoContext from '../../context/activos/activoContext';
import { useForm } from '../../hooks/useForm';
import ProveedorContext from '../../context/proveedores/proveedorContext';
import AmbienteContext from '../../context/ambientes/ambienteContext';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalRegistrarEditarActivo = ({ stateModal, setStateModal }) => {
  const proveedorContext = useContext(ProveedorContext);
  const { obtenerProveedores, proveedores, mensaje_proveedor } =
    proveedorContext;

  const ambientesContext = useContext(AmbienteContext);
  const { todosAmbientes, obtenerTodosAmbientes, mensaje_ambiente } =
    ambientesContext;

  const activoContext = useContext(ActivoContext);
  const {
    activo,
    registrarActivo,
    limpiarActivo,
    actualizarActivo,
    obtenerAuxiliares,
    obtenerGrupos,
    auxiliares,
    grupos,
  } = activoContext;

  const [fecha_ingreso, setFecha_ingreso] = useState('');
  const [descripcion_activo, setDescripcion_activo] = useState('');
  const [codigo_activo, setCodigo_activo] = useState('');
  const [codigo_ambiente, setCodigo_ambiente] = useState('');
  const [descripcion_aux, setDescripcion_aux] = useState('');
  const [descripcion_g, setDescripcion_g] = useState('');
  const [razon_social, setRazon_social] = useState('');

  useEffect(() => {
    if (mensaje_ambiente) {
      muestraMensaje(mensaje_ambiente.msg, mensaje_ambiente.type);
    }
    if (mensaje_proveedor) {
      muestraMensaje(mensaje_proveedor.msg, mensaje_proveedor.type);
    }
    if (activo) {
      setFecha_ingreso(activo[0].fecha_ingreso);
      setCodigo_activo(activo[0].codigo_activo);
      setDescripcion_activo(activo[0].descripcion_activo);
    }
    if (!activo) {
      obtenerTodosAmbientes();
      obtenerAuxiliares();
      obtenerGrupos();
      obtenerProveedores();
    }
  }, [mensaje_ambiente, activo, mensaje_proveedor]);

  const initialForm = {
    costo: '',
    // valor_residual: '',
    indice_ufv: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { costo, indice_ufv } = formValues;

  const handleInputChangeFecha = ({ target }) => {
    setFecha_ingreso(target.value);
  };
  const handleInputChangeCodigoActivo = ({ target }) => {
    setCodigo_activo(target.value);
  };
  const handleInputChangeDescripcionActivo = ({ target }) => {
    setDescripcion_activo(target.value);
  };
  const resetForm = () => {
    setFecha_ingreso('');
    setDescripcion_activo('');
    setCodigo_activo('');
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
      indice_ufv.trim() === '' ||
      descripcion_activo.trim() === '' ||
      codigo_ambiente.trim() === '' ||
      descripcion_aux.trim() === '' ||
      descripcion_g.trim() === '' ||
      razon_social.trim() === ''
    ) {
      muestraMensaje('Los campos * son obligatorios', 'error');
      return;
    }

    if (codigo_activo.length < 2 || costo < 5) {
      muestraMensaje('Introduzca datos válidos', 'error');
      return;
    }

    registrarActivo({
      codigo_activo,
      fecha_ingreso,
      descripcion_activo,
      costo,
      valor_residual: costo,
      indice_ufv,
      codigo_ambiente,
      descripcion_aux,
      descripcion_g,
      razon_social,
    });
    handleClose();
  };

  const handleEditarActivo = (e) => {
    e.preventDefault();
    if (fecha_ingreso && fecha_ingreso.length < 10) {
      muestraMensaje('Introduzca una fecha válida', 'error');
      return;
    }
    if (codigo_activo && codigo_activo.length < 2) {
      muestraMensaje('Introduzca una código de activo válido', 'error');
      return;
    }
    if (descripcion_activo && descripcion_activo.length < 3) {
      muestraMensaje('Introduzca una descripción válida', 'error');
      return;
    }
    if (
      fecha_ingreso !== activo[0].fecha_ingreso ||
      codigo_activo !== activo[0].codigo_activo ||
      descripcion_activo !== activo[0].descripcion_activo
    ) {
      actualizarActivo({
        id_activo: activo[0].id_activo,
        codigo_activo: codigo_activo,
        fecha_ingreso: fecha_ingreso,
        descripcion_activo: descripcion_activo,
      });
    }

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
        <div className="container-fluid my-3">
          <form
            className="row g-2"
            onSubmit={activo ? handleEditarActivo : handleCrearActivo}
          >
            {activo && (
              <p className="text-danger">
                Deje llenos solo los campos que desea editar
              </p>
            )}
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
              </>
            ) : null}
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
                  onChange={handleInputChangeCodigoActivo}
                />
              </div>
              {!activo ? (
                <div className="col">
                  <label htmlFor="ambiente" className="form-label">
                    Ambiente: <span className="text-danger">*</span>
                  </label>
                  {todosAmbientes ? (
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
                      {todosAmbientes.map((ambiente, index) => (
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
              ) : null}
            </div>
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
                      Entidad: <span className="text-danger">*</span>
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
                        <option value="">Seleccione entidad</option>
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
            {!activo ? (
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="valor_residual" className="form-label">
                    Valor residual : <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control text-muted"
                    id="valor_residual"
                    name="costo"
                    placeholder="Ingrese el valor residual"
                    autoComplete="off"
                    value={costo}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="col">
                  <label htmlFor="indice_ufv" className="form-label">
                    Indice UFV: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="indice_ufv"
                    name="indice_ufv"
                    placeholder="Ingrese el indice UFV"
                    autoComplete="off"
                    value={indice_ufv}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ) : null}
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
