import React, { useContext } from 'react';
import AuthContext from '../../context/autentication/authContext';
import { useForm } from '../../hooks/useForm';
import { Modal } from './Modal';
import Swal from 'sweetalert2';
import { muestraMensaje } from '../../helpers/muestraMensaje';

export const ModalChangePassword = ({ stateModal, setStateModal }) => {
  const authContext = useContext(AuthContext);
  const { editPassword } = authContext;

  const initialForm = {
    password: '',
    newPassword: '',
  };
  const [formValues, handleInputChange, reset] = useForm(initialForm);
  const { password, newPassword } = formValues;

  const handleSubmit = () => {
    if (password.length < 6 || newPassword.length < 6) {
      muestraMensaje('El password debe ser de al menos 6 caracteres', 'error');
      return;
    }
    Swal.fire({
      icon: 'question',
      html: `<p>Está seguro que desea cambiar su <b>contraseña actual</b>? </p>`,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#0D6EFD',
    }).then((result) => {
      if (result.isConfirmed) {
        editPassword(formValues);
        reset();
      }
    });
  };

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
                value={password}
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="newPassword" className="form-label">
                Contraseña nueva:
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="Introduzca la nueva contraseña"
                value={newPassword}
                name="newPassword"
                onChange={handleInputChange}
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
              <button className="btn btn-primary ms-2" onClick={handleSubmit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
