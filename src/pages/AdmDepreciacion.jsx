import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { depreciacionColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { useForm } from '../hooks/useForm';

export const AdmDepreciacion = () => {
  const activoContext = useContext(ActivoContext);
  const { mensaje, obtenerGrupos, grupos } = activoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [gestion, setGestion] = useState('');
  const [mes, setMes] = useState('');
  const [descripcion_g, setDescripcion_g] = useState('');

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerGrupos();
  }, [mensaje]);

  const initialForm = {
    ufv_actual: '',
    ufv_actual_d: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { ufv_actual, ufv_actual_d } = formValues;

  const gestiones = [
    2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
    2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
    2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
    2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047,
    2048, 2049, 2050,
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
    e.preventDefault();
    if ( !mes || !descripcion_g || !ufv_actual) {
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
        '/api/activos/depreciacion/pdf',
        {
          idGrupo: descripcion_g,
          indice_actual: ufv_actual,
          mes_actual: mes,
          // anio_actual: gestion,
          anio_actual: new Date().getFullYear(),
        },
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      reset();
      setDescripcion_g('');
      setGestion('');
      setMes('');
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleDepreciar = async () => {
    if (!ufv_actual_d) {
      msj('Debe introducir el valor UFV actual');
      return;
    }
    Swal.fire({
      icon: 'warning',
      html: `
      <h1>¿Está seguro?</h1>
      <p> Desea realizar la depreciacion de la gestión ${new Date().getFullYear()}</p>
      `,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#0D6EFD',
    }).then((result) => {
      if (result.isConfirmed) {
        depreciar();
      }
      reset();
    });
  };
  const depreciar = async () => {
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
        '/api/activos/depreciar/pdf',
        {
          indice_actual: ufv_actual_d,
          anio_actual: new Date().getFullYear(),
        },
        { responseType: 'blob' }
      );
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      reset();
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
              <h1>Depreciación de activos</h1>
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
                    {/* <div className="row g-3 align-items-center mb-2">
                    <div className="col-3">
                      <label htmlFor="gestion" className="col-form-label">
                        Gestión:
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
                        <option value={''}>Año</option>
                        {gestiones.map((anio, index) => (
                          <option value={anio} key={index + 1000}>
                            {anio}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                    <div className="row g-3 align-items-center mb-2">
                      <div className="col-3">
                        <label htmlFor="mes" className="col-form-label">
                          <b>Al mes de:</b>
                        </label>
                      </div>
                      <div className="col-md-6">
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
                    </div>
                    <div className="row g-3 align-items-center mb-2">
                      <div className="col-3">
                        <label htmlFor="gestion" className="col-form-label">
                          <b>UFV actual:</b>
                        </label>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="ufv_actual"
                            name="ufv_actual"
                            autoComplete="off"
                            value={ufv_actual}
                            onChange={handleInputChange}
                          />
                        </div>
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
                            defaultValue={descripcion_g}
                            onChange={(e) => {
                              setDescripcion_g(e.target.value);
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
            <div className="col-sm-3">
              <div className="card card-info mb-3">
                <div className="card-header text-center">
                  <h3>Depreciar activos</h3>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center mb-2">
                    <div className="col-12">
                      <label
                        htmlFor="gestion"
                        className="col-form-label font-weight-bold"
                      >
                        <b>UFV actual:</b>
                      </label>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="ufv_actual_d"
                          name="ufv_actual_d"
                          autoComplete="off"
                          value={ufv_actual_d}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 align-items-center mb-2 text-center ">
                    <button
                      className="btn btn-danger mt-4 mb-4"
                      onClick={handleDepreciar}
                    >
                      Realizar Depreciacion
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
