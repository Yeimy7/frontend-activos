import React from "react";

import { FaSearch } from "react-icons/fa";
import { CardUser } from "../components/CardUser";

export const UserManagment = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col">
              <h1>
                Gestion usuarios
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#crearusuario"
                  className="btn btn-primary mx-4"
                >
                  Crear usuario
                </button>
              </h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
      <section>
        <div className="container-fluid">
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Buscar usuario</h3>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese nombre de usuario"
                  aria-label="Buscador de usuario"
                  aria-describedby="button-addon2"
                />
                <button class="btn btn-light" type="button" id="button-addon2">
                  <i className="">
                    <FaSearch />
                  </i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <div id="usuarios" class="row d-flex align-items-stretch" >
                <CardUser />
                <CardUser />
                <CardUser />
                <CardUser />
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
