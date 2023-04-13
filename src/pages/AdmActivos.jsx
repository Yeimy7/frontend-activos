import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { ModalRegistrarEditarActivo } from '../components/modals/ModalRegistrarEditarActivo';
import { activoColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';
import { ModalCambiarImagenActivo } from '../components/modals/ModalCambiarImagenActivo';
import { ModalRegistrarBajaActivo } from '../components/modals/ModalRegistrarBajaActivo';
import { ModalRegistrarTrasladoActivo } from '../components/modals/ModalRegistrarTrasladoActivo';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

export const AdmActivo = () => {
  const activoContext = useContext(ActivoContext);
  const {
    activos,
    activo,
    imagenActivo,
    activoBaja,
    activoTraslado,
    mensaje,
    obtenerActivos,
  } = activoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [modalCrearActivo, setModalCrearActivo] = useState(false);
  const [modalCambiarImagen, setModalCambiarImagen] = useState(false);
  const [modalRegistrarBaja, setModalRegistrarBaja] = useState(false);
  const [modalRegistrarTraslado, setModalRegistrarTraslado] = useState(false);

  const [itemsActivo, setItemsActivo] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      // mostrarAlerta(mensaje.msg, mensaje.categoria);
      Swal.fire({
        icon: mensaje.categoria,
        title: mensaje.msg,
        showConfirmButton: false,
        timer: 2500,
      });
    }
    if (activo && !imagenActivo) {
      setModalCrearActivo(true);
    }
    if (activo && imagenActivo) {
      setModalCambiarImagen(true);
    }
    if (activoBaja) {
      setModalRegistrarBaja(true);
    }
    if (activoTraslado) {
      setModalRegistrarTraslado(true);
    }
    obtenerActivos();
  }, [mensaje, activo, activoBaja, activoTraslado, imagenActivo]);

  useLayoutEffect(() => {
    setItemsActivo(activos);
  }, [activos]);

  const [buscarActivo, setBuscarActivo] = useState('');

  const handleInputChange = (e) => {
    setBuscarActivo(e.target.value);
    filtrarActivos(e.target.value);
  };

  const filtrarActivos = (val) => {
    const items = activos?.filter((activo) =>
      activo.codigo_activo.toLowerCase().includes(val.toLowerCase())
    );
    setItemsActivo(items);
  };

  const handleReporteActivos = async () => {
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando reporte de activos...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/activos/pdf',
        {},
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      //PARA GUARDAR DIRECTAMENTE EL PDF (Pero antes debes instalar file-saver):
      // saveAs(pdfBlob, 'listaActivos.pdf');
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleCodigosActivos = async () => {
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando Códigos de Activos...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/activos/codigos/pdf',
        {},
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };
  return (
    <div className="content-wrapper">
      <section className="content-header">
        {/* {alerta ? (
          <div className={`alert alert-${alerta.categoria}`} role="alert">
            {alerta.msg}
          </div>
        ) : null} */}
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col">
              <h1>
                <span className='me-4'>Gestión activos</span>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => setModalCrearActivo(true)}
                >
                  Nuevo
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={handleReporteActivos}
                >
                  Generar reporte
                </button>
                <button
                  type="button"
                  className="btn btn-success mx-2"
                  onClick={handleCodigosActivos}
                >
                  Generar Códigos
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarActivo
        stateModal={modalCrearActivo}
        setStateModal={setModalCrearActivo}
      />
      <ModalCambiarImagenActivo
        stateModal={modalCambiarImagen}
        setStateModal={setModalCambiarImagen}
      />
      <ModalRegistrarBajaActivo
        stateModal={modalRegistrarBaja}
        setStateModal={setModalRegistrarBaja}
      />
      <ModalRegistrarTrasladoActivo
        stateModal={modalRegistrarTraslado}
        setStateModal={setModalRegistrarTraslado}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar activo</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el código del activo"
                  name="buscarActivo"
                  value={buscarActivo}
                  onChange={handleInputChange}
                />
                <button
                  className="btn btn-light"
                  type="button"
                  id="button-addon2"
                >
                  <i className="">
                    <FaSearch />
                  </i>
                </button>
              </div>
            </div>
            <div className="card-body table-responsive">
              {!itemsActivo || itemsActivo.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen activos registrados
                </p>
              ) : (
                <Tabla data={itemsActivo} columns={activoColumns} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
