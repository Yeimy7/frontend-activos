import React from "react";
import { Modal } from "./Modal";

export const ModalChangePassword = ({ stateModal, setStateModal }) => {
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Cambiar contraseña"
      size="50"
    >
      <div className="container my-3">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="currentPassword" className="form-label">
                Contraseña actual:
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                placeholder="Introduzca su contraseña actual"
              />
            </div>
            <div class="col-12">
              <label htmlFor="newPassword" className="form-label">
                Contraseña nueva:
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Introduzca la nueva contraseña"
              />
            </div>
            <div className="col-12 text-end">
              <button
                type="button"
                className="btn btn-secondary"
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
