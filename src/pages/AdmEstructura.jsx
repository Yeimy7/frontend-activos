import React, { useContext, useEffect, useState } from 'react';
import { CardEdificio } from '../components/CardEdificio';
import { FormAmbiente } from '../components/FormAmbiente';
import { FormPiso } from '../components/FormPiso';
import { ListaPisos } from '../components/ListaPisos';
import { TablaAmbientes } from '../components/tablaAmbientes';
import { ModalRegistrarEditarEdificio } from '../components/modals/ModalRegistrarEditarEdificio';
import EdificioContext from '../context/edificios/edificioContext';
import { muestraMensaje } from '../helpers/muestraMensaje';

export const AdmEstructura = () => {
  const edificioContext = useContext(EdificioContext);
  const { edificios, edificio, mensaje, obtenerEdificios, pisosEdificio } =
    edificioContext;

  const [modalCreateEdificio, setModalCreateEdificio] = useState(false);

  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      muestraMensaje(mensaje.msg, mensaje.type);
    }
    if (edificio) {
      setModalCreateEdificio(true);
    }
    obtenerEdificios();
  }, [mensaje, edificio]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>
                Gestión estructura
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCreateEdificio(true)}
                >
                  Crear edificio
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarEdificio
        stateModal={modalCreateEdificio}
        setStateModal={setModalCreateEdificio}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-body">
              <div
                id="edificios"
                className="row d-flex justify-content-between"
              >
                {!edificios || edificios.length === 0 ? (
                  <p className="text-center fs-6 text-muted">
                    No existen edificios registrados
                  </p>
                ) : (
                  edificios.map((item) => (
                    <CardEdificio key={item.id_edificio} edificioData={item} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid my-2">
        <div className="card p-3">
          {pisosEdificio ? (
            <div className="card-header border-bottom-0 text-bg-light">
              <h4 className="text-center">{`Edificio: ${pisosEdificio[0].nombre_edificio}`}</h4>
            </div>
          ) : null}
          <div className="card-body">
            <div className="row">
              <section className="col-lg-5">
                <div className="card card-success p-2">
                  <div className="card-body">
                    <FormPiso />
                    <ListaPisos />
                  </div>
                </div>
              </section>
              <section className="col">
                <div className="card card-success p-2">
                  <div className="card-body">
                    <FormAmbiente />
                    <TablaAmbientes />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
