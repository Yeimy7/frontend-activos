import React from "react";
import user from "../assets/user.jpg";

export const CardProfile = ({ setStateModalAvatar, setStateModalPassword }) => {
  return (
    <div className="card card-success card-outline mb-3">
      <div className="card-body box-profile">
        <div className="container-fluid text-center py-2 px-5">
          <img
            id="avatar2"
            className="img-fluid img-thumbnail mw-50"
            style={{ width: "200px" }}
            src={user}
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
          Nombre
        </h3>
        <p id="apellidos_us" className="text-muted text-center">
          Apellidos
        </p>
        <ul className="list-group list-group-unbordered mb-3">
          <li className="list-group-item">
            <b style={{ color: "#0B7300" }}>Edad</b>
            <p id="edad" className="float-end d-inline-block">
              20
            </p>
          </li>
          <li className="list-group-item">
            <b style={{ color: "#0B7300" }}>DNI</b>
            <p id="dni_us" className="float-end d-inline-block">
              000000
            </p>
          </li>
          <li className="list-group-item">
            <b style={{ color: "#0B7300" }}>Tipo Usuario</b>
            <span id="us_tipo" className="float-end d-inline-block tag-type">
              Administrador
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
