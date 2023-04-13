import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import AlertaContext from '../context/alertas/alertaContext';
import ListaContext from '../context/listas/listaContext';
import { Tabla } from '../components/tabla/Tabla';
import { porCustodios } from '../components/tabla/columns/Columns';
import { ListaCustodios } from '../components/ListaCustodios';
import { ListaGrupos } from '../components/ListaGrupos';
import { ListaEntidades } from '../components/ListaEntidades';

export const ListarActivos = () => {
  // const listaContext = useContext(ListaContext);
  // const { limpiarListaCustodios, limpiarListaGrupos, limpiarListaEntidades } =
  //   listaContext;

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
                        className="btn btn-outline-secondary"
                        onClick={handleThree}
                      >
                        Lista por Entidad
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
