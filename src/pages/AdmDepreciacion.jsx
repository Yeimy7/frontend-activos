import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { depreciacionColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

export const AdmDepreciacion = () => {
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

  const [itemsActivo, setItemsActivo] = useState([]);
  const [gestion, setGestion] = useState('');
  const [mes, setMes] = useState('');

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerActivos();
  }, [mensaje]);

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
  const gestiones = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
    2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047,
    2048, 2049, 2050
  ];
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gestion) {
      mostrarAlerta('Debe seleccionar una gestión', 'danger');
      return;
    }
    if (!mes) {
      mostrarAlerta('Debe seleccionar un mes', 'danger');
      return;
    }
    try {
      const response = await clienteAxios.post(
        '/api/activos/depreciacion/pdf',
        { mes, anio: gestion },
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      //PARA GUARDAR DIRECTAMENTE EL PDF (Pero antes debes instalar file-saver):
      // saveAs(pdfBlob, 'activosDepreciacion.pdf');
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
    } catch (error) {
      console.log(error);
    }
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
              <h1>Depreciación de activos</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section>
        <div className="container-fluid">
          <div className="card card-info mb-3">
            <div className="card-header">
              <h3>Generar depreciación</h3>
            </div>
            <form className="px-3 py-5" onSubmit={handleSubmit}>
              <div className="row g-3 align-items-center">
                <div className="col-auto">
                  <label htmlFor="gestion" className="col-form-label">
                    Gestión
                  </label>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    id="gestion"
                    name="gestion"
                    defaultValue={gestion}
                    onChange={(e) => {
                      setGestion(e.target.value);
                    }}
                  >
                    <option value={''}>Año</option>
                    {gestiones.map((anio, index) => (
                      <option value={anio} key={index + 1000}>
                        {anio}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <label htmlFor="mes" className="col-form-label">
                    Al mes de
                  </label>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-select"
                    id="mes"
                    name="mes"
                    defaultValue={mes}
                    onChange={(e) => {
                      setMes(e.target.value);
                    }}
                  >
                    <option value={''}>Mes</option>
                    {meses.map((m, index) => (
                      <option value={index + 1} key={index + 10}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">
                    Generar
                  </button>
                </div>
              </div>
            </form>
          </div>
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
                <Tabla data={itemsActivo} columns={depreciacionColumns} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
