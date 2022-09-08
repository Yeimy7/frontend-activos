import React from "react";
import user from "../assets/user.jpg";
import { FaSortAmountUp, FaWindowClose } from "react-icons/fa";

export const CardUser = () => {
  return (
      <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch p-1">
        <div className="card text-bg-light">
          <div className="card-header text-muted border-bottom-0 text-bg-light">
            <span class="badge text-bg-primary">Tecnico</span>
          </div>
          <div className="card-body pt-0">
            <div className="row">
              <div className="col-7">
                <h2 className="lead">
                  <b>Ana Zurita</b>
                </h2>
                <p className="text-muted text-sm">
                  <b>Sobre mí: </b>null
                </p>
                <ul className="ml-4 mb-0 fa-ul text-muted">
                  <li className="small">
                    <span className="fa-li"></span>
                    DNI: 67890
                  </li>
                  <li className="small">
                    <span className="fa-li"></span>
                    Edad: 24
                  </li>
                  <li className="small">
                    <span className="fa-li"></span>
                    Teléfono: 224789
                  </li>
                  <li className="small">
                    <span className="fa-li"></span>
                    Correo: null
                  </li>
                  <li className="small">
                    <span className="fa-li"></span>
                    Sexo: Femenino
                  </li>
                  <li className="small">
                    <span className="fa-li"></span>
                    Residencia: null
                  </li>
                </ul>
              </div>
              <div className="col-5 text-center">
                <img src={user} alt className="img-fluid img-thumbnail" />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-center">
              <button
                className="borrar-usuario btn btn-danger me-1"
                type="button"
                data-toggle="modal"
                data-target="#confirmar"
              >
                <i className=" me-1">
                  <FaWindowClose />
                </i>
                Eliminar
              </button>
              <button
                className="ascender btn btn-primary ms-1"
                type="button"
                data-toggle="modal"
                data-target="#confirmar"
              >
                <i className=" me-1">
                  <FaSortAmountUp />
                </i>
                Ascender
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};
