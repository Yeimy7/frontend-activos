import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CardProvider } from '../components/CardProvider';
import { ModalRegistrarEditarProveedor } from '../components/modals/ModalRegistrarEditarProveedor';
import AlertaContext from '../context/alertas/alertaContext';
import ProveedorContext from '../context/proveedores/proveedorContext';

export const ProviderManagment = () => {
  const proveedorContext = useContext(ProveedorContext);
  const { proveedores, proveedor, mensaje, obtenerProveedores } =
    proveedorContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const [modalCreateProvider, setModalCreateProvider] = useState(false);
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    if (proveedor) {
      setModalCreateProvider(true);
    }
    obtenerProveedores();
  }, [mensaje, proveedor]);

  //State para Proyecto
  const [searchProvider, setSearchProvider] = useState('');

  const handleInputChange = (e) => {
    setSearchProvider(e.target.value);
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
                Gestión entidad
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCreateProvider(true)}
                >
                  Crear entidad
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalRegistrarEditarProveedor
        stateModal={modalCreateProvider}
        setStateModal={setModalCreateProvider}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar entidad</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre de usuario"
                  name="searchProvider"
                  value={searchProvider}
                  onChange={handleInputChange}
                  aria-label="Buscador de usuario"
                  aria-describedby="button-addon2"
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
              <div id="proveedores" className="row d-flex align-items-stretch">
                {!proveedores || proveedores.length === 0 ? (
                  <p className="text-center fs-6 text-muted">
                    No existen entidades registradas
                  </p>
                ) : (
                  proveedores
                    ?.filter((provider) =>
                      provider.razon_social
                        .toLowerCase()
                        .includes(searchProvider.toLowerCase())
                    )
                    .map((item) => (
                      <CardProvider
                        key={item.id_proveedor}
                        providerData={item}
                      />
                    ))
                )}
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
