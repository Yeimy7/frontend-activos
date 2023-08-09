import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ListaCodigoActivos } from '../components/ListaCodigoActivo';
import { ColumnAdmActivo } from '../components/tabla/columns/ColumnAdmActivo';
import clienteAxios from '../config/axios';
import ActivoContext from '../context/activos/activoContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmCodigo = () => {
  const activoContext = useContext(ActivoContext);
  const {
    activos,
    obtenerActivos,
    mensaje,
    limpiarCodigoActivos,
    codigoActivos,
  } = activoContext;

  useEffect(() => {
    // Si hay un error
    limpiarCodigoActivos();
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.categoria);
    }
    obtenerActivos();
  }, [mensaje]);

  const [buscarActivo, setBuscarActivo] = useState('');

  const handleInputChange = (e) => {
    setBuscarActivo(e.target.value);
  };

  const handleCodigosTodosActivos = async () => {
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
        { codigoActivos: '' },
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

  const handleCodigoActivos = async () => {
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
        { codigoActivos },
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
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>
                Gestión Código de Barras
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  title="Generar códigos de todos los activos"
                  onClick={handleCodigosTodosActivos}
                >
                  Generar todos los Códigos
                </button>
              </h1>
            </div>
          </div>
        </div>
      </section>
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
                  name="buscarCodigo"
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
            <div className="card-body">
              <div className="row">
                <section className="col">
                  <div className="card card-success p-2 tbodyDiv">
                    <h3 className="ms-4">Activos</h3>
                    <hr />
                    <div className="card-body ">
                        <div className=" table-responsive ">
                          {!activos || activos.length === 0 ? (
                            <p className="text-center fs-6 text-muted">
                              No existen activos registrados
                            </p>
                          ) : (
                            <table className="table table-hover  text-nowrap">
                              <thead className="table-success">
                                <tr>
                                  <th>Código</th>
                                  <th>
                                    <div className="sizee">Descripción</div>
                                  </th>
                                  <th>Ambiente</th>
                                </tr>
                              </thead>
                              <tbody>
                                {activos
                                  ?.filter((activo) =>
                                    activo.codigo_activo
                                      .toLowerCase()
                                      .includes(buscarActivo.toLowerCase())
                                  )
                                  .map((item) => (
                                    <ColumnAdmActivo
                                      key={item.id_activo}
                                      datosActivo={item}
                                    />
                                  ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                    </div>
                  </div>
                </section>
                <section className="col">
                  <div className="card card-success p-2 tbodyDiv">
                    <h3 className="ms-4">Códigos de barras</h3>
                    <hr />
                    {codigoActivos.length > 0 ? (
                      <div>
                        <div className="text-center">
                          <button
                            className="btn btn-success my-4"
                            title="Generar códigos de los activos seleccionados"
                            onClick={handleCodigoActivos}
                          >
                            Generar Códigos
                          </button>
                        </div>
                        <h6 className="card-title text-secondary ms-4">
                          Activos seleccionados para generar su código de
                          barras:
                        </h6>
                      </div>
                    ) : null}

                    <div className="card-body ">
                      <ListaCodigoActivos />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
