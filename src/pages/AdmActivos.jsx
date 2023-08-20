import React, { useContext, useEffect, useState } from 'react';
import { FaFileExcel, FaFilePdf, FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { ModalRegistrarEditarActivo } from '../components/modals/ModalRegistrarEditarActivo';
import { activoColumns } from '../components/tabla/columns/Columns';
import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';
import { ModalCambiarImagenActivo } from '../components/modals/ModalCambiarImagenActivo';
import { ModalRegistrarBajaActivo } from '../components/modals/ModalRegistrarBajaActivo';
import { ModalRegistrarTrasladoActivo } from '../components/modals/ModalRegistrarTrasladoActivo';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import AuthContext from '../context/autentication/authContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmActivo = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

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

  const [modalCrearActivo, setModalCrearActivo] = useState(false);
  const [modalCambiarImagen, setModalCambiarImagen] = useState(false);
  const [modalRegistrarBaja, setModalRegistrarBaja] = useState(false);
  const [modalRegistrarTraslado, setModalRegistrarTraslado] = useState(false);

  const [itemsActivo, setItemsActivo] = useState([]);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.type);
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
      Swal.close();
    }
  };

  const handleReporteActivosExcel = async () => {
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando lista de activos...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/activos/excel',
        {},
        { responseType: 'arraybuffer' }
      );
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Crea un enlace para descargar el archivo
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'listaActivos.xlsx';
      link.click();

      // Limpia el enlace después de la descarga
      URL.revokeObjectURL(url);
      Swal.close();
    } catch (error) {
      Swal.close();
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col">
              <h1>
                <span className="me-4">Gestión activos</span>
                {user?.usuario[0].rol.nombre_rol !== 'Custodio' ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary mx-2"
                      onClick={() => setModalCrearActivo(true)}
                    >
                      Registrar nuevo
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      title="Generar lista de activos en pdf"
                      onClick={handleReporteActivos}
                    >
                      <i className=" me-1">
                        <FaFilePdf />
                      </i>
                      Lista Activos
                    </button>
                    <button
                      type="button"
                      className="btn btn-success mx-2"
                      title="Generar lista de activos en excel"
                      onClick={handleReporteActivosExcel}
                    >
                      <i className=" me-1">
                        <FaFileExcel />
                      </i>
                      Lista Activos
                    </button>
                  </>
                ) : null}
              </h1>
            </div>
          </div>
        </div>
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
