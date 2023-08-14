import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import ListaContext from '../context/listas/listaContext';
import { Tabla } from '../components/tabla/Tabla';
import { porCustodios } from '../components/tabla/columns/Columns';
import { ListaCustodios } from '../components/ListaCustodios';
import { ListaGrupos } from '../components/ListaGrupos';
import { ListaEntidades } from '../components/ListaEntidades';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { FaFilePdf } from 'react-icons/fa';

export const ListarActivos = () => {
  const listaContext = useContext(ListaContext);
  const { entidad, custodio, grupo } = listaContext;

  // const alertaContext = useContext(AlertaContext);
  // const { alerta, mostrarAlerta } = alertaContext;

  const [tabla, setTabla] = useState(1);

  const handleOne = () => {
    setTabla(1);
  };
  const handleTwo = () => {
    setTabla(2);
  };
  const handleThree = () => {
    setTabla(3);
  };

  const messageBad = (num) => {
    const mess =
      num === 1 ? ' custodio' : num === 2 ? ' grupo contable' : 'a entidad';
    Swal.fire({
      icon: 'error',
      title: 'Elemento no seleccionado',
      html: `<p>Por favor, selecione un${mess}</p>`,
      showConfirmButton: false,
      timer: 1700,
    });
  };

  const handleGenerarReporte = async () => {
    let url = '';

    if (tabla === 1) {
      if (!custodio || custodio === null) {
        messageBad(tabla);
        return;
      }
      url = `/api/activos/custodio/pdf/${custodio}`;
    }
    if (tabla === 2) {
      if (!grupo || grupo === null) {
        messageBad(tabla);
        return;
      }
      url = `/api/activos/grupo/pdf/${grupo}`;
    }
    if (tabla === 3) {
      if (!entidad || entidad === null) {
        messageBad(tabla);
        return;
      }
      url = `/api/activos/entidad/pdf/${entidad}`;
    }

    Swal.fire({
      title: '<p></p>',
      html: '<h2>Generando reporte de activos...</h2>',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      console.log(url);
      const response = await clienteAxios.post(
        url,
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

  return (
    <div>
      {/* <div>
        <button onClick={handleOne}>Tabla 1</button>
        <button onClick={handleTwo}>Tabla 2</button>
        <button onClick={handleThree}>Tabla 3</button>
      </div>
      <div>
        {tabla === 1 ? (
          <ListaCustodios />
        ) : tabla === 2 ? (
          <ListaGrupos />
        ) : (
          <ListaEntidades />
        )}
      </div> */}
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Lista Activos</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-white mt-3">
                    <ul className="nav">
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-3"
                        onClick={handleOne}
                      >
                        Lista por custodio
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-3"
                        onClick={handleTwo}
                      >
                        Lista por grupo contable
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary me-3"
                        onClick={handleThree}
                      >
                        Lista por Entidad
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger me-3"
                        onClick={handleGenerarReporte}
                      >
                        <i className=" me-1">
                          <FaFilePdf />
                        </i>
                        Generar reporte
                      </button>
                    </ul>
                  </div>
                  <div className="card-body p-0">
                    <div className="tab-content">
                      <div className="tab-pane active">
                        {tabla === 1 ? (
                          <ListaCustodios />
                        ) : tabla === 2 ? (
                          <ListaGrupos />
                        ) : (
                          <ListaEntidades />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
