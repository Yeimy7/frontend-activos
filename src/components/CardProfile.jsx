import React, { useContext, useEffect } from 'react';
import iamgeUser from '../assets/user.jpg';
import AuthContext from '../context/autentication/authContext';

export const CardProfile = ({ setStateModalAvatar, setStateModalPassword }) => {
  // Extraer informacin de autenticacion
  const authContext = useContext(AuthContext);
  const { user, loggedIn } = authContext;

  useEffect(() => {
    loggedIn();
  }, []);
  return (
    <div className="card card-success card-outline mb-3">
      <div className="card-body box-profile">
        <div className="container-fluid text-center py-2 px-5">
          <img
            id="avatar2"
            className="img-fluid img-thumbnail mw-50"
            style={{ width: '200px' }}
            src={
              user?.usuario[0]?.avatar ? user?.usuario[0]?.avatar : imageUser
            }
            alt="profile-picture"
          />
        </div>
        <div className="text-center my-2">
          <button
            type="button"
            data-toggle="modal"
            data-target="#cambiofoto"
            className="btn btn-primary btn-small"
            onClick={() => setStateModalAvatar(true)}
          >
            Cambiar avatar
          </button>
        </div>
        <input
          id="id_usuario"
          type="hidden"
          defaultValue="<?php echo $_SESSION['usuario']; ?>"
        />
        <h3
          id="nombre_us"
          className="profile-username text-center text-success"
        >
          {user?.persona[0]?.nombres}
        </h3>
        <p id="apellidos_us" className="text-muted text-center">
          {user?.persona[0]?.apellidos}
        </p>
        <ul className="list-group list-group-unbordered mb-3">
          <li className="list-group-item">
            <b style={{ color: '#0B7300' }}>CI</b>
            <p id="ci" className="float-end d-inline-block">
              {user?.persona[0]?.ci}
            </p>
          </li>
          <li className="list-group-item">
            <b style={{ color: '#0B7300' }}>Tipo Usuario</b>
            <span id="us_tipo" className="float-end d-inline-block tag-type">
              {user?.usuario[0]?.rol.nombre_rol}
            </span>
          </li>
          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => setStateModalPassword(true)}
          >
            Cambiar password
          </button>
        </ul>
      </div>
    </div>
  );
};
