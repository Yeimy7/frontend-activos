import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import ActivoContext from '../context/activos/activoContext';
import DepreciacionContext from '../context/depreciacion/depreciacionContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmDepreciacion = () => {
  const activoContext = useContext(ActivoContext);
  const { mensaje, obtenerGrupos, grupos } = activoContext;

  const depreciacionContext = useContext(DepreciacionContext);
  const { obtenerGestiones, gestiones, mensaje_depreciacion } =
    depreciacionContext;

  const [gestion, setGestion] = useState('');
  const [id_grupo, setId_grupo] = useState('');
  useEffect(() => {
    // Si hay un error
    if (mensaje_depreciacion) {
      muestraMensaje(mensaje_depreciacion.msg, mensaje_depreciacion.type);
    }
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.type);
    }
    obtenerGrupos();
    obtenerGestiones();
  }, [mensaje_depreciacion, mensaje]);

  const handleGenerarPdf = async (e) => {
    e.preventDefault();
    if (!id_grupo || !gestion) {
      muestraMensaje('Todos los campos son obligatorios', 'error');
      return;
    }
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando cuadro de depreciación...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/hdepreciacion/cuadro',
        {
          gestion,
          id_grupo,
          isPdf: true,
        },
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

  const handleGenerarExcel = async (e) => {
    e.preventDefault();
    if (!id_grupo || !gestion) {
      muestraMensaje('Todos los campos son obligatorios', 'error');
      return;
    }
    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando cuadro de depreciación...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await clienteAxios.post(
        '/api/hdepreciacion/cuadro',
        {
          gestion,
          id_grupo,
          isPdf: false,
        },
        { responseType: 'arraybuffer' }
      );
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Crea un enlace para descargar el archivo
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cuadroDepreciacion.xlsx';
      link.click();

      // Limpia el enlace después de la descarga
      URL.revokeObjectURL(url);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>Cuadro de Depreciación</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section>
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
              <div className="card card-info mb-3  ">
                <div className="card-header">
                  <h3 className="text-center">
                    Generar cuadro de depreciación
                  </h3>
                </div>
                <div className="card-body">
                  <form className="px-3 py-5">
                    <div className="row g-3 align-items-center mb-2">
                      <div className="col-3">
                        <label htmlFor="gestion" className="col-form-label">
                          <b>Gestión:</b>
                        </label>
                      </div>
                      <div className="col-md-9">
                        <select
                          className="form-select"
                          id="gestion"
                          name="gestion"
                          defaultValue={gestion}
                          onChange={(e) => {
                            setGestion(e.target.value);
                          }}
                        >
                          <option value={''}>Seleccione la gestión</option>
                          {gestiones?.map((anio) => (
                            <option
                              value={anio['gestion']}
                              key={anio['gestion']}
                            >
                              {anio['gestion']}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                      <div className="col-3">
                        <label htmlFor="gestion" className="col-form-label">
                          <b>Grupo contable:</b>
                        </label>
                      </div>
                      <div className="col-md-9">
                        {grupos ? (
                          <select
                            className="form-select"
                            id="grupo"
                            name="grupo"
                            defaultValue={id_grupo}
                            onChange={(e) => {
                              setId_grupo(e.target.value);
                            }}
                          >
                            <option value="">Seleccione el grupo</option>
                            {grupos.map((grupo, index) => (
                              <option
                                key={grupo.id_grupo}
                                value={grupo.id_grupo}
                              >
                                {grupo.descripcion_g}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <div className="text-center">
                    <button
                      className="btn btn-danger m-1 "
                      onClick={handleGenerarPdf}
                    >
                      <i className="me-1">
                        <FaFilePdf />
                      </i>
                      Generar cuadro
                    </button>
                    <button
                      className="btn btn-success m-1"
                      onClick={handleGenerarExcel}
                    >
                      <i className="me-1">
                        <FaFileExcel />
                      </i>
                      Generar cuadro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
