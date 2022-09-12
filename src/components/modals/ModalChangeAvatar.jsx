import React from "react";
import avatar from "../../assets/user.jpg";
import { Modal } from "./Modal";

export const ModalChangeAvatar = ({ stateModal, setStateModal }) => {
  return (
    <Modal
      stateModal={stateModal}
      setStateModal={setStateModal}
      title="Cambiar avatar"
      size="50"
    >
      <div className="container">
        <div className="container-fluid">
          <div className="row my-3">
            <div className="mb-3 text-center">
              <img
                src={avatar}
                id="avatar2"
                className="img-fluid img-thumbnail mw-50"
                style={{ width: "180px" }}
                alt="profile-picture"
              />
            </div>
            <div class="mb-3">
              <label for="formFile" className="form-label">
                Default file input example
              </label>
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="col text-end">
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
