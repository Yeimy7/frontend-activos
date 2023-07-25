import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import ActivoContext from '../context/activos/activoContext';
import DepreciacionContext from '../context/depreciacion/depreciacionContext';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

export const AdmDepreciacion = () => {
  const activoContext = useContext(ActivoContext);
  const { mensaje, obtenerGrupos, grupos } = activoContext;

  const depreciacionContext = useContext(DepreciacionContext);
  const { obtenerGestiones, gestiones } = depreciacionContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [gestion, setGestion] = useState('');
  const [id_grupo, setId_grupo] = useState('');
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerGrupos();
    obtenerGestiones();
  }, [mensaje]);

  const msj = (msj) => {
    Swal.fire({
      icon: 'error',
      html: `
      <p>${msj}</p>
        `,
      showConfirmButton: false,
      timer: 3000,
    });
  };
  const handleSubmit = async (e) => {
    console.log(id_grupo)
    console.log(gestion)
    e.preventDefault();
    if (!id_grupo || !gestion) {
      msj('Todos los campos son obligatorios');
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
        },
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      // setId_grupo('');
      // setGestion('Seleccione la gestión');
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
          <div className="row">
            <div className="col-sm-9">
              <div className="card card-info mb-3 ">
                <div className="card-header">
                  <h3>Generar cuadro de depreciación</h3>
                </div>
                <div className="card-body">
                  <form className="px-3 py-5" onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center mb-2">
                      <div className="col-3">
                        <label htmlFor="gestion" className="col-form-label">
                          <b>Gestión:</b>
                        </label>
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-md-6 ">
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
                    <div className="row g-3 align-items-center">
                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary col-9">
                          Generar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
