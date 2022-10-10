import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Tabla } from '../components/tabla/Tabla';
import { historialDevolucionColumns } from '../components/tabla/columns/Columns';
import AlertaContext from '../context/alertas/alertaContext';
// import ActivoContext from '../context/activos/activoContext';
import { useLayoutEffect } from 'react';

export const AdmHistorialDevolucion = () => {
  // const activoContext = useContext(ActivoContext);
  // const { activosAsignados, mensaje, obtenerActivosAsignados } = activoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [itemsHistorialDevolucion, setItemsHistorialDevolucion] = useState([]);

  // useEffect(() => {
  //   // Si hay un error
  //   if (mensaje) {
  //     mostrarAlerta(mensaje.msg, mensaje.categoria);
  //   }
  //   obtenerActivosAsignados();
  // }, [mensaje]);

  useLayoutEffect(() => {
    setItemsHistorialDevolucion(devoluciones);
  // }, [devoluciones]);
  }, []);

  const [buscarDevolucion, setBuscarDevolucion] = useState('');

  const handleInputChange = (e) => {
    setBuscarDevolucion(e.target.value);
    filtrarDevoluciones(e.target.value);
  };

  const filtrarDevoluciones = (val) => {
    const items = devoluciones?.filter((devolucion) =>
      devolucion['activo.descripcion_activo'].toLowerCase().includes(val.toLowerCase())
    );
    setItemsHistorialDevolucion(items);
  };

  const devoluciones = [
    {
      'empleado.nombres': 'Carolina',
      'empleado.apellidos': 'Mejia',
      id_devolucion: '1df736da-9891-48ee-9a4f-7dce152d0653',
      fecha_devolucion: '2022-10-10',
      motivo_devolucion: 'Por cambio de puesto de trabajo',
      fecha_asignacion: '2022-06-10',
      id_activo: 'ff9b32eb-8067-45c6-bda6-226c48956274',
      id_persona: 'bd6b8afb-c7ec-4c70-9a61-3c7154a5ff19',
      'activo.descripcion_activo': 'Monitor LG',
    },
    {
      'empleado.nombres': 'Carolina',
      'empleado.apellidos': 'Mejia',
      id_devolucion: '5fd114a2-318b-47cf-8201-babaed67787e',
      fecha_devolucion: '2022-10-07',
      motivo_devolucion: 'por vencimiento de contrato',
      fecha_asignacion: '2022-06-10',
      id_activo: '26bb767a-2600-4dc7-8372-8aab765f53bc',
      id_persona: 'bd6b8afb-c7ec-4c70-9a61-3c7154a5ff19',
      'activo.descripcion_activo': 'Escritorio de roble café',
    },
    {
      'empleado.nombres': 'Guillermo',
      'empleado.apellidos': 'Vizcarra',
      id_devolucion: 'da79677d-0ab9-47de-bc02-e9ba387f674d',
      fecha_devolucion: '2022-10-10',
      motivo_devolucion: 'Por vencimiento de contrato',
      fecha_asignacion: '2022-10-09',
      id_activo: '6bf26f1d-4c3a-4038-a2b9-7b96151a149c',
      id_persona: '2733fb8a-18fb-4ee7-8d09-721c03b00ab4',
      'activo.descripcion_activo': 'Monitor HP',
    },
  ];

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
              <h1>Historial de devolución</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
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
                  placeholder="Ingrese la descripcion del activo"
                  name="buscarDevolucion"
                  value={buscarDevolucion}
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
              {!itemsHistorialDevolucion ||
              itemsHistorialDevolucion.length === 0 ? (
                <p className="text-center fs-6 text-muted">
                  No existen devoluciones registradas
                </p>
              ) : (
                <Tabla
                  data={itemsHistorialDevolucion}
                  columns={historialDevolucionColumns}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
