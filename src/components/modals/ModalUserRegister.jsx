import React from "react";
import { Modal } from "./Modal";

export const ModalUserRegister = ({ stateModal, setStateModal }) => {
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Crear usuario"
      size="50"
    >
      <div className="container">
        <div className="container-fluid my-3">
          <form className="row g-2">
            <div class=" col-12">
              <label for="exampleFormControlInput1" className="form-label">
                Nombres:
              </label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                placeholder="Ingrese su nombre"
              />
            </div>
            <div class="col-12">
              <label for="exampleFormControlInput1" className="form-label">
                Apellidos:
              </label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                placeholder="Ingrese su apellido"
              />
            </div>
            <div class="col-6">
              <label for="exampleFormControlInput1" className="form-label">
                Carnet de Identidad:
              </label>
              <input
                type="text"
                className="form-control"
                id="ci"
                placeholder="Ingrese su ci"
              />
            </div>
            <div class="col-6">
              <label for="exampleFormControlInput1" className="form-label">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha-nacimiento"
              />
            </div>
            <div class="col-12">
              <label for="exampleFormControlInput1" className="form-label">
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div class="col-12">
              <label for="exampleFormControlInput1" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingrese password"
              />
            </div>
          </form>
          <div className="row my-3">
            <div className="text-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setStateModal(false)}
              >
                Cerrar
              </button>
              <button type="button" className="btn btn-primary ms-2">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
