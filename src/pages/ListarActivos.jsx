import React, { useContext, useEffect, useState } from 'react';
import ListaContext from '../context/listas/listaContext';
import { ListaCustodios } from '../components/ListaCustodios';
import { ListaGrupos } from '../components/ListaGrupos';
import { ListaEntidades } from '../components/ListaEntidades';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { FaFilePdf } from 'react-icons/fa';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const ListarActivos = () => {
  const listaContext = useContext(ListaContext);
  const { entidad, custodio, grupo, mensaje_lista } = listaContext;

  const [tabla, setTabla] = useState(1);

  useEffect(() => {
    if (mensaje_lista) {
      muestraMensaje(mensaje_lista.msg, mensaje_lista.type);
    }
  }, [mensaje_lista]);

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
