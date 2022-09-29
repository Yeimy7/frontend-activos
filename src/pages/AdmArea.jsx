import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ModalRegistrarEditarArea } from '../components/modals/ModalRegistrarEditarArea';
import { ColumnAdmArea } from '../components/tabla/columns/ColumnAdmArea';
import AlertaContext from '../context/alertas/alertaContext';
import AreaContext from '../context/areas/areaContext';

export const AdmArea = () => {
  const areaContext = useContext(AreaContext);
  const { areas, area, mensaje, obtenerAreas } =
    areaContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [modalCrearArea, setModalCrearArea] = useState(false);
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (area) {
      setModalCrearArea(true);
    }
    obtenerAreas();
  }, [mensaje, area]);

  const [buscarArea, setBuscarArea] = useState('');

  const handleInputChange = (e) => {
    setBuscarArea(e.target.value);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`} role="alert">
            {alerta.msg}
          </div>
        ) : null}
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>
                Gestión área
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCrearArea(true)}
                >
                  Crear área
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarArea
        stateModal={modalCrearArea}
        setStateModal={setModalCrearArea}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar área</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre del área"
                  name="buscarArea"
                  value={buscarArea}
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
              {!areas || areas.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen áreas registradas
                </p>
              ) : (
                <table className="table table-hover  text-nowrap">
                  <thead className="table-success">
                    <tr>
                      <th>Área</th>
                      <th>Código</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areas
                      ?.filter((area) =>
                        area.nombre_area
                          .toLowerCase()
                          .includes(buscarArea.toLowerCase())
                      )
                      .map((item) => (
                        <ColumnAdmArea key={item.id_area} datosArea={item} />
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
