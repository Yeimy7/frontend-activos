import React from "react";
import { FaCheck ,FaTimes } from "react-icons/fa";

export const CardEditDataUser = () => {
  return (
    <div className="card card-success">
      <div className="card-header">
        <h3 className="card-title">Editar datos personales</h3>
      </div>
      <div className="card-body">
        <div
          className="alert alert-success text-center"
          id="editado"
          style={{ display: "none" }}
        >
          <span>
            <i className="me-1">
              <FaCheck />
            </i>
            Editado
          </span>
        </div>
        <div
          className="alert alert-danger text-center"
          id="noeditado"
          style={{ display: "none" }}
        >
          <span>
            <i className="me-1">
              <FaTimes />
            </i>
            Edición Deshabilitada
          </span>
        </div>
        <form id="form-usuario" className="form-horizontal">
          <div className="form-group row py-2">
            <label htmlFor="telefono" className="col-sm-2 col-form-label">
              Teléfono
            </label>
            <div className="col-sm-10">
              <input type="text" id="telefono" className="form-control" />
            </div>
          </div>
          <div className="form-group row py-2">
            <label htmlFor="residencia" className="col-sm-2 col-form-label">
              Residencia
            </label>
            <div className="col-sm-10">
              <input type="text" id="residencia" className="form-control" />
            </div>
          </div>
          <div className="form-group row py-2">
            <label htmlFor="correo" className="col-sm-2 col-form-label">
              Correo
            </label>
            <div className="col-sm-10">
              <input type="text" id="correo" className="form-control" />
            </div>
          </div>
          <div className="form-group row py-2">
            <label htmlFor="sexo" className="col-sm-2 col-form-label">
              Sexo
            </label>
            <div className="col-sm-10">
              <input type="text" id="sexo" className="form-control" />
            </div>
          </div>
          <div className="form-group row py-2">
            <label htmlFor="adicional" className="col-sm-2 col-form-label">
              Información Adicional
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                style={{ resize: "none" }}
                id="adicional"
                cols={30}
                rows={10}
                defaultValue={""}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10 float-end">
              <button className="btn btn-block btn-outline-success">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="card-footer">
        <p className="text-muted">Tenga cuidado de no ingresar datos erróneos</p>
      </div>
    </div>
  );
};
