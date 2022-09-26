import React, { useContext, useEffect, useState } from 'react';

import { FaSearch } from 'react-icons/fa';
import { CardUser } from '../components/CardUser';
import { ModalUserRegister } from '../components/modals/ModalUserRegister';
import AlertaContext from '../context/alertas/alertaContext';
import UserContext from '../context/users/userContext';

export const UserManagment = () => {
  const userContext = useContext(UserContext);
  const { users, message, getUsers } = userContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  useEffect(() => {
    // Si hay un error
    if (message) {
      mostrarAlerta(message.msg, message.categoria);
    }
    getUsers();
  }, [message]);
  const [modalCreateUser, setModalCreateUser] = useState(false);

  //State para Proyecto
  const [searchUser, setSearchUser] = useState('');
  // const { nombre } = searchUser;

  const handleInputChange = (e) => {
    setSearchUser(e.target.value);
  };

  if (users.length === 0) return <p>No hay usuarios, comienza creando uno.</p>;

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
                Gestion usuarios
                <button
                  type="button"
                  className="btn btn-primary mx-4"
                  onClick={() => setModalCreateUser(true)}
                >
                  Crear usuario
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <ModalUserRegister
        stateModal={modalCreateUser}
        setStateModal={setModalCreateUser}
      />
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar usuario</h3>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre de usuario"
                  name="searchUser"
                  value={searchUser}
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
              <div id="usuarios" className="row d-flex align-items-stretch">
                {users?.filter((user) =>
                    user.nombres
                      .toLowerCase()
                      .includes(searchUser.toLowerCase())
                  )
                  .map((item) => (
                    <CardUser key={item.id_persona} userData={item} />
                  ))}
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
